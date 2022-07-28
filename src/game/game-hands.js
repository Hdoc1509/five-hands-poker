import { qs } from '../utils/dom.js';

/** @type {number} Counter of hands player */
let playerHandsCounter = null;

/**
 * Sets new value for counter of player hands
 * @param  {number|Function} data Callback or value for update counter of player hands
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
 * setRemainingCards(3);
 */
export const setPlayerHandsCounter = (data) => {
  let auxiliar = null;

  if (typeof data === 'function') {
    auxiliar = data(playerHandsCounter);

    if (typeof auxiliar !== 'number')
      throw new TypeError('Returned value must be a number');
  } else {
    auxiliar = data;

    if (typeof auxiliar !== 'number' && auxiliar !== null)
      throw new TypeError('Expected a number or null as argument');
  }

  playerHandsCounter = auxiliar;
};

/** Gets the current value of counter of player hands */
export const getPlayerHandsCounter = () => playerHandsCounter;

/** Remove class "section__current-hand" */
export const clearCurrentHandClass = () => {
  const currentHandClass = 'points-details__hand--current';
  const $currentHand = qs(`.${currentHandClass}`);

  $currentHand?.classList.remove(currentHandClass);
};
