import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm';

export class AddAdminNameToLookups1746000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable('currency');
    if (currencyTable && !currencyTable.findColumnByName('adminName')) {
      await queryRunner.addColumn(
        'currency',
        new TableColumn({
          name: 'adminName',
          type: 'varchar',
          length: '100',
          isNullable: true,
          default: null,
        }),
      );
    }

    const countryTable = await queryRunner.getTable('country');
    if (countryTable && !countryTable.findColumnByName('adminName')) {
      await queryRunner.addColumn(
        'country',
        new TableColumn({
          name: 'adminName',
          type: 'varchar',
          length: '100',
          isNullable: true,
          default: null,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable('currency');
    if (currencyTable?.findColumnByName('adminName')) {
      await queryRunner.dropColumn('currency', 'adminName');
    }

    const countryTable = await queryRunner.getTable('country');
    if (countryTable?.findColumnByName('adminName')) {
      await queryRunner.dropColumn('country', 'adminName');
    }
  }
}
