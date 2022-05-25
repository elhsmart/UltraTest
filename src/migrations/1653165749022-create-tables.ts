import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTables1653165749022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`publishers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(128) NULL DEFAULT '', \`siret\` varchar(14) NULL DEFAULT '', \`phone\` varchar(16) NULL DEFAULT '', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(32) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_25cae3ff755adc0abe5ca28409\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`games\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(128) NOT NULL, \`price\` decimal(8,2) NOT NULL DEFAULT '0.00', \`releaseDate\` date NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`publisherId\` int NULL, UNIQUE INDEX \`IDX_06734e8b047d4cd535598fcde0\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`discounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` decimal(2,0) NOT NULL DEFAULT '0', \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`gameId\` int NULL, UNIQUE INDEX \`REL_535ebd257dc25962481c184141\` (\`gameId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`games_tag_tags\` (\`gamesId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_003202ce491627643ccbd6b4c7\` (\`gamesId\`), INDEX \`IDX_38a7873f8626488a1877085c80\` (\`tagsId\`), PRIMARY KEY (\`gamesId\`, \`tagsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`games\` ADD CONSTRAINT \`FK_ac1293076b49d61bb4a47d8b485\` FOREIGN KEY (\`publisherId\`) REFERENCES \`publishers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`discounts\` ADD CONSTRAINT \`FK_535ebd257dc25962481c1841414\` FOREIGN KEY (\`gameId\`) REFERENCES \`games\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`games_tag_tags\` ADD CONSTRAINT \`FK_003202ce491627643ccbd6b4c76\` FOREIGN KEY (\`gamesId\`) REFERENCES \`games\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`games_tag_tags\` ADD CONSTRAINT \`FK_38a7873f8626488a1877085c804\` FOREIGN KEY (\`tagsId\`) REFERENCES \`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`games_tag_tags\` DROP FOREIGN KEY \`FK_38a7873f8626488a1877085c804\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`games_tag_tags\` DROP FOREIGN KEY \`FK_003202ce491627643ccbd6b4c76\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`discounts\` DROP FOREIGN KEY \`FK_535ebd257dc25962481c1841414\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`games\` DROP FOREIGN KEY \`FK_ac1293076b49d61bb4a47d8b485\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_38a7873f8626488a1877085c80\` ON \`games_tag_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_003202ce491627643ccbd6b4c7\` ON \`games_tag_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`games_tag_tags\``);
    await queryRunner.query(
      `DROP INDEX \`REL_535ebd257dc25962481c184141\` ON \`discounts\``,
    );
    await queryRunner.query(`DROP TABLE \`discounts\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_06734e8b047d4cd535598fcde0\` ON \`games\``,
    );
    await queryRunner.query(`DROP TABLE \`games\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_25cae3ff755adc0abe5ca28409\` ON \`tags\``,
    );
    await queryRunner.query(`DROP TABLE \`tags\``);
    await queryRunner.query(`DROP TABLE \`publishers\``);
  }
}
