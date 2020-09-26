import { Schema, model } from 'mongoose';

import { Recipe } from '../interfaces/recipe';
import {
  getManyModelByField,
  getModelByField,
  getModelById,
  removeModel,
  saveModel
} from './utils/generics';

const RecipeModel = model(
  'Recipe',
  new Schema(
    {
      user_id: {
        type: String,
        required: true
      },
      published: {
        type: Boolean,
        required: true
      },
      ingredients: [
        {
          amount: {
            type: String,
            required: true
          },
          value: {
            type: String,
            required: true
          }
        }
      ],
      steps: [
        {
          content: {
            type: String,
            required: true
          }
        }
      ],
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: [{ type: String }],
      cover: {
        type: String,
        required: true
      },
      time_to_cook: {
        type: Number,
        required: true
      },
      servings: {
        type: Number,
        required: true
      }
    },
    { timestamps: true }
  )
);

const castMongoToInterface = (recipe: any): Recipe => {
  return {
    id: recipe.id,
    user_id: recipe.user_id,
    published: recipe.published,
    ingredients: recipe.ingredients.map((ingredient: any) => ({
      id: ingredient._id,
      amount: ingredient.amount,
      value: ingredient.value
    })),
    steps: recipe.steps.map((step: any) => ({
      id: step._id,
      content: step.content
    })),
    title: recipe.title,
    description: recipe.description,
    images: recipe.images,
    cover: recipe.cover,
    time_to_cook: recipe.time_to_cook,
    servings: recipe.servings,
    updatedAt: recipe.updatedAt,
    createdAt: recipe.createdAt
  };
};

const castInterfaceToMongo = (recipe: Recipe): any => {
  return {
    user_id: recipe.user_id,
    published: recipe.published,
    ingredients: recipe.ingredients.map((ingredient: any) => ({
      amount: ingredient.amount,
      value: ingredient.value
    })),
    steps: recipe.steps.map((step: any) => ({
      content: step.content
    })),
    title: recipe.title,
    description: recipe.description,
    images: recipe.images,
    cover: recipe.cover,
    time_to_cook: recipe.time_to_cook,
    servings: recipe.servings,
    updatedAt: recipe.updatedAt,
    createdAt: recipe.createdAt
  };
};

export const databaseGetRecipesByUserId = getManyModelByField<Recipe, string>({
  castInterfaceToMongo,
  castMongoToInterface,
  Model: RecipeModel,
  field: 'user_id'
});

export const databaseGetRecipeById = getModelById<Recipe>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: RecipeModel
});

export const databaseSaveRecipe = saveModel<Recipe>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: RecipeModel
});

export const databaseRemoveRecipe = removeModel<Recipe>({
  castMongoToInterface,
  castInterfaceToMongo,
  Model: RecipeModel
});
