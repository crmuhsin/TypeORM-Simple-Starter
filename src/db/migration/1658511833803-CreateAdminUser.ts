import { MigrationInterface, QueryRunner } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from '../entity/User';

export class CreateAdminUser1658511833803 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";
        user.email = "admin@admin.com";
        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
