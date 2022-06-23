import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from './remaining-cards.js';
import { setCardNumAndFig } from './card-data.js';
import { GAME_BUTTONS } from './game-buttons.js';
import { changeCardsQuantityError, noCardSelectedError } from './errors.js';
import { toggleSelectedCard } from './card-utils.js';

export const changeSelectedCards = () => {
  const $selectedCards = document.querySelectorAll('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const { id, cardInfo } = setCardNumAndFig($selectedCards[i].id, true);

      $selectedCards[i].querySelector('.card__info--top').innerText = cardInfo;
      if (id === 'card5')
        $selectedCards[i].querySelector('.card__info--bottom').innerText =
          cardInfo;
    }

    setRemainingCardsCounter((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove('card--selected'));

  // Updating the counter of remaining cards
  const currentRemainingCards = getRemainingCardsCounter();

  document.getElementById(
    'remaining-cards'
  ).textContent = `${currentRemainingCards}`;

  if (currentRemainingCards === 0) {
    GAME_BUTTONS.change.classList.add('hidden');
    GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
};
