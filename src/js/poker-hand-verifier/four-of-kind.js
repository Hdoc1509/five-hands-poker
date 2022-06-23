import { numberMatches } from './global-checks.js';

/**
 * Check if hand is an specific FOUR OF A KIND
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check
 */
export const isFourOfKind = (cards, { number }) => {
  const { matches } = numberMatches(cards, number);

  return matches.length === 4;
};

/**
 * Check if hand is any possible FOUR OF A KIND
 * @param {Array<ObjCard>} cards
 */
export const isAnyFourOfKind = (cards) =>
  cards.some((card) => isFourOfKind(cards, card));

/**
 * Searchs for any possible FOUR OF A KIND and returns its card
 * @param {Array<ObjCard>} cards
 */
export const findFourOfKind = (cards) =>
  cards.find((card) => isFourOfKind(cards, card));
