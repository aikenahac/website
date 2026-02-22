import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import express from 'express';
import { promises as fs } from 'node:fs';
import path from 'node:path';

type HighlightImage = {
  id: string;
  url: string;
  caption?: string;
};

const PORT = 8787;
const CAPTIONS_FILE = path.resolve(process.cwd(), 'data/highlight-captions.json');

dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const app = express();

app.use(express.json());

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
        if (!item.caption) {
          return {
            id: item.id,
            url: item.url,
          };
        }

        return {
          id: item.id,
          url: item.url,
          caption: item.caption,
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

const getS3ImageUrls = async (): Promise<string[]> => {
  const {
    S3_ENDPOINT,
    S3_PUBLIC_URL,
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
    S3_REGION,
    S3_BUCKET,
    S3_FOLDER,
  } = process.env;

  if (
    !S3_ENDPOINT ||
    !S3_PUBLIC_URL ||
    !S3_ACCESS_KEY ||
    !S3_SECRET_KEY ||
    !S3_REGION ||
    !S3_BUCKET ||
    !S3_FOLDER
  ) {
    return [];
  }

  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY,
      secretAccessKey: S3_SECRET_KEY,
    },
  });

  const command = new ListObjectsCommand({
    Bucket: S3_BUCKET,
    Prefix: S3_FOLDER,
  });

  const response = await s3.send(command);
  const images = response.Contents?.slice(1) ?? [];

  return images.flatMap((item) => {
    if (!item.Key) {
      return [];
    }

    return `${S3_PUBLIC_URL}/${item.Key}`;
  });
};

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

app.post('/api/sync-images', async (_req, res) => {
  try {
    const [existingImages, s3Urls] = await Promise.all([readCaptionFile(), getS3ImageUrls()]);

    const existingByUrl = new Map(existingImages.map((image) => [image.url, image]));

    const mergedImages: HighlightImage[] = s3Urls.map((url) => {
      const existing = existingByUrl.get(url);

      return {
        id: url,
        url,
        caption: existing?.caption,
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
