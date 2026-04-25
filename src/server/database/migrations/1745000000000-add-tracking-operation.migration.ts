import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

export class AddTrackingOperation1745000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const tableExists = await queryRunner.hasTable('tracking-operation');
    if (tableExists) return;

    await queryRunner.createTable(
      new Table({
        name: 'tracking-operation',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'title', type: 'varchar', length: '20' },
          { name: 'description', type: 'varchar', length: '100', isNullable: true },
          { name: 'type', type: 'enum', enum: ['expense', 'income'] },
          { name: 'date', type: 'date' },
          { name: 'sum', type: 'numeric' },
          {
            name: 'category',
            type: 'enum',
            enum: [
              'groceries',
              'housing',
              'utilities',
              'transport',
              'entertainment',
              'education',
              'shopping',
              'health',
              'misc',
              'salary',
              'investments',
              'freelance',
              'scholarship',
            ],
            default: "'misc'",
          },
          { name: 'userId', type: 'int' },
          { name: 'softDeleted', type: 'int', default: 0 },
          { name: 'createdAt', type: 'timestamp', default: 'now()' },
          { name: 'updatedAt', type: 'timestamp', default: 'now()' },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tracking-operation');
  }
}
