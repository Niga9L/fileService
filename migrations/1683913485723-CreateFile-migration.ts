import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFileMigration1683913485723 implements MigrationInterface {
    name = 'CreateFileMigration1683913485723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "is_published"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "is_published" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "is_published"`);
        await queryRunner.query(`ALTER TABLE "files" ADD "is_published" character varying NOT NULL`);
    }

}
