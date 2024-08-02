import { Service } from "typedi";
import { RecipesRepository } from "../repositories/recipes.repository";

@Service()
export class RecipesService {
  constructor(private readonly recipeRepository: RecipesRepository) {}

  async getAllRecipes() {
    const recipes = await this.recipeRepository.getAllRecipes();
    return recipes;
  }
}
