import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddUserCascadeToBudgetPlanAndRegularEntry1780787231228 implements MigrationInterface {
  name = 'AddUserCascadeToBudgetPlanAndRegularEntry1780787231228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.dropUserForeignKey(queryRunner, 'budget_plan_orm');
    await queryRunner.query(
      `ALTER TABLE "budget_plan_orm" ADD CONSTRAINT "FK_budget_plan_orm_userId_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await this.dropUserForeignKey(queryRunner, 'regular-entry');
    await queryRunner.query(
      `ALTER TABLE "regular-entry" ADD CONSTRAINT "FK_regular_entry_userId_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "regular-entry" DROP CONSTRAINT "FK_regular_entry_userId_users"`);
    await queryRunner.query(
      `ALTER TABLE "regular-entry" ADD CONSTRAINT "FK_regular_entry_userId_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(`ALTER TABLE "budget_plan_orm" DROP CONSTRAINT "FK_budget_plan_orm_userId_users"`);
    await queryRunner.query(
      `ALTER TABLE "budget_plan_orm" ADD CONSTRAINT "FK_budget_plan_orm_userId_users" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  private async dropUserForeignKey(queryRunner: QueryRunner, tableName: string): Promise<void> {
    const rows: Array<{ constraint_name: string }> = await queryRunner.query(
      `SELECT tc.constraint_name
       FROM information_schema.table_constraints tc
       JOIN information_schema.key_column_usage kcu
         ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
       WHERE tc.table_name = $1
         AND tc.constraint_type = 'FOREIGN KEY'
         AND kcu.column_name = 'userId'`,
      [tableName],
    );

    for (const row of rows) {
      await queryRunner.query(`ALTER TABLE "${tableName}" DROP CONSTRAINT "${row.constraint_name}"`);
    }
  }
}
