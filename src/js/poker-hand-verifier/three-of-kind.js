import {
  numberMatches,
  allDifferentNumbers,
  allSameSuit,
} from './global-checks.js';

/**
 * Check if hand is an specific THREE OF A KIND
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check
 */
export const isThreeOfKind = (cards, { number }) => {
  const { matches, notMatches: restNumbers } = numberMatches(cards, number);

  return matches.length === 3 && allDifferentNumbers(restNumbers);
};

/**
 * Check if hand is any possible THREE OF KIND
 * @param {Array<ObjCard>} cards
 */
export const isAnyThreeOfKind = (cards) =>
  cards.some((card) => isThreeOfKind(cards, card));

/**
 * Searchs for any possible THREE OF KIND and returns its card
 * @param {Array<ObjCard>} cards
 */
export const findThreeOfKind = (cards) =>
  cards.find((card) => isThreeOfKind(cards, card));

/**
 * Retrieves the number that compose the THREE OF A KIND in the hand
 * @param {Array<ObjCard>} cards
 */
export const getThreeOfKind = (cards) => {
  const aux = cards
    .filter(({ number }) => {
      const { matches } = numberMatches(cards, number);

      return matches.length === 3 && !allSameSuit(matches);
    })
    .map(({ number }) => number);

  return new Set(aux);
};
