import { gid } from '../utils/dom';

/** Counter of remaining cards */
let remainingCardsCounter = 0;

type RemainingCardsCounterCallback = (current: number) => number;

/**
 * Sets and display new value for counter of remaining cards
 * @param data Callback or value for update counter of remaining cards
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
 * setRemainingCardsCounter(3);
 */
export const setRemainingCardsCounter = (
  data: number | RemainingCardsCounterCallback
) => {
  let aux = null;

  if (typeof data === 'function') {
    aux = data(remainingCardsCounter);

    if (typeof aux !== 'number')
      throw new TypeError('Returned value must be a number');
  } else {
    aux = data;

    if (typeof aux !== 'number' && aux !== null)
      throw new TypeError('Expected a number or null as argument');
  }

  remainingCardsCounter = aux;
  gid('remaining-cards')!.textContent = remainingCardsCounter === 0 ? '-' : `${remainingCardsCounter}`;
};

/** Gets the current value of counter of remaining cards */
export const getRemainingCardsCounter = () => remainingCardsCounter;
