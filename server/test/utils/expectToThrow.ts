export const expectToThrow = async (
  fn: Promise<any>,
  error: Error
): Promise<any> => {
  return new Promise(resolve => {
    fn.then(() => {
      throw new Error('Did not throw error');
    }).catch((err: any) => {
      expect(err.message).toBe(error.message);
      resolve();
    });
  });
};
