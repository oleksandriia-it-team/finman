import { type MigrationInterface, type QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueColumnsInRegularEntry1777723411134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'regular-entry',
      new TableUnique({
        name: 'UQ_regular_entry_userId_title',
        columnNames: ['userId', 'title'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('regular-entry', 'UQ_regular_entry_userId_title');
  }
}
