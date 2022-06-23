import { getPairs } from './pair.js';
import { getThreeOfKind } from './three-of-kind.js';

/**
 * Check if hand is an specific FULL HOUSE
 * @param {Array<ObjCard>} cards
 * @param {Array<ObjCard>} cardsToCheck - Cards for check full house
 */
export const isFullHouse = (
  cards,
  [{ number: number1 }, { number: number2 }]
) => {
  const number1Matches = cards.filter(({ number }) => number === number1);
  const number2Matches = cards.filter(({ number }) => number === number2);

  return (
    ((number1Matches.length === 3 && number2Matches.length === 2) ||
      (number1Matches.length === 2 && number2Matches.length === 3)) &&
    number1 !== number2
  );
};

/**
 * Check if hand is any possible FULL HOUSE
 * @param {Array<ObjCard>} cards
 */
export const isAnyFullHouse = (cards) => {
  const pairs = getPairs(cards);
  const threeOfKind = getThreeOfKind(cards);

  return pairs.size === 1 && threeOfKind.size === 1;
};

/**
 * Full House data
 * @typedef {Object} FullHouseData
 * @property {string} pair
 * @property {string} threeOfKind
 */

/**
 * Retrieves the numbers that compose the FULL HOUSE in the hand
 * @param {Array<ObjCard>} cards
 *
 * @return {FullHouseData}
 */
export const findFullHouse = (cards) => {
  const [pair] = Array.from(getPairs(cards));
  const [threeOfKind] = Array.from(getThreeOfKind(cards));

  return { pair, threeOfKind };
};
