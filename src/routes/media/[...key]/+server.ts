import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import {
  S3_ACCESS_KEY,
  S3_BUCKET,
  S3_ENDPOINT,
  S3_FOLDER,
  S3_REGION,
  S3_SECRET_KEY,
} from '$env/static/private';
import type { RequestHandler } from './$types';

const BROWSER_CACHE_CONTROL = 'public, max-age=31536000, immutable';
const NETLIFY_CACHE_CONTROL = 'public, durable, max-age=31536000';

const normalizeFolder = (folder: string): string => folder.replace(/^\/+|\/+$/g, '');

const folder = normalizeFolder(S3_FOLDER);

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
  },
});

const isValidKey = (key: string): boolean =>
  Boolean(key) &&
  key.startsWith(`${folder}/`) &&
  !key.split('/').some((part) => part === '.' || part === '..' || part.includes('\0'));

export const GET: RequestHandler = async ({ params }) => {
  const key = params.key;

  if (!isValidKey(key)) {
    return new Response('Invalid media path.', { status: 400 });
  }

  try {
    const object = await s3.send(
      new GetObjectCommand({
        Bucket: S3_BUCKET,
        Key: key,
      }),
    );

    if (!object.Body) {
      return new Response('Image body was unavailable.', { status: 502 });
    }

    const headers = new Headers({
      'Cache-Control': BROWSER_CACHE_CONTROL,
      'Netlify-CDN-Cache-Control': NETLIFY_CACHE_CONTROL,
    });

    if (object.ContentType) headers.set('Content-Type', object.ContentType);
    if (object.ContentLength !== undefined)
      headers.set('Content-Length', object.ContentLength.toString());
    if (object.ETag) headers.set('ETag', object.ETag);
    if (object.LastModified) headers.set('Last-Modified', object.LastModified.toUTCString());

    return new Response(object.Body.transformToWebStream(), { headers });
  } catch (error) {
    const statusCode = (error as { $metadata?: { httpStatusCode?: number } }).$metadata
      ?.httpStatusCode;

    if (statusCode === 404 || (error as { name?: string }).name === 'NoSuchKey') {
      return new Response('Image not found.', { status: 404 });
    }

    console.error('Failed to fetch highlight image from S3:', error);
    return new Response('Failed to load image.', { status: 502 });
  }
};
