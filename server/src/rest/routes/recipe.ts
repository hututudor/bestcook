import { Router } from 'express';
import { restRequest } from '../utils/restRequest';
import {
  createRecipe,
  getRecipe,
  getRecipesByUserId
} from '../../entities/recipe';
import { databaseGetUserById } from '../../mongodb/user';
import {
  databaseGetRecipeById,
  databaseGetRecipesByUserId,
  databaseSaveRecipe
} from '../../mongodb/recipe';
import { getToken } from '../utils/getToken';

export const recipeRouter = Router();

recipeRouter.post(
  '/',
  restRequest(async req => {
    return createRecipe({
      databaseGetUserById,
      databaseSaveRecipe
    })({
      jwt: getToken(req),
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      published: req.body.published,
      title: req.body.title,
      description: req.body.description,
      images: req.body.images,
      cover: req.body.cover,
      time_to_cook: req.body.time_to_cook,
      servings: req.body.servings
    });
  })
);

recipeRouter.get(
  '/:id',
  restRequest(async req => {
    return getRecipe({
      databaseGetUserById,
      databaseGetRecipeById
    })({
      jwt: getToken(req),
      id: req.params.id
    });
  })
);

recipeRouter.get(
  '/user/:id',
  restRequest(async req => {
    return getRecipesByUserId({
      databaseGetUserById,
      databaseGetRecipesByUserId
    })({
      jwt: getToken(req),
      id: req.params.id,
      skip: +req.query.skip || 0,
      limit: +req.query.limit || 0
    });
  })
);
