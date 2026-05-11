import type { RecordModel } from '@common/models/record.model';
import Dexie, { type Table } from 'dexie';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { TableLocalModel } from '@frontend/shared/models/table.local.model';

export class DexieService extends Dexie {
  // Table declarations are filled dynamically in the constructor; we use
  // `Record<string, Table>` so the class compiles without listing every table.
  [key: string]: Table<RecordModel & DefaultTableColumns, number> | unknown;

  constructor(name: string, tableNames: TableLocalModel[], version: number) {
    super(name);

    const schema = tableNames.reduce<Record<string, string>>((acc, { name, indexedColumns }) => {
      const extra = indexedColumns?.length ? `,${indexedColumns.join(',')}` : '';
      acc[name] = `++id,softDeleted${extra}`;
      return acc;
    }, {});

    this.version(version).stores(schema);
  }
}
