import { type MigrationInterface, type QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

const CurrencyAdminForeignKey = 'FK_currency_adminId_users_id';
const CountryAdminForeignKey = 'FK_country_adminId_users_id';

export class AddAdminIdToLookups1746000000000 implements MigrationInterface {
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
    const updatedCurrencyTable = await queryRunner.getTable('currency');
    if (updatedCurrencyTable && !updatedCurrencyTable.foreignKeys.some((key) => key.name === CurrencyAdminForeignKey)) {
      await queryRunner.createForeignKey(
        'currency',
        new TableForeignKey({
          name: CurrencyAdminForeignKey,
          columnNames: ['adminId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
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
    const updatedCountryTable = await queryRunner.getTable('country');
    if (updatedCountryTable && !updatedCountryTable.foreignKeys.some((key) => key.name === CountryAdminForeignKey)) {
      await queryRunner.createForeignKey(
        'country',
        new TableForeignKey({
          name: CountryAdminForeignKey,
          columnNames: ['adminId'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          onDelete: 'SET NULL',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const currencyTable = await queryRunner.getTable('currency');
    if (currencyTable?.foreignKeys.some((key) => key.name === CurrencyAdminForeignKey)) {
      await queryRunner.dropForeignKey('currency', CurrencyAdminForeignKey);
    }
    if (currencyTable?.findColumnByName('adminId')) {
      await queryRunner.dropColumn('currency', 'adminId');
    }
    const countryTable = await queryRunner.getTable('country');
    if (countryTable?.foreignKeys.some((key) => key.name === CountryAdminForeignKey)) {
      await queryRunner.dropForeignKey('country', CountryAdminForeignKey);
    }
    if (countryTable?.findColumnByName('adminId')) {
      await queryRunner.dropColumn('country', 'adminId');
    }
  }
}
