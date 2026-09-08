import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import probe from 'probe-image-size';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const srcFile = path.join(projectRoot, 'src/lib/data/highlight-captions.json');
const adminFile = path.join(projectRoot, 'admin/data/highlight-captions.json');

const env = loadEnv('', projectRoot, 'S3_');
const requiredVariables = [
  'S3_ENDPOINT',
  'S3_ACCESS_KEY',
  'S3_SECRET_KEY',
  'S3_REGION',
  'S3_BUCKET',
  'S3_FOLDER',
];
const missingVariables = requiredVariables.filter((name) => !env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Missing S3 configuration: ${missingVariables.join(', ')}`);
}

const folder = env.S3_FOLDER.replace(/^\/+|\/+$/g, '');
const s3 = new S3Client({
  endpoint: env.S3_ENDPOINT,
  region: env.S3_REGION,
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
});

const getObjectKey = (item) => {
  if (typeof item.id === 'string' && item.id.startsWith(`${folder}/`)) {
    return item.id;
  }

  if (typeof item.url !== 'string') {
    return null;
  }

  try {
    return decodeURIComponent(new URL(item.url, 'https://local.invalid').pathname)
      .replace(/^\/media\//, '')
      .replace(/^\/+/, '');
  } catch {
    return null;
  }
};

const items = JSON.parse(await readFile(srcFile, 'utf8'));

let updated = 0;
for (const item of items) {
  if (item.width && item.height) continue;

  try {
    const key = getObjectKey(item);

    if (!key || !key.startsWith(`${folder}/`)) {
      throw new Error('Image does not reference an object in S3_FOLDER.');
    }

    const object = await s3.send(new GetObjectCommand({ Bucket: env.S3_BUCKET, Key: key }));

    if (!object.Body) {
      throw new Error('S3 returned an empty image body.');
    }

    const result = await probe(object.Body);
    item.width = result.width;
    item.height = result.height;
    updated++;
    console.log(`✓ ${key} → ${result.width}×${result.height}`);
  } catch (err) {
    console.error(`✗ Failed to probe ${item.url}: ${err.message}`);
  }
}

if (updated > 0) {
  const json = JSON.stringify(items, null, 2) + '\n';
  await writeFile(srcFile, json, 'utf8');
  await writeFile(adminFile, json, 'utf8');
  console.log(`\nUpdated ${updated} images. Wrote to src and admin data files.`);
} else {
  console.log('All images already have dimensions. Nothing to update.');
}
