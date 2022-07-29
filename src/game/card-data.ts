import { getRandomCard, setObjCards } from './game-cards';
import { qsa, gid } from '../utils/dom';

/**
 * Set the info of each card
 * @param cardId     Card's Id
 * @param isToChange Especify if the card must be changed
 */
export const setCardData = (cardId: string, isToChange: boolean) => {
  const { number, suit } = getRandomCard();
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardObj = { id: cardId, number, suit };
  const $card = gid(cardId) as HTMLDivElement;

  if (isToChange)
    setObjCards((cards) => {
      cards[cardIndex] = cardObj;

      return cards;
    });
  else setObjCards((cards) => [...cards, cardObj]);

  // Displaying card info
  qsa('.card__info', $card).forEach((info) => {
    info.dataset.number = number;
    info.dataset.suit = suit;
  });
  $card.dataset.suit = suit;
};
