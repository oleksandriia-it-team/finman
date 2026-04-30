import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm';

export class AddAdminIdToLookups1746100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable('currency');
    if (currencyTable && !currencyTable.findColumnByName('adminId')) {
      await queryRunner.addColumn(
        'currency',
        new TableColumn({
          name: 'adminId',
          type: 'int',
          isNullable: true,
          default: null,
        }),
      );
    }

    const countryTable = await queryRunner.getTable('country');
    if (countryTable && !countryTable.findColumnByName('adminId')) {
      await queryRunner.addColumn(
        'country',
        new TableColumn({
          name: 'adminId',
          type: 'int',
          isNullable: true,
          default: null,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable('currency');
    if (currencyTable?.findColumnByName('adminId')) {
      await queryRunner.dropColumn('currency', 'adminId');
    }
    const countryTable = await queryRunner.getTable('country');
    if (countryTable?.findColumnByName('adminId')) {
      await queryRunner.dropColumn('country', 'adminId');
    }
  }
}
