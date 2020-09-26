import { User } from '../interfaces/user';
import { Recipe } from '../interfaces/recipe';

export const hasPermissionToAccessRecipe = (
  user: User | null,
  recipe: Recipe
) => (user && user.id && user.id === recipe.user_id) || recipe.published;

export const hasPermissionToModifyRecipe = (
  user: User | null,
  recipe: Recipe
) => user && user.id && user.id === recipe.user_id;
