import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddCountryUkName1777800000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "country"
      ADD COLUMN "countryUk" varchar(40) NOT NULL DEFAULT ''
    `);

    await queryRunner.query(`
      UPDATE "country"
      SET "countryUk" = "country"
      WHERE "countryUk" = ''
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "country"
      DROP COLUMN "countryUk"
    `);
  }
}
