import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm';

export class UpdateRecoveryCodesAddAttempts1777290000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'recovery_codes',
      new TableColumn({
        name: 'attempts',
        type: 'int',
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('recovery_codes', 'attempts');
  }
}
