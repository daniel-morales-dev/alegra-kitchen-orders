import { MigrationInterface, QueryRunner } from "typeorm";

export class QuantityRecipeIngredients1722451056861
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipe_ingredients
      ADD COLUMN quantity INT NOT NULL DEFAULT 1;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE recipe_ingredients
      DROP COLUMN quantity;
    `);
  }
}
