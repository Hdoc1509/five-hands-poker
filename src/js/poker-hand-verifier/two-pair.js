import { getPairs } from './pair.js';

/**
 * Check if hand is any possible TWO PAIR
 * @param {Array<ObjCard>} cards
 */
export const isAnyTwoPair = (cards) => {
  const pairs = getPairs(cards);

  return pairs.size === 2;
};

/**
 * Searchs for any possible TWO PAIR and returns its card numbers
 * @param {Array<ObjCard>} cards
 *
 * @return {Array<string>} Numbers that have a pair
 */
export const findTwoPair = (cards) => Array.from(getPairs(cards));

/**
 * Check if hand is an specific TWO PAIR
 * @param {Array<ObjCard>} cards
 * @param {Array<ObjCard>} cardsToCheck - Cards to check its pairs
 */
export const isTwoPair = (
  cards,
  [{ number: number1 }, { number: number2 }]
) => {
  const number1Matches = cards.filter(({ number }) => number === number1);
  const number2Matches = cards.filter(({ number }) => number === number2);

  return (
    number1Matches.length === 2 &&
    number2Matches.length === 2 &&
    number1 !== number2
  );
};
