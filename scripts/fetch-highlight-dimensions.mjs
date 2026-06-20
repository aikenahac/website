import probe from 'probe-image-size';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const srcFile = path.join(projectRoot, 'src/lib/data/highlight-captions.json');
const adminFile = path.join(projectRoot, 'admin/data/highlight-captions.json');

const items = JSON.parse(await readFile(srcFile, 'utf8'));

let updated = 0;
for (const item of items) {
  if (item.width && item.height) continue;

  try {
    const result = await probe(item.url);
    item.width = result.width;
    item.height = result.height;
    updated++;
    console.log(`✓ ${item.url} → ${result.width}×${result.height}`);
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
