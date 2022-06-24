import { generateCards } from './utils/cards-generator.js';
import { parseCard } from './card-utils.js';
import { cleanArray } from './utils/array.js';

/** @type {Array<String>} */
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

export const getObjCards = () => generatedObjCards;

export const cleanObjCards = () => cleanArray(generatedObjCards);

export const getRandomCard = () => {
  const card = gameCards[Math.floor(Math.random() * gameCards.length)];
  const cardPosition = gameCards.indexOf(card);

  // Removing card
  gameCards.splice(cardPosition, 1);
  return parseCard(card);
};
