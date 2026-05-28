import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddPlannedRegOpsBudgetBudgetPlanIdIndex1779986547441 implements MigrationInterface {
  name = 'AddPlannedRegOpsBudgetBudgetPlanIdIndex1779986547441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_planned_reg_ops_budget_budgetPlanId" ON "planned-reg-ops-budget" ("budgetPlanId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_planned_reg_ops_budget_budgetPlanId"`);
  }
}
