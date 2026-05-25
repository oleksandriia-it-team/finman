import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreatePlannedRegOpsBudgetOrm1779749954455 implements MigrationInterface {
  name = 'CreatePlannedRegOpsBudgetOrm1779749954455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "planned-reg-ops-budget" ("id" SERIAL NOT NULL, "softDeleted" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "regularOperationId" integer NOT NULL, "budgetPlanId" integer NOT NULL, CONSTRAINT "UQ_2f2cbbe0d8c0b8a27f35313b60e" UNIQUE ("regularOperationId", "budgetPlanId"), CONSTRAINT "PK_82adfffa561ed3a5ec5d7d63ef5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "planned-reg-ops-budget" ADD CONSTRAINT "FK_65dea5584cc109a3c9573f880a1" FOREIGN KEY ("regularOperationId") REFERENCES "regular-entry"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "planned-reg-ops-budget" ADD CONSTRAINT "FK_02944574cacc8b155d64a3d5b8b" FOREIGN KEY ("budgetPlanId") REFERENCES "budget_plan_orm"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "planned-reg-ops-budget" DROP CONSTRAINT "FK_02944574cacc8b155d64a3d5b8b"`);
    await queryRunner.query(`ALTER TABLE "planned-reg-ops-budget" DROP CONSTRAINT "FK_65dea5584cc109a3c9573f880a1"`);
    await queryRunner.query(`DROP TABLE "planned-reg-ops-budget"`);
  }
}
