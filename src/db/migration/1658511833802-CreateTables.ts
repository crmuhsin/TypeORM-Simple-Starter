import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1658511833802 implements MigrationInterface {
    name = 'CreateTables1658511833802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying, "lastName" character varying, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'USER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_info" ("id" SERIAL NOT NULL, "phone" integer NOT NULL, "Sex" character varying NOT NULL, "Date of Birth" TIMESTAMP NOT NULL, "Address" character varying NOT NULL, "Photo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_3a7fa0c3809d19eaf2fb4f6594" UNIQUE ("userId"), CONSTRAINT "PK_273a06d6cdc2085ee1ce7638b24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_info" ADD CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_info" DROP CONSTRAINT "FK_3a7fa0c3809d19eaf2fb4f65949"`);
        await queryRunner.query(`DROP TABLE "user_info"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
