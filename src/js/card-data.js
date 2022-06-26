import { getRandomCard, setObjCards } from './game-cards.js';
import { qsa, gid, qs } from './utils/dom.js';

/**
 * Set the info of each card
 * @param {String}  cardId     - Card's Id
 * @param {Boolean} isToChange - Especify if the card must be changed
 */
export const setCardData = (cardId, isToChange) => {
  const { number, suit } = getRandomCard();
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardInfo = `${number}\n${suit}`;
  const cardObj = { id: cardId, number, suit };
  const $card = gid(cardId);

  if (isToChange)
    setObjCards((cards) => {
      cards[cardIndex] = cardObj;

      return cards;
    });
  else setObjCards((cards) => [...cards, cardObj]);

  // Displaying card info
  qsa('.card__info', $card).forEach((info) => (info.innerText = cardInfo));
  qs('.card__suit', $card).textContent = suit;
  $card.dataset.suitColor = suit.match(/^♥|♦$/) ? 'red' : 'black';
};
