import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreateTotpOrm1779620534129 implements MigrationInterface {
  name = 'CreateTotpOrm1779620534129';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "totp_orm" ("id" SERIAL NOT NULL, "softDeleted" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "secret" character varying(32) NOT NULL, "enabled" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, CONSTRAINT "REL_b752dd257d28f45e3444c32922" UNIQUE ("userId"), CONSTRAINT "PK_c09ca137d11ea7ee3bd711bd15f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "totp_orm" ADD CONSTRAINT "FK_b752dd257d28f45e3444c329221" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "totp_orm" DROP CONSTRAINT "FK_b752dd257d28f45e3444c329221"`);
    await queryRunner.query(`DROP TABLE "totp_orm"`);
  }
}
