import { Router } from 'express';
import { restRequest } from '../utils/restRequest';
import {
  createRecipe,
  getRecipe,
  getRecipesByUserId,
  removeRecipe,
  updateRecipe
} from '../../entities/recipe';
import { databaseGetUserById } from '../../mongodb/user';
import {
  databaseGetRecipeById,
  databaseGetRecipesByUserId,
  databaseRemoveRecipe,
  databaseSaveRecipe
} from '../../mongodb/recipe';
import { includeId, includeJWT, includePagination } from '../utils/include';

export const recipeRouter = Router();

const includeCommonFields = (req: any) => ({
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

recipeRouter.post(
  '/',
  restRequest(async req => {
    return createRecipe({
      databaseGetUserById,
      databaseSaveRecipe
    })({
      ...includeJWT(req),
      ...includeCommonFields(req)
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
      ...includeJWT(req),
      ...includeId(req)
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
      ...includeJWT(req),
      ...includeId(req),
      ...includePagination(req)
    });
  })
);

recipeRouter.put(
  '/:id',
  restRequest(async req => {
    return updateRecipe({
      databaseGetUserById,
      databaseSaveRecipe
    })({
      ...includeJWT(req),
      ...includeId(req),
      ...includeCommonFields(req)
    });
  })
);

recipeRouter.delete(
  '/:id',
  restRequest(async req => {
    return removeRecipe({
      databaseGetUserById,
      databaseRemoveRecipe
    })({
      ...includeJWT(req),
      ...includeId(req)
    });
  })
);
