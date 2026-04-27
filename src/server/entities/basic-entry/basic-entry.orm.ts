import { Column } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { MonthEntryRequirements } from '@common/domains/basic-entry/constants/basic-entry.constant';
import { TypeEntry } from '@common/enums/entry.enum';
import { type AllCategories, AllCategoryValues } from '@common/enums/categories.enum';

export abstract class BasicEntryOrm extends DefaultTableColumnsOrm {
  @Column({ type: 'varchar', length: MonthEntryRequirements.MaxTitleLength, unique: true })
  title!: string;

  @Column({ type: 'varchar', length: MonthEntryRequirements.MaxDescriptionLength, unique: true })
  description!: string;

  @Column({ type: 'int' })
  sum!: number;

  @Column({ type: 'enum', enum: [TypeEntry.Expense, TypeEntry.Income] })
  type!: TypeEntry.Expense | TypeEntry.Income;

  @Column({ type: 'enum', enum: AllCategoryValues })
  category!: AllCategories;
}
