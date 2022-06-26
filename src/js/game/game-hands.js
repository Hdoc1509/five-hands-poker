import { qs } from '../utils/dom.js';

/** @type {number} Counter of hands player */
let playerHandsCounter = null;

/**
 * Sets new value for counter of player hands
 * @param  {Function} callback Callback for update counter of player hands
 *
 * @example
 * // Increments the value in 1
 * setRemainingCards((value) => value + 1);
 * @example
 * // Decrements the value in value of myNum
 * const myNum = 2;
 * setRemainingCards((value) => value - myNum);
 * @example
 * // Sets the value to 3
 * setRemainingCards(() => 3);
 */
export const setPlayerHandsCounter = (callback) => {
  playerHandsCounter = callback(playerHandsCounter);
};

/** Gets the current value of counter of player hands */
export const getPlayerHandsCounter = () => playerHandsCounter;

/** Remove class "section__current-hand" */
export const clearCurrentHandClass = () => {
  const $currentHand = qs('.points-details__hand--current');

  $currentHand?.classList.remove('points-details__hand--current');
};
