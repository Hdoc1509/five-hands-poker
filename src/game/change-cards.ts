import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from './remaining-cards';
import { setCardData } from './card-data';
import { GAME_BUTTONS } from './game-buttons';
import { changeCardsQuantityError, noCardSelectedError } from './errors';
import { toggleSelectedCard } from './card-utils';
import { qsa } from '../utils/dom';
import { setObjCards } from './game-cards';

export const changeSelectedCards = () => {
  const $selectedCards = qsa('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const cardId = $selectedCards[i].id;
      const cardIndex = Number(cardId.charAt(4)) -1;

      setObjCards((cards) => {
        cards[cardIndex] = setCardData(cardId);

        return cards;
      });
    }

    setRemainingCardsCounter((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove('card--selected'));

  if (getRemainingCardsCounter() === 0) {
    GAME_BUTTONS.CHANGE.classList.add('hidden');
    GAME_BUTTONS.CHANGE.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
};
