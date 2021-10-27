import {MigrationInterface, QueryRunner} from "typeorm";

export class initialState1633634015393 implements MigrationInterface {
    name = 'initialState1633634015393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" ("todo_id" SERIAL NOT NULL, "title" character varying NOT NULL, "status" character varying NOT NULL, "description" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL, "IsDisabled" boolean NOT NULL, "authorUserId" integer, CONSTRAINT "PK_cbbb2cf9f31f6b57376f75b5a16" PRIMARY KEY ("todo_id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, "created_on" TIMESTAMP NOT NULL DEFAULT now(), "last_login" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying NOT NULL, CONSTRAINT "PK_3000dad1da61b29953f07476324" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("role_id" SERIAL NOT NULL, "role_name" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_09f4c8130b54f35925588a37b6a" PRIMARY KEY ("role_id"))`);
        await queryRunner.query(`CREATE TABLE "accounts_permission_roles" ("accountsUserId" integer NOT NULL, "rolesRoleId" integer NOT NULL, CONSTRAINT "PK_c9185fb565440fba794ad4d8976" PRIMARY KEY ("accountsUserId", "rolesRoleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91c9da55bd5198dbd412099c28" ON "accounts_permission_roles" ("accountsUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_845f9e65d4aa71dee49e5e2a1f" ON "accounts_permission_roles" ("rolesRoleId") `);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_ae768ad1ca1ddc2a4ab0f5cfd62" FOREIGN KEY ("authorUserId") REFERENCES "accounts"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts_permission_roles" ADD CONSTRAINT "FK_91c9da55bd5198dbd412099c282" FOREIGN KEY ("accountsUserId") REFERENCES "accounts"("user_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accounts_permission_roles" ADD CONSTRAINT "FK_845f9e65d4aa71dee49e5e2a1f7" FOREIGN KEY ("rolesRoleId") REFERENCES "roles"("role_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts_permission_roles" DROP CONSTRAINT "FK_845f9e65d4aa71dee49e5e2a1f7"`);
        await queryRunner.query(`ALTER TABLE "accounts_permission_roles" DROP CONSTRAINT "FK_91c9da55bd5198dbd412099c282"`);
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_ae768ad1ca1ddc2a4ab0f5cfd62"`);
        await queryRunner.query(`DROP INDEX "IDX_845f9e65d4aa71dee49e5e2a1f"`);
        await queryRunner.query(`DROP INDEX "IDX_91c9da55bd5198dbd412099c28"`);
        await queryRunner.query(`DROP TABLE "accounts_permission_roles"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
