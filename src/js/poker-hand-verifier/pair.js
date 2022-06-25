import {
  allDifferentNumbers,
  allSameSuit,
  numberMatches,
} from './global-checks.js';

/**
 * Check if hand is an specific PAIR
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check pair
 */
const isPair = (cards, { number }) => {
  const { matches, notMatches: restNumbers } = numberMatches(cards, number);

  return (
    matches.length === 2 &&
    allDifferentNumbers(restNumbers) &&
    !allSameSuit(matches)
  );
};

/**
 * Check if hand is any possible PAIR
 * @param {Array<ObjCard>} cards
 */
export const isAnyPair = (cards) => cards.some((card) => isPair(cards, card));

/**
 * Searchs for any possible PAIR and returns its card number
 * @param {Array<ObjCard>} cards
 */
export const findPair = (cards) => cards.find((card) => isPair(cards, card));

/**
 * Retrieves all pairs in the hand
 * @param {Array<ObjCard>} cards
 *
 * @return {Set<string>} Unique numbers that have a pair
 */
export const getPairs = (cards) => {
  const aux = cards
    .filter(({ number }) => {
      const { matches } = numberMatches(cards, number);

      return matches.length === 2 && !allSameSuit(matches);
    })
    .map(({ number }) => number);

  return new Set(aux);
};
