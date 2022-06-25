import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from './remaining-cards.js';
import { setCardNumAndFig } from './card-data.js';
import { GAME_BUTTONS } from './game-buttons.js';
import { changeCardsQuantityError, noCardSelectedError } from './errors.js';
import { toggleSelectedCard } from './card-utils.js';
import { qsa } from './utils/dom.js';

export const changeSelectedCards = () => {
  const $selectedCards = qsa('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const selectedCard = $selectedCards[i];
      const { cardInfo } = setCardNumAndFig(selectedCard.id, true);

      qsa('.card__info', selectedCard).forEach(
        (info) => (info.innerText = cardInfo)
      );
    }

    setRemainingCardsCounter((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove('card--selected'));

  if (getRemainingCardsCounter() === 0) {
    GAME_BUTTONS.change.classList.add('hidden');
    GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
};
