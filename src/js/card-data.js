import { parseCard } from './card-utils.js';
import { getRandomCard, generatedObjCards, removeCard } from './game-cards.js';

/** Card containers */
const $tableCards = document.querySelectorAll('.card');

/** Central figure of each card */
const $cardsCentralSuit = document.querySelectorAll('.card__figure');

/**
 * Card Object
 * @typedef  {Object} ObjCard
 * @property {String} id
 * @property {String} number
 * @property {String} figure
 * @property {string} cardInfo
 */

/**
 * Set the info of each card
 * @param {String}  cardId     - Card's Id
 * @param {Boolean} isToChange - Especify if the card must be changed
 *
 * @returns {ObjCard} Returns the card as an object
 */
export const setCardNumAndFig = (cardId, isToChange) => {
  const { number, figure, card } = parseCard(getRandomCard());
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardObj = {
    id: cardId,
    number,
    figure,
    cardInfo: `${number}\n${figure}`,
  };

  isToChange
    ? (generatedObjCards[cardIndex] = cardObj)
    : generatedObjCards.push(cardObj);

  $tableCards[cardIndex].style.color = figure.match(/^♥|♦$/) ? '#f00' : '#000';

  $cardsCentralSuit[cardIndex].textContent = figure;
  removeCard(card);

  return cardObj;
};
