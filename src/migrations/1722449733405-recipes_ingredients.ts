import { MigrationInterface, QueryRunner } from "typeorm";

export class RecipesIngredients1722449733405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE recipe_ingredients (
      id SERIAL PRIMARY KEY,
      recipe_id INT REFERENCES recipes(id),
      ingredient_id INT);`);

    await queryRunner.query(`
      INSERT INTO recipe_ingredients (recipe_id, ingredient_id) VALUES
      (43, 1), (43, 4), (43, 7),
      (44, 2), (44, 10), (44, 5),
      (45, 3), (45, 8), (45, 4),
      (46, 10), (46, 5), (46, 1),
      (47, 7), (47, 6), (47, 2),
      (48, 9), (48, 8), (48, 10)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE recipe_ingredients`);
  }
}
