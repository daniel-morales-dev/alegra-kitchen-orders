import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Recipes } from "./recipes.model";

@Entity("recipe_ingredients")
export class RecipeIngredients {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "integer", name: "recipe_id" })
  recipeId: number;

  @Column({ type: "integer", name: "ingredient_id" })
  ingredientId: number;

  @Column({ type: "integer", name: "quantity" })
  quantity: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.recipeIngredients)
  @JoinColumn({ name: "recipe_id", referencedColumnName: "id" })
  recipe!: Recipes;
}
