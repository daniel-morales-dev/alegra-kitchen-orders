import { Service } from "typedi";
import { DataSource, Repository } from "typeorm";
import { Recipes } from "../models/recipes.model";

@Service()
export class RecipesRepository extends Repository<Recipes> {
  constructor(private dataSource: DataSource) {
    super(Recipes, dataSource.createEntityManager());
  }

  getRandomRecipe() {
    return this.createQueryBuilder("r")
      .select(["r.id", "r.name", "ri.id", "ri.ingredientId", "ri.quantity"])
      .innerJoin("r.recipeIngredients", "ri")
      .orderBy("RANDOM()")
      .limit(1)
      .getOne();
  }
}
