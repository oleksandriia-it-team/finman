export interface DefaultTableColumns {
  id: number; // Primary key used as the unique identifier for each record
  softDeleted: 0 | 1; // Soft deletion flag: 0 = active, 1 = deleted (used for indexing instead of boolean for better IndexedDB compatibility)
}

export type DefaultColumnKeys = keyof DefaultTableColumns;
