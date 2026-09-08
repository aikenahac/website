import {
  DeleteObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';

type HighlightImage = {
  id: string;
  url: string;
  caption?: string;
  width?: number;
  height?: number;
};

type S3Config = {
  client: S3Client;
  bucket: string;
  folder: string;
};

const PORT = 8787;
const CAPTIONS_FILE = path.resolve(process.cwd(), 'data/highlight-captions.json');

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const app = express();

app.use(express.json());

const normalizeFolder = (folder: string): string => folder.replace(/^\/+|\/+$/g, '');

const isKeyInFolder = (key: string, folder: string): boolean =>
  key.startsWith(`${folder}/`) && !key.split('/').some((part) => part === '.' || part === '..');

const toMediaUrl = (key: string): string =>
  `/media/${key
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/')}`;

const getS3Config = (): S3Config => {
  const { S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_REGION, S3_BUCKET, S3_FOLDER } =
    process.env;

  if (!S3_ENDPOINT || !S3_ACCESS_KEY || !S3_SECRET_KEY || !S3_REGION || !S3_BUCKET || !S3_FOLDER) {
    throw new Error('S3 configuration is incomplete.');
  }

  return {
    client: new S3Client({
      endpoint: S3_ENDPOINT,
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
      },
    }),
    bucket: S3_BUCKET,
    folder: normalizeFolder(S3_FOLDER),
  };
};

const getCanonicalKey = (image: HighlightImage, folder: string): string | null => {
  if (isKeyInFolder(image.id, folder)) {
    return image.id;
  }

  for (const value of [image.url, image.id]) {
    try {
      const pathname = new URL(value, 'https://local.invalid').pathname;
      const pathKey = decodeURIComponent(pathname)
        .replace(/^\/media\//, '')
        .replace(/^\/+/, '');

      if (isKeyInFolder(pathKey, folder)) {
        return pathKey;
      }
    } catch {
      // Ignore malformed legacy URLs and try the next candidate.
    }
  }

  return null;
};

const readCaptionFile = async (): Promise<HighlightImage[]> => {
  try {
    const raw = await fs.readFile(CAPTIONS_FILE, 'utf8');
    const parsed = JSON.parse(raw) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is HighlightImage => {
        if (!item || typeof item !== 'object') {
          return false;
        }

        const entry = item as Record<string, unknown>;
        return typeof entry.id === 'string' && typeof entry.url === 'string';
      })
      .map((item) => {
        return {
          id: item.id,
          url: item.url,
          caption: typeof item.caption === 'string' && item.caption ? item.caption : undefined,
          width: typeof item.width === 'number' ? item.width : undefined,
          height: typeof item.height === 'number' ? item.height : undefined,
        };
      });
  } catch (error) {
    const fsError = error as NodeJS.ErrnoException;

    if (fsError.code === 'ENOENT') {
      await fs.mkdir(path.dirname(CAPTIONS_FILE), { recursive: true });
      await fs.writeFile(CAPTIONS_FILE, '[]\n', 'utf8');
      return [];
    }

    throw error;
  }
};

const writeCaptionFile = async (images: HighlightImage[]): Promise<void> => {
  await fs.mkdir(path.dirname(CAPTIONS_FILE), { recursive: true });
  await fs.writeFile(CAPTIONS_FILE, `${JSON.stringify(images, null, 2)}\n`, 'utf8');
};

const getS3ImageKeys = async (): Promise<string[]> => {
  const { client, bucket, folder } = getS3Config();
  const keys: string[] = [];
  let continuationToken: string | undefined;

  do {
    const response = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: `${folder}/`,
        ContinuationToken: continuationToken,
      }),
    );

    for (const item of response.Contents ?? []) {
      if (item.Key && !item.Key.endsWith('/') && isKeyInFolder(item.Key, folder)) {
        keys.push(item.Key);
      }
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return keys;
};

