/**
 * Parsed Card
 * @typedef  {Object} ParsedCard
 * @property {string} number
 * @property {string} suit
 * @property {string} card
 */

/**
 * Parse data of string card
 * @param {string} card
 *
 * @return {ParsedCard} Parsed card info
 */
export const parseCard = (card) => {
  const number = card.startsWith('10') ? card.slice(0, 2) : card.charAt(0);
  const suit = card.startsWith('10') ? card.charAt(2) : card.charAt(1);

  return { number, suit, card };
};

/**
 * Toggles class "card--selected"
 * @param  {Event}       options
 * @param  {EventTarget} options.target
 */
export const toggleSelectedCard = ({ target }) => {
  if (target.matches('.card > *'))
    return target.parentNode.classList.toggle('card--selected');

  if (target.matches('.card')) return target.classList.toggle('card--selected');
};
