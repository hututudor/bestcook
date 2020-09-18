const createError = (message: string, code: number, payload?: any) => {
  const error = new Error(message);

  // @ts-ignore
  error['code'] = code;

  if (payload) {
    // @ts-ignore
    error['payload'] = payload;
  }

  return error;
};

export const userAlreadyExistsError = createError('User already exists', 409);
export const validationFailed = (data: string) =>
  createError('Validation failed', 400, data);
