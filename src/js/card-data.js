import { getRandomCard, setObjCards } from './game-cards.js';
import { qsa, gid, qs } from './utils/dom.js';

/** Card containers */
const $tableCards = qsa('.card');

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
  const $card = gid(cardId);

  if (isToChange)
    setObjCards((cards) => {
      cards[cardIndex] = cardObj;

      return cards;
    });
  else setObjCards((cards) => [...cards, cardObj]);

  $tableCards[cardIndex].style.color = figure.match(/^♥|♦$/) ? '#f00' : '#000';

  // Displaying card info
  qsa('.card__info', $card).forEach((info) => (info.innerText = cardInfo));
  qs('.card__figure', $card).textContent = figure;
};
