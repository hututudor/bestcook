import { StatusCodes } from 'http-status-codes';

const createError = (message: string, code: number, payload?: any) => {
  const error = new Error(message);

  // @ts-ignore
  error['err_code'] = code;

  if (payload) {
    // @ts-ignore
    error['payload'] = payload;
  }

  return error;
};

export const validationFailed = (data?: any) =>
  createError('Validation failed', 400, data);

export const userAlreadyExistsError = createError(
  'User already exists',
  StatusCodes.CONFLICT
);

export const tokenInvalidError = createError(
  'Token is invalid',
  StatusCodes.UNAUTHORIZED
);

export const userDoesNotExistsError = createError(
  'User does not exists',
  StatusCodes.UNAUTHORIZED
);

export const userAlreadyConfirmedError = createError(
  'User is already confirmed',
  StatusCodes.CONFLICT
);

export const confirmationCodeIsInvalidError = createError(
  'Confirmation code is invalid',
  StatusCodes.BAD_REQUEST
);

export const emailOrPasswordIncorrectError = createError(
  'Email or password is incorrect',
  StatusCodes.NOT_FOUND
);

export const userNotConfirmedError = createError(
  'User is not confirmed',
  StatusCodes.UNAUTHORIZED
);

export const recipeDoesNotExistError = createError(
  'Recipe does not exists',
  StatusCodes.NOT_FOUND
);

export const recipeUnauthorizedError = createError(
  'Recipe is not authorized',
  StatusCodes.UNAUTHORIZED
);
