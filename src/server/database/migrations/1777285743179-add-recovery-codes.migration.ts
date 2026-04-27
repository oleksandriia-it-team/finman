import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from 'typeorm';

export class AddRecoveryCodesTable1777285743179 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('recovery_codes');
    if (tableExists) return;

    await queryRunner.createTable(
      new Table({
        name: 'recovery_codes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'softDeleted', type: 'int', default: 0 },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'code',
            type: 'varchar',
            length: '6',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '40',
          },
          {
            name: 'expiresAt',
            type: 'timestamp',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'recovery_codes',
      new TableForeignKey({
        columnNames: ['email'],
        referencedColumnNames: ['email'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('recovery_codes');
  }
}
