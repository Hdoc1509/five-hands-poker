import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from './remaining-cards.js';
import { setCardNumAndFig } from './card-data.js';
import { GAME_BUTTONS } from './game-buttons.js';
import { changeCardsQuantityError, noCardSelectedError } from './errors.js';
import { toggleSelectedCard } from './card-utils.js';
import { qsa, gid, qs } from './utils/dom.js';

export const changeSelectedCards = () => {
  const $selectedCards = qsa('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const selectedCard = $selectedCards[i];
      const { id, cardInfo } = setCardNumAndFig(selectedCard.id, true);

      qs('.card__info--top', selectedCard).innerText = cardInfo;
      if (id === 'card5')
        qs('.card__info--bottom', selectedCard).innerText = cardInfo;
    }

    setRemainingCardsCounter((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove('card--selected'));

  // Updating the counter of remaining cards
  const currentRemainingCards = getRemainingCardsCounter();

  gid('remaining-cards').textContent = `${currentRemainingCards}`;

  if (currentRemainingCards === 0) {
    GAME_BUTTONS.change.classList.add('hidden');
    GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
};
