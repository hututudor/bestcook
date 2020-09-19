export const expectToThrow = (fn: Promise<any>, error: Error) => {
  fn.then(() => {
    throw new Error('Did not throw error');
  }).catch((err: any) => {
    expect(err.message).toBe(error.message);
  });
};
