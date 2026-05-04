import { type MigrationInterface, type QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueColumnsInBudgetPlan1777654086405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'budget_plan_orm',
      new TableUnique({
        name: 'UQ_budget_plan_userId_month_year',
        columnNames: ['userId', 'month', 'year'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('budget_plan_orm', 'UQ_budget_plan_userId_month_year');
  }
}
