import { parseCard } from './card-utils.js';
import { cleanArray } from './utils/array.js';

/** @type {Array<String>} */
const gameCards = [];

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

const figures = ['♥', '♦', '♣', '♠'];
const numbers = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

export const getObjCards = () => generatedObjCards;

export const cleanObjCards = () => cleanArray(generatedObjCards);

export const getRandomCard = () => {
  const card = gameCards[Math.floor(Math.random() * gameCards.length)];
  const cardPosition = gameCards.indexOf(card);

  // Removing card
  gameCards.splice(cardPosition, 1);
  return parseCard(card);
};

// Generating all game cards
((gameCards) => {
  const getRandomNumber = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  const getRandomFigure = () =>
    figures[Math.floor(Math.random() * figures.length)];

  const generateRandomCard = () => {
    let card = `${getRandomNumber()}${getRandomFigure()}`;

    /** Validation for get unique cards */
    while (gameCards.includes(card))
      card = `${getRandomNumber()}${getRandomFigure()}`;

    return card;
  };

  // Generating all cards
  for (let i = 0; i < 52; i++) gameCards.push(generateRandomCard());
})(gameCards);
