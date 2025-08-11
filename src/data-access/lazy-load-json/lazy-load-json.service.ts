import { JSONFileNames } from './enums/json-files.enum';
import { Manifest } from './models/manifest.model';
import { GetJsonItemsResult } from './models/get-json-items-result';

/**
 * Service for lazy loading JSON data chunks.
 *
 * Provides methods to fetch JSON data chunks and their manifest metadata via HTTP.
 * Supports optional custom path prefixes for chunk and manifest files.
 */
export class LazyLoadJsonService {
  /**
   * Fetches a specific chunk of JSON data by file name and chunk page number.
   *
   * @template T - Type of the expected data items in the chunk.
   * @param {T} fileName - Base name of the JSON file (without chunk suffix).
   * @param {number} page - 1-based chunk page number to fetch.
   * @param {string} [path] - Optional custom base path to load the chunk from.
   * @returns {Promise<GetJsonItemsResult[T][]>} Promise resolving to an array of items of the corresponding type.
   */
  getItems<T extends JSONFileNames>(
    fileName: T,
    page: number,
    path?: string
  ): Promise<GetJsonItemsResult[T][]> {
    const url = path ? `${ path }/${ fileName }_${ page }.json` : `/chunks/${ fileName }_${ page }.json`;
    return fetch(url).then(res => res.json());
  }

  /**
   * Fetches the manifest JSON describing chunk metadata for a given file.
   *
   * The manifest typically includes properties like:
   * - totalChunks: number of chunks the JSON file is split into,
   * - chunkPrefix: base file name prefix,
   * - chunkSize: number of items per chunk.
   *
   * @param {JSONFileNames} fileName - Base name of the JSON file.
   * @param {string} [path] - Optional custom base path to load the manifest from.
   * @returns {Promise<Manifest>} Promise resolving to the manifest data.
   */
  getTotalCount(
    fileName: JSONFileNames,
    path?: string
  ): Promise<Manifest> {
    const url = path ? `${ path }/${ fileName }.json` : `/manifests/${ fileName }.json`;
    return fetch(url).then(res => res.json());
  }
}
