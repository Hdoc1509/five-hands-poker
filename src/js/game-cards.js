import { generateCards } from './utils/cards-generator.js';
import { parseCard } from './card-utils.js';
import { cleanArray } from './utils/array.js';

/** Cards for use in game */
const gameCards = generateCards();

/**
 * Card Object
 * @typedef  {Object} ObjCard
 * @property {String} id
 * @property {String} number
 * @property {String} figure
 */

/**
 * Array of cards for each hand
 * @type {Array<ObjCard>}
 */
export const generatedObjCards = [];

/**
 * Callbak for update object cards
 * @callback ObjCardCallback
 * @param {Array<ObjCard>} cards Current array of object cards
 * @returns {Array<ObjCard>} New array of object cards
 */

/**
 * Sets new value for object cards of each hand
 * @param  {Array<ObjCard>|ObjCardCallback} data Callback or value for update object cards
 *
 * @example
 * // Edit hand at index 2
 * setObjCards((cards) => {
 *   cards[2] = { number: '5', figure: '♦'};
 *
 *  return cards;
 * });
 * @example
 * // Add a new card
 * const card = { number: '9', figure: '♣'};
 * setObjCards((cards) => [...cards, card]);
 * @example
 * // Clean cards
 * setObjCards([]);
 */
export const setObjCards = (data) => {
  let aux = null;

  if (typeof data === 'function') {
    aux = data(generatedObjCards.map((card) => card));

    if (!Array.isArray(aux))
      throw new TypeError('Returnred value must be an array');
  } else {
    aux = data;

    if (!Array.isArray(aux))
      throw new TypeError('Expected an array as argument');
  }

  cleanArray(generatedObjCards);
  generatedObjCards.push(...aux);
};

export const getObjCards = () => generatedObjCards;

export const cleanObjCards = () => cleanArray(generatedObjCards);

export const getRandomCard = () => {
  const card = gameCards[Math.floor(Math.random() * gameCards.length)];
  const cardPosition = gameCards.indexOf(card);

  // Removing card
  gameCards.splice(cardPosition, 1);

  return parseCard(card);
};
