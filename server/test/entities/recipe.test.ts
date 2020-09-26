import * as faker from 'faker';
import { CreateRecipeData, Recipe } from '../../src/interfaces/recipe';
import { createRecipe } from '../../src/entities/recipe';
import { createUserMock } from '../mocks/user';
import { createJWT } from '../../src/utils/jwt';
import { expectToThrow } from '../utils/expectToThrow';
import {
  userDoesNotExistsError,
  validationFailed
} from '../../src/utils/errors';

const databaseGetUserByIdDefault = async () => createUserMock(true);
const databaseGetUserByIdNull = async () => null;
const databaseSaveRecipeDefault = async (recipe: Recipe) => recipe;

describe('recipe', () => {
  describe('create', () => {
    it('should create a new recipe', async () => {
      const data: CreateRecipeData = {
        ingredients: [
          {
            id: '',
            amount: faker.lorem.word(),
            value: faker.lorem.word()
          }
        ],
        steps: [
          {
            id: '',
            content: faker.lorem.paragraph()
          }
        ],
        published: true,
        title: faker.lorem.text(),
        description: faker.lorem.text(),
        images: [faker.internet.url()],
        cover: faker.internet.url(),
        time_to_cook: faker.random.number(),
        servings: faker.random.number(),
        jwt: createJWT(createUserMock())
      };

      const recipe = await createRecipe({
        databaseGetUserById: databaseGetUserByIdDefault,
        databaseSaveRecipe: databaseSaveRecipeDefault
      })(data);

      expect(recipe.published).toBe(data.published);
      expect(recipe.title).toBe(data.title);
      expect(recipe.description).toBe(data.description);
      expect(recipe.images).toBe(data.images);
      expect(recipe.cover).toBe(data.cover);
      expect(recipe.time_to_cook).toBe(data.time_to_cook);
      expect(recipe.servings).toBe(data.servings);
      expect(recipe.ingredients).toBe(data.ingredients);
      expect(recipe.steps).toBe(data.steps);
    });

    it('should throw if validation fails', async () => {
      const data: CreateRecipeData = {
        ingredients: [
          {
            id: '',
            amount: faker.lorem.word(),
            value: faker.lorem.word()
          }
        ],
        steps: [
          {
            id: '',
            content: faker.lorem.paragraph()
          }
        ],
        published: true,
        title: '',
        description: faker.lorem.text(),
        images: [faker.internet.url()],
        cover: faker.internet.url(),
        time_to_cook: faker.random.number(),
        servings: faker.random.number(),
        jwt: createJWT(createUserMock())
      };

      await expectToThrow(
        createRecipe({
          databaseGetUserById: databaseGetUserByIdDefault,
          databaseSaveRecipe: databaseSaveRecipeDefault
        })(data),
        validationFailed()
      );
    });

    it('should create a new recipe', async () => {
      const data: CreateRecipeData = {
        ingredients: [
          {
            id: '',
            amount: faker.lorem.word(),
            value: faker.lorem.word()
          }
        ],
        steps: [
          {
            id: '',
            content: faker.lorem.paragraph()
          }
        ],
        published: true,
        title: faker.lorem.text(),
        description: faker.lorem.text(),
        images: [faker.internet.url()],
        cover: faker.internet.url(),
        time_to_cook: faker.random.number(),
        servings: faker.random.number(),
        jwt: createJWT(createUserMock())
      };

      await expectToThrow(
        createRecipe({
          databaseGetUserById: databaseGetUserByIdNull,
          databaseSaveRecipe: databaseSaveRecipeDefault
        })(data),
        userDoesNotExistsError
      );
    });
  });
});
