import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilesMigration1683912187663 implements MigrationInterface {
  name = 'CreateFilesMigration1683912187663';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "files" ("id" uuid NOT NULL, "name" character varying NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "user_id" character varying NOT NULL, "is_published" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "deleted_at" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "files"`);
  }
}
