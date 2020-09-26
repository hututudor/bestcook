import {
  DatabaseGetById,
  DatabaseGetManyByField,
  DatabaseSave,
  HasID,
  HasPagination,
  HasTimestamps
} from './utils/generics';
import { HasAuth, HasToken } from './user';

interface Ingredients extends HasID {
  amount: string;
  value: string;
}

interface Step extends HasID {
  content: string;
}

export interface Recipe extends HasID, HasTimestamps {
  user_id: string;
  published: boolean;
  ingredients: Ingredients[];
  steps: Step[];
  title: string;
  description: string;
  images: string[];
  cover: string;
  time_to_cook: number;
  servings: number;
}

export interface CreateRecipeDependencies extends HasAuth {
  databaseSaveRecipe: DatabaseSave<Recipe>;
}

export interface CreateRecipeData extends HasToken {
  published: boolean;
  ingredients: Ingredients[];
  steps: Step[];
  title: string;
  description: string;
  images: string[];
  cover: string;
  time_to_cook: number;
  servings: number;
}

export interface GetRecipeDependencies extends HasAuth {
  databaseGetRecipeById: DatabaseGetById<Recipe>;
}

export interface GetRecipeData extends HasID, HasToken {}

export interface GetRecipesByUserIdDependencies extends HasAuth {
  databaseGetRecipesByUserId: DatabaseGetManyByField<Recipe, string>;
}

export interface GetRecipesByUserIdData
  extends HasPagination,
    HasToken,
    HasID {}
