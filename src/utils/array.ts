/** Cleans an array */
export const cleanArray = (array: Array<unknown>) =>
  array.splice(0, array.length);

/** Returns a random element from an array */
export const getRandomElement = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];
