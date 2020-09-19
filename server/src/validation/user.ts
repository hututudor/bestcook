import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(5)
    .required()
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export const getUserSchema = yup.object().shape({
  jwt: yup.string().required()
});
