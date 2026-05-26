import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddPlannedRegOpsBudgetAndTrackingAttachments1779821472804 implements MigrationInterface {
  name = 'AddPlannedRegOpsBudgetAndTrackingAttachments1779821472804';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tracking-operation" ADD "attachedPlannedRegEntryId" integer`);
    await queryRunner.query(`ALTER TABLE "tracking-operation" ADD "attachedPlannedMonthEntryId" integer`);
    await queryRunner.query(
      `ALTER TABLE "tracking-operation" ADD CONSTRAINT "FK_5855fcabedb7f4688273f1fbe1c" FOREIGN KEY ("attachedPlannedRegEntryId") REFERENCES "planned-reg-ops-budget"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tracking-operation" ADD CONSTRAINT "FK_a90a8098a2fcc622c8d6d10bd82" FOREIGN KEY ("attachedPlannedMonthEntryId") REFERENCES "month_entry_orm"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tracking-operation" DROP CONSTRAINT "FK_a90a8098a2fcc622c8d6d10bd82"`);
    await queryRunner.query(`ALTER TABLE "tracking-operation" DROP CONSTRAINT "FK_5855fcabedb7f4688273f1fbe1c"`);
    await queryRunner.query(`ALTER TABLE "tracking-operation" DROP COLUMN "attachedPlannedMonthEntryId"`);
    await queryRunner.query(`ALTER TABLE "tracking-operation" DROP COLUMN "attachedPlannedRegEntryId"`);
  }
}
