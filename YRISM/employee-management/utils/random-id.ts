import { v4 as uuid } from 'uuid';

export const getRandomId = () => {
  const id = uuid();
  const hexString = id.replace(/-/g, '');

  return parseInt(hexString.slice(0, 13), 16);
};
