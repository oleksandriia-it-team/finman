import {readdir} from 'fs/promises';
import fs from 'node:fs';
import * as path from 'node:path';

async function getFilesInDirectory(path) {
  try {
    const files = await readdir(path) ?? [];
    return files.filter(file => file.includes('.json')).map((file) => file.slice(0, file.length - 5));
  } catch {
    return [];
  }
}

/**
 * Splits large JSON files into smaller chunks and generates manifests.
 *
 * This method reads JSON files from the `/data` directory, splits them into
 * chunks of predefined size (100 items per chunk), saves these chunks under
 * `/public/chunks`, and writes a manifest file under `/public/manifests`.
 *
 * Must be run in Node.js environment (throws error if called in browser).
 *
 */
async function SplitJsonFilesOnChunks() {

  const chunkSize = 25;

  const jsonPath = path.join(process.cwd(), 'public', 'json');

  const jsonFiles = await getFilesInDirectory(jsonPath);

  jsonFiles.forEach((fileName) => {
    const inputPath = path.join(process.cwd(), 'public', 'json', `${ fileName }.json`);
    const outputChunkDir = path.join(process.cwd(), 'public', 'json', 'chunks');
    const outputManifestDir = path.join(process.cwd(), 'public', 'json', 'manifests');

    if (!fs.existsSync(inputPath)) {
      return;
    }

    const rawData = fs.readFileSync(inputPath, 'utf-8');
    const data = JSON.parse(rawData);

    if (!fs.existsSync(outputChunkDir)) fs.mkdirSync(outputChunkDir, { recursive: true });
    if (!fs.existsSync(outputManifestDir)) fs.mkdirSync(outputManifestDir, { recursive: true });

    const totalChunks = Math.ceil(data.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
      const chunkPath = path.join(outputChunkDir, `${ fileName }_${ i + 1 }.json`);
      fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2), 'utf-8');
    }

    const manifest = {
      chunkPrefix: fileName,
      chunkSize,
      totalChunks,
      totalCount: data.length
    };

    const manifestPath = path.join(outputManifestDir, `${fileName}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  });
}

SplitJsonFilesOnChunks();
