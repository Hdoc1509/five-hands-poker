import { getRandomCard, setObjCards } from './game-cards.js';
import { qsa, gid, qs } from './utils/dom.js';

/** Card containers */
const $tableCards = qsa('.card');

/** Central figure of each card */
const $cardsCentralSuit = qsa('.card__figure');

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
 */
export const setCardNumAndFig = (cardId, isToChange) => {
  const { number, figure } = getRandomCard();
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardInfo = `${number}\n${figure}`;
  const cardObj = { id: cardId, number, figure };

  if (isToChange)
    setObjCards((cards) => {
      cards[cardIndex] = cardObj;

      return cards;
    });
  else setObjCards((cards) => [...cards, cardObj]);

  $tableCards[cardIndex].style.color = figure.match(/^♥|♦$/) ? '#f00' : '#000';

  // Displaying card info
  qsa('.card__info', gid(cardId)).forEach(
    (info) => (info.innerText = cardInfo)
  );
  qs('.card__figure', gid(cardId)).textContent = figure;
};
