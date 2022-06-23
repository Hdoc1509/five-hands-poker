/**
 * Check if all cards has different numbers
 * @param  {Array<ObjCard>} cards
 */
export const allDifferentNumbers = (cards) => {
  const numbers = new Set(cards.map(({ number }) => number));

  return numbers.size === cards.length;
};

/**
 * Check if all cards has the same figure
 * @param  {Array<ObjCard>} cards
 */
export const allSameFigure = (cards) => {
  const [{ figure: figureToCheck }] = cards;

  return cards.every(({ figure }) => figure === figureToCheck);
};

/**
 * Number matches
 * @typedef  {Object}         NumberMatches
 * @property {Array<ObjCard>} matches
 * @property {Array<ObjCard>} notMatches
 */

/**
 * Returns matches and not maches of a given card number
 * @param {Array<ObjCard>} cards
 * @param {number}         numberToCheck
 *
 * @returns {NumberMatches} Matches and not matches
 */
export const numberMatches = (cards, numberToCheck) => ({
  matches: cards.filter(({ number }) => number === numberToCheck),
  notMatches: cards.filter(({ number }) => number !== numberToCheck),
});