app.get(/^\/media\/(.+)$/, async (req, res) => {
  try {
    const { client, bucket, folder } = getS3Config();
    const rawKey = req.params[0];
    const key = typeof rawKey === 'string' ? rawKey : '';

    if (!isKeyInFolder(key, folder)) {
      res.status(400).json({ error: 'Invalid media path.' });
      return;
    }

    const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));

    if (!object.Body) {
      res.status(502).json({ error: 'Image body was unavailable.' });
      return;
    }

    if (object.ContentType) res.setHeader('Content-Type', object.ContentType);
    if (object.ContentLength !== undefined)
      res.setHeader('Content-Length', object.ContentLength.toString());
    if (object.ETag) res.setHeader('ETag', object.ETag);
    if (object.LastModified) res.setHeader('Last-Modified', object.LastModified.toUTCString());
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    const bytes = await object.Body.transformToByteArray();
    res.end(Buffer.from(bytes));
  } catch (error) {
    const statusCode = (error as { $metadata?: { httpStatusCode?: number } }).$metadata
      ?.httpStatusCode;

    if (statusCode === 404 || (error as { name?: string }).name === 'NoSuchKey') {
      res.status(404).json({ error: 'Image not found.' });
      return;
    }

    console.error('Failed to serve highlight image:', error);
    res.status(502).json({ error: 'Failed to load image.' });
  }
});

app.get('/api/images', async (_req, res) => {
  try {
    const images = await readCaptionFile();
    res.json({ items: images });
  } catch (error) {
    console.error('Failed to load highlight captions:', error);
    res.status(500).json({ error: 'Failed to load images.' });
  }
});

app.post('/api/update-caption', async (req, res) => {
  try {
    const id = typeof req.body?.id === 'string' ? req.body.id : '';
    const captionValue = req.body?.caption;

    if (!id) {
      res.status(400).json({ error: 'id is required.' });
      return;
    }

    if (typeof captionValue !== 'string' && captionValue !== undefined && captionValue !== null) {
      res.status(400).json({ error: 'caption must be a string.' });
      return;
    }

    const images = await readCaptionFile();
    const index = images.findIndex((item) => item.id === id);

    if (index < 0) {
      res.status(404).json({ error: 'Image not found.' });
      return;
    }

    const trimmedCaption = typeof captionValue === 'string' ? captionValue.trim() : '';

    images[index] = {
      ...images[index],
      caption: trimmedCaption || undefined,
    };

    await writeCaptionFile(images);
    res.json({ items: images });
  } catch (error) {
    console.error('Failed to update image caption:', error);
    res.status(500).json({ error: 'Failed to update caption.' });
  }
});

app.delete('/api/images', async (req, res) => {
  try {
    const id = typeof req.body?.id === 'string' ? req.body.id : '';

    if (!id) {
      res.status(400).json({ error: 'id is required.' });
      return;
    }

    const images = await readCaptionFile();
    const image = images.find((item) => item.id === id);

    if (!image) {
      res.status(404).json({ error: 'Image not found.' });
      return;
    }

    const { client, bucket, folder } = getS3Config();
    const key = getCanonicalKey(image, folder);

    if (!key) {
      res.status(400).json({ error: 'Image does not reference a valid S3 object.' });
      return;
    }

    await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));

    const remainingImages = images.filter((item) => item.id !== id);
    await writeCaptionFile(remainingImages);
    res.json({ items: remainingImages });
  } catch (error) {
    console.error('Failed to delete highlight image:', error);
    res.status(500).json({ error: 'Failed to delete image. The caption file was not changed.' });
  }
});

app.post('/api/sync-images', async (_req, res) => {
  try {
    const [existingImages, s3Keys] = await Promise.all([readCaptionFile(), getS3ImageKeys()]);
    const { folder } = getS3Config();

    const existingByKey = new Map(
      existingImages.flatMap((image) => {
        const key = getCanonicalKey(image, folder);
        return key ? [[key, image] as const] : [];
      }),
    );

    const mergedImages: HighlightImage[] = s3Keys.map((key) => {
      const existing = existingByKey.get(key);

      return {
        id: key,
        url: toMediaUrl(key),
        caption: existing?.caption,
        width: existing?.width,
        height: existing?.height,
      };
    });

    await writeCaptionFile(mergedImages);
    res.json({ items: mergedImages });
  } catch (error) {
    console.error('Failed to sync images from S3:', error);
    res.status(500).json({ error: 'Failed to sync images from S3.' });
  }
});

app.listen(PORT, () => {
  console.log(`Highlights admin API listening on http://localhost:${PORT}`);
});
