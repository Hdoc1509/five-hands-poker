/** @type {number} Counter of remaining cards */
let remainingCardsCounter = null;

/**
 * Sets new value for counter of remaining cards
 * @param  {Function} callback Callback for update counter of remaining cards
 *
 * @example
 * // Increments the value in 1
 * setRemainingCardsCounter((value) => value + 1);
 * @example
 * // Decrements the value in value of myNum
 * const myNum = 2;
 * setRemainingCardsCounter((value) => value - myNum);
 * @example
 * // Sets the value to 3
 * setRemainingCardsCounter((value) => 3);
 */
export const setRemainingCardsCounter = (callback) => {
  remainingCardsCounter = callback(remainingCardsCounter);
};

/** Gets the current value of counter of remaining cards */
export const getRemainingCardsCounter = () => remainingCardsCounter;
