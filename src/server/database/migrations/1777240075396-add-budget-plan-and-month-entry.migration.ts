import { type MigrationInterface, type QueryRunner, Table, TableColumn } from 'typeorm';

const monthEnumValues = Array.from({ length: 12 }, (_, value) => String(value));
const typeEnumValues = ['expense', 'income'];
const categoryEnumValues = [
  'groceries',
  'housing',
  'utilities',
  'transport',
  'entertainment',
  'education',
  'shopping',
  'health',
  'expense-misc',
  'salary',
  'investments',
  'freelance',
  'scholarship',
  'income-misc',
];
const regularFrequencyEnumValues = ['daily', 'weekly', 'monthly', 'yearly'];

export class AddBudgetPlanAndMonthEntry1777240075396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const budgetPlanTableExists = await queryRunner.hasTable('budget_plan_orm');
    if (!budgetPlanTableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'budget_plan_orm',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            { name: 'month', type: 'enum', enum: monthEnumValues },
            { name: 'year', type: 'int' },
            { name: 'userId', type: 'int' },
            { name: 'softDeleted', type: 'int', default: 0 },
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          ],
          foreignKeys: [
            {
              name: 'FK_budget_plan_orm_userId_user_id',
              columnNames: ['userId'],
              referencedTableName: 'user',
              referencedColumnNames: ['id'],
            },
          ],
        }),
        true,
      );
    }

    const monthEntryTableExists = await queryRunner.hasTable('month_entry_orm');
    if (!monthEntryTableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'month_entry_orm',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            { name: 'title', type: 'varchar', length: '20', isUnique: true },
            { name: 'description', type: 'varchar', length: '100', isUnique: true },
            { name: 'sum', type: 'int' },
            { name: 'type', type: 'enum', enum: typeEnumValues },
            { name: 'category', type: 'enum', enum: categoryEnumValues },
            { name: 'selected', type: 'boolean' },
            { name: 'budgetPlanId', type: 'int' },
            { name: 'softDeleted', type: 'int', default: 0 },
            { name: 'createdAt', type: 'timestamp', default: 'now()' },
            { name: 'updatedAt', type: 'timestamp', default: 'now()' },
          ],
          foreignKeys: [
            {
              name: 'FK_month_entry_orm_budgetPlanId_budget_plan_orm_id',
              columnNames: ['budgetPlanId'],
              referencedTableName: 'budget_plan_orm',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            },
          ],
        }),
        true,
      );
    }

    const regularEntryTable = await queryRunner.getTable('regular-entry');
    if (regularEntryTable) {
      const hasDayOfMonth = regularEntryTable.findColumnByName('dayOfMonth');
      if (!hasDayOfMonth) {
        await queryRunner.addColumn(
          'regular-entry',
          new TableColumn({
            name: 'dayOfMonth',
            type: 'int',
            isNullable: false,
            default: 1,
          }),
        );
      }

      const hasFrequency = regularEntryTable.findColumnByName('frequency');
      if (!hasFrequency) {
        await queryRunner.addColumn(
          'regular-entry',
          new TableColumn({
            name: 'frequency',
            type: 'enum',
            enum: regularFrequencyEnumValues,
            isNullable: false,
            default: "'monthly'",
          }),
        );
      }
    }

    const budgetPlanRegularEntryTableExists = await queryRunner.hasTable(
      'budget_plan_orm_planned_regular_entries_regular_entry',
    );

    if (!budgetPlanRegularEntryTableExists) {
      await queryRunner.createTable(
        new Table({
          name: 'budget_plan_orm_planned_regular_entries_regular_entry',
          columns: [
            { name: 'budgetPlanOrmId', type: 'int', isPrimary: true },
            { name: 'regularEntryId', type: 'int', isPrimary: true },
          ],
          foreignKeys: [
            {
              name: 'FK_budget_plan_regular_entry_budget_plan',
              columnNames: ['budgetPlanOrmId'],
              referencedTableName: 'budget_plan_orm',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            },
            {
              name: 'FK_budget_plan_regular_entry_regular_entry',
              columnNames: ['regularEntryId'],
              referencedTableName: 'regular-entry',
              referencedColumnNames: ['id'],
              onDelete: 'CASCADE',
            },
          ],
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const budgetPlanRegularEntryTableExists = await queryRunner.hasTable(
      'budget_plan_orm_planned_regular_entries_regular_entry',
    );
    if (budgetPlanRegularEntryTableExists) {
      await queryRunner.dropTable('budget_plan_orm_planned_regular_entries_regular_entry');
    }

    const regularEntryTable = await queryRunner.getTable('regular-entry');
    if (regularEntryTable) {
      const frequencyColumn = regularEntryTable.findColumnByName('frequency');
      if (frequencyColumn) {
        await queryRunner.dropColumn('regular-entry', 'frequency');
      }

      const dayOfMonthColumn = regularEntryTable.findColumnByName('dayOfMonth');
      if (dayOfMonthColumn) {
        await queryRunner.dropColumn('regular-entry', 'dayOfMonth');
      }
    }

    const monthEntryTableExists = await queryRunner.hasTable('month_entry_orm');
    if (monthEntryTableExists) {
      await queryRunner.dropTable('month_entry_orm');
    }

    const budgetPlanTableExists = await queryRunner.hasTable('budget_plan_orm');
    if (budgetPlanTableExists) {
      await queryRunner.dropTable('budget_plan_orm');
    }
  }
}
