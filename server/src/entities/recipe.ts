import {
  CreateRecipeData,
  CreateRecipeDependencies,
  GetRecipeData,
  GetRecipeDependencies,
  GetRecipesByUserIdData,
  GetRecipesByUserIdDependencies,
  Recipe
} from '../interfaces/recipe';
import { validateSchema } from '../utils/validateSchema';
import {
  createRecipeSchema,
  getRecipesByUserIdSchema,
  getRecipeSchema
} from '../validation/recipe';
import { getUser, getUserIfAuth } from './user';
import {
  recipeDoesNotExistError,
  recipeUnauthorizedError
} from '../utils/errors';
import { User } from '../interfaces/user';
import { hasPermissionToAccessRecipe } from '../permissions/recipe';

export const createRecipe = ({
  databaseGetUserById,
  databaseSaveRecipe
}: CreateRecipeDependencies) => async (
  data: CreateRecipeData
): Promise<Recipe> => {
  await validateSchema(createRecipeSchema, data);
  const user = await getUser({ databaseGetUserById })(data);

  let recipe: Recipe = {
    id: '',
    user_id: user.id,
    ingredients: data.ingredients,
    steps: data.steps,
    published: data.published,
    title: data.title,
    description: data.description,
    images: data.images,
    cover: data.cover,
    time_to_cook: data.time_to_cook,
    servings: data.servings,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  recipe = await databaseSaveRecipe(recipe);

  return recipe;
};

export const getRecipe = ({
  databaseGetRecipeById,
  databaseGetUserById
}: GetRecipeDependencies) => async (data: GetRecipeData): Promise<Recipe> => {
  await validateSchema(getRecipeSchema, data);
  const user = await getUserIfAuth({ databaseGetUserById })(data);
  const recipe = await databaseGetRecipeById(data.id);

  if (!recipe) {
    throw recipeDoesNotExistError;
  }

  if (!hasPermissionToAccessRecipe(user, recipe)) {
    throw recipeUnauthorizedError;
  }

  return recipe;
};

export const getRecipesByUserId = ({
  databaseGetRecipesByUserId,
  databaseGetUserById
}: GetRecipesByUserIdDependencies) => async (
  data: GetRecipesByUserIdData
): Promise<Recipe[]> => {
  await validateSchema(getRecipesByUserIdSchema, data);
  const user = await getUserIfAuth({ databaseGetUserById })(data);

  const recipes = await databaseGetRecipesByUserId(
    data.id,
    data.skip,
    data.limit
  );

  return recipes.filter(recipe => hasPermissionToAccessRecipe(user, recipe));
};
