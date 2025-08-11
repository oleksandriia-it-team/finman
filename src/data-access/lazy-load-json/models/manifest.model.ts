import { JSONFileNames } from '../enums/json-files.enum';

export interface Manifest {
  totalChunks: number;
  chunkPrefix: JSONFileNames;
  chunkSize: number;
  totalCount: number;
}