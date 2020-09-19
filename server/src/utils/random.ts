import randomize from 'randomatic';

export const generateCode = (): string => {
  return randomize('0', 8);
};
