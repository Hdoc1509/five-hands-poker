import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from './remaining-cards';
import { setCardData } from './card-data';
import { GAME_BUTTONS } from './game-buttons';
import { changeCardsQuantityError, noCardSelectedError } from './errors';
import { toggleSelectedCard } from './card-utils';
import { qsa } from '../utils/dom';

export const changeSelectedCards = () => {
  const $selectedCards = qsa('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) setCardData($selectedCards[i].id, true);

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
