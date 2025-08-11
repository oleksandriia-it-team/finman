import { JSONFileNames } from './enums/json-files.enum';
import { Manifest } from './models/manifest.model';

/**
 * Service for lazy loading JSON data chunks.
 *
 * This service supports chunking large JSON files on the server side (Node.js)
 * and fetching those chunks on the client side (browser).
 *
 * The main idea:
 * - On the server, use `generateChunks()` to split large JSON files into smaller chunks
 *   and create a manifest describing them.
 * - On the client, use `getItems()` and `getTotalCount()` to fetch chunks and manifest data via HTTP.
 */
export class LazyLoadJsonService {
  /**
   * Splits large JSON files into smaller chunks and generates manifests.
   *
   * This method reads JSON files from the `/data` directory, splits them into
   * chunks of predefined size (100 items per chunk), saves these chunks under
   * `/public/chunks`, and writes a manifest file under `/public/manifests`.
   *
   * Must be run in Node.js environment (throws error if called in browser).
   *
   * @throws {Error} If called outside Node.js environment.
   */
  generateChunks(): void {
    if (!this.isNode()) {
      throw Error('You cannot call the method in browser.');
    }

    // Node.js imports dynamically loaded inside the method to avoid bundling in client builds
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('node:fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('node:path');

    const chunkSize = 100;

    Object.values(JSONFileNames).forEach((fileName) => {
      const inputPath = path.join(process.cwd(), 'data', `${ fileName }.json`);
      const outputChunkDir = path.join(process.cwd(), 'public', 'chunks');
      const outputManifestDir = path.join(process.cwd(), 'public', 'manifests', fileName);

      if (!fs.existsSync(inputPath)) {
        return;
      }

      const rawData = fs.readFileSync(inputPath, 'utf-8');
      const data: unknown[] = JSON.parse(rawData);

      if (!fs.existsSync(outputChunkDir)) fs.mkdirSync(outputChunkDir, { recursive: true });
      if (!fs.existsSync(outputManifestDir)) fs.mkdirSync(outputManifestDir, { recursive: true });

      const totalChunks = Math.ceil(data.length / chunkSize);

      for (let i = 0; i < totalChunks; i++) {
        const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
        const chunkPath = path.join(outputChunkDir, `${ fileName }_${ i + 1 }.json`);
        fs.writeFileSync(chunkPath, JSON.stringify(chunk, null, 2), 'utf-8');
      }

      const manifest: Manifest = {
        chunkPrefix: fileName,
        chunkSize,
        totalChunks,
      };

      const manifestPath = path.join(outputManifestDir, 'total.json');
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
    });
  }

  /**
   * Fetches a specific chunk of data by file name and page number.
   *
   * @template T The expected type of data items in the chunk.
   * @param {JSONFileNames} fileName - The base name of the JSON file.
   * @param {number} page - The chunk page number to fetch (1-based).
   * @returns {Promise<T>} A promise resolving to the parsed JSON chunk data.
   */
  getItems<T>(fileName: JSONFileNames, page: number): Promise<T> {
    return fetch(`/chunks/${ fileName }_${ page }.json`).then(res => res.json());
  }

  /**
   * Fetches the manifest containing chunk metadata for the given file.
   *
   * The manifest contains:
   * - totalChunks: number of chunks the file is split into,
   * - chunkPrefix: base file name prefix,
   * - chunkSize: number of items per chunk.
   *
   * @param {JSONFileNames} fileName - The base name of the JSON file.
   * @returns {Promise<Manifest>} A promise resolving to the manifest data.
   */
  getTotalCount(fileName: JSONFileNames): Promise<Manifest> {
    return fetch(`/manifests/${ fileName }/total.json`).then(res => res.json());
  }

  private isNode(): boolean {
    return typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null;
  }
}