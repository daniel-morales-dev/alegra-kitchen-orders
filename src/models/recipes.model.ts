import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecipeIngredients } from "./recipeIngredients.model";

@Entity("recipes")
export class Recipes {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column({ type: "text", name: "name" })
  name: string;

  @OneToMany(
    () => RecipeIngredients,
    (recipeIngredients) => recipeIngredients.recipe,
  )
  recipeIngredients: RecipeIngredients[];
}
