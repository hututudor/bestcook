import * as yup from 'yup';

export const getRecipeSchema = yup.object().shape({});

export const createRecipeSchema = yup.object().shape({
  published: yup.boolean().required(),
  ingredients: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          amount: yup.string().required(),
          value: yup.string().required()
        })
        .required()
    )
    .defined(),
  steps: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          content: yup.string().required()
        })
        .required()
    )
    .defined(),
  title: yup.string().required(),
  description: yup.string().defined(),
  images: yup
    .array()
    .of(yup.string().required())
    .defined(),
  cover: yup.string().required(),
  time_to_cook: yup.number().required(),
  servings: yup.number().required()
});

export const getRecipesByUserIdSchema = yup.object().shape({
  skip: yup.number().notRequired(),
  limit: yup.number().notRequired()
});

export const updateRecipeSchema = yup.object().shape({
  published: yup.boolean().notRequired(),
  ingredients: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          amount: yup.string().required(),
          value: yup.string().required()
        })
        .required()
    )
    .notRequired(),
  steps: yup
    .array()
    .of(
      yup
        .object()
        .shape({
          content: yup.string().required()
        })
        .required()
    )
    .notRequired(),
  title: yup.string().notRequired(),
  description: yup.string().notRequired(),
  images: yup
    .array()
    .of(yup.string().required())
    .notRequired(),
  cover: yup.string().notRequired(),
  time_to_cook: yup.number().notRequired(),
  servings: yup.number().notRequired()
});
