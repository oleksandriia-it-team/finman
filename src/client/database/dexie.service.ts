import type { RecordModel } from '@common/models/record.model';
import Dexie, { type Table } from 'dexie';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';

export class DexieService extends Dexie {
  // Table declarations are filled dynamically in the constructor; we use
  // `Record<string, Table>` so the class compiles without listing every table.
  [key: string]: Table<RecordModel & DefaultTableColumns, number> | unknown;

  constructor(name: string, tableNames: string[]) {
    super(name);

    const schema = tableNames.reduce<Record<string, string>>((acc, t) => {
      acc[t] = '++id,softDeleted';
      return acc;
    }, {});

    this.version(1).stores(schema);
  }
}
