import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1684249556363 implements MigrationInterface {
  name = ' Migration1684249556363';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "title"`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "is_published"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "files" ADD "is_published" boolean NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "files" ADD "title" character varying NOT NULL`,
    );
  }
}
