import { generateCards } from '../utils/cards-generator';
import { parseCard } from './card-utils';
import { cleanArray } from '../utils/array';

/** Cards for use in game */
const gameCards = generateCards();

type ObjCard = {
  id: string;
  number: string;
  suit: string;
};

/** Array of cards for each hand */
const generatedObjCards: Array<ObjCard> = [];

/** Callbak for update object cards */
type ObjCardsCallback = (currentCards: Array<ObjCard>) => Array<ObjCard>;

/**
 * Sets new value for object cards of each hand
 * @param data Callback or value for update object cards
 *
 * @example
 * // Edit hand at index 2
 * setObjCards((cards) => {
 *   cards[2] = { number: '5', suit: '♦'};
 *
 *  return cards;
 * });
 * @example
 * // Add a new card
 * const card = { number: '9', suit: '♣'};
 * setObjCards((cards) => [...cards, card]);
 * @example
 * // Clean cards
 * setObjCards([]);
 */
export const setObjCards = (data: Array<ObjCard> | ObjCardsCallback) => {
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

export const getObjCards = () => generatedObjCards.map((el) => el);

export const getRandomCard = () => {
  const card = gameCards[Math.floor(Math.random() * gameCards.length)];
  const cardPosition = gameCards.indexOf(card);

  // Removing card
  gameCards.splice(cardPosition, 1);

  return parseCard(card);
};
