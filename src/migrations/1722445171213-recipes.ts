import { MigrationInterface, QueryRunner } from "typeorm";

export class Recipes1722445171213 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE recipes (id SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
