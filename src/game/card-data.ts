import { getRandomCard } from "./game-cards";
import { qsa, gid } from "../utils/dom";
import type { ObjCard } from "./game-cards";

export const renderCard = (card: ObjCard) => {
  const { id, number, suit } = card;
  const $card = gid(id) as HTMLDivElement;

  qsa(".card__info", $card).forEach((info) => {
    info.dataset.number = number;
    info.dataset.suit = suit;
  });
  $card.dataset.suit = suit;
};

/**
 * Set the info of each card
 * @param cardId Card's Id
 */
export const setCardData = (cardId: string): ObjCard => {
  const { number, suit } = getRandomCard();
  const cardObj = { id: cardId, number, suit };

  return cardObj;
};
