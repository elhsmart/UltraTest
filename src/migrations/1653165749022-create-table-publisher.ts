import { MigrationInterface, QueryRunner } from "typeorm"

export class createTablePublisher1653165749022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // CREATE TABLE `publishers` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(128) NULL DEFAULT '', `siret` varchar(14) NULL DEFAULT '', `phone` varchar(16) NULL DEFAULT '', `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB
        await queryRunner.query("CREATE TABLE IF NOT EXISTS `publishers` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(128) NULL DEFAULT '', `siret` varchar(14) NULL DEFAULT '', `phone` varchar(16) NULL DEFAULT '', `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // DROP TABLE `publishers`
        await queryRunner.query("DROP TABLE `publishers`");
    }

}
