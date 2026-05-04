import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm';

export class AddPriorityInMonthEntry1777497626400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const monthEntryTableExists = await queryRunner.hasTable('month_entry_orm');
    if (monthEntryTableExists) {
      await queryRunner.addColumn(
        'month_entry_orm',
        new TableColumn({
          name: 'priority',
          type: 'int',
          isNullable: false,
          default: 1,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const monthEntryTableExists = await queryRunner.hasTable('month_entry_orm');
    if (monthEntryTableExists) {
      await queryRunner.dropColumn('month_entry_orm', 'priority');
    }
  }
}
