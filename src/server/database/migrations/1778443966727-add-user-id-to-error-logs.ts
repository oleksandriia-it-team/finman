import type { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserIdToErrorLogs1778443966727 implements MigrationInterface {
  name = 'AddUserIdToErrorLogs1778443966727';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "error-logs" ADD "userId" integer`);
    await queryRunner.query(
      `ALTER TABLE "error-logs" ADD CONSTRAINT "FK_134fc7e109049d179dfd37059ef" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "error-logs" DROP CONSTRAINT "FK_134fc7e109049d179dfd37059ef"`);
    await queryRunner.query(`ALTER TABLE "error-logs" DROP COLUMN "userId"`);
  }
}
