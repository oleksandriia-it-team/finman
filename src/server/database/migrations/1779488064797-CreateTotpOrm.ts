import { type MigrationInterface, type QueryRunner, Table, TableForeignKey } from 'typeorm';
import { TotpRequirements } from '@backend/entities/totp/domain/totp-requirements.constant';

export class CreateTotpTable1779488064797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'totp_orm',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
          {
            name: 'secret',
            type: 'varchar',
            length: String(TotpRequirements.SecretLength),
          },
          {
            name: 'enabled',
            type: 'boolean',
            default: false,
          },
          {
            name: 'userId',
            type: 'int',
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'totp_orm',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('totp_orm');
    const foreignKey = table!.foreignKeys.find((fk) => fk.columnNames.includes('userId'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('totp_orm', foreignKey);
    }
    await queryRunner.dropTable('totp_orm');
  }
}
