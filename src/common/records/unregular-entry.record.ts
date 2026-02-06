import { TypeEntry } from '../enums/entry.enum';

export interface UnregularEntry {
  type: TypeEntry;
  description: string;
  sum: number;
  regular: false;
}
