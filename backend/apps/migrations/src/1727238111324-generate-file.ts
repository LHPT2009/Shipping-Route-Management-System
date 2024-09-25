import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateFile1727238111324 implements MigrationInterface {
    name = 'GenerateFile1727238111324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" DROP CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd"`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_3309f5fa8d95935f0701027f2bd" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "permissions_roles" ADD CONSTRAINT "FK_e08f6859eaac8cbf7f087f64e2b" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
