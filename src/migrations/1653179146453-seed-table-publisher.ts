import { MigrationInterface, QueryRunner } from 'typeorm';
import { Publisher } from 'src/modules/publisher/entities';

export class seedTablePublisher1653179146453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const GBP = await queryRunner.manager.save(
      queryRunner.manager.create<Publisher>(Publisher, {
        id: 1,
        name: 'Bethesda',
        phone: '+13019268300',
        siret: '48215151100029',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM publisher`);
  }
}
