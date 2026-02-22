import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const sourceFile = path.join(projectRoot, 'admin/data/highlight-captions.json');
const destinationFile = path.join(projectRoot, 'src/lib/data/highlight-captions.json');

const destinationDir = path.dirname(destinationFile);

await mkdir(destinationDir, { recursive: true });

const source = await readFile(sourceFile, 'utf8');
await writeFile(destinationFile, source, 'utf8');

console.log('Copied highlight captions to src/lib/data/highlight-captions.json');
