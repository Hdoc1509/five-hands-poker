import { GAME_BUTTONS } from './game-buttons';
import { setRemainingCardsCounter } from './remaining-cards';
import { setCardData } from './card-data';
import { toggleSelectedCard } from './card-utils';
import { changeSelectedCards } from './change-cards';
import { stayHand } from './stay-hand';
import { clearCurrentHandClass, getPlayerHandsCounter } from './game-hands';
import { qsa } from '../utils/dom';

export const startGame = () => {
  GAME_BUTTONS.start.classList.add('hidden');
  GAME_BUTTONS.nextHand.classList.add('hidden');
  GAME_BUTTONS.change.classList.remove('hidden');
  GAME_BUTTONS.stay.classList.remove('hidden');

  // Setting and displaying counter of remaining cards
  setRemainingCardsCounter(3);

  // Generating the first 5 cards of the hand
  for (let i = 0; i < 5; i++) setCardData(`card${i + 1}`, false);

  // Listener for cards
  document.addEventListener('click', toggleSelectedCard);

  // Adding Listener for the game buttons
  GAME_BUTTONS.change.addEventListener('click', changeSelectedCards);
  GAME_BUTTONS.stay.addEventListener('click', stayHand, { once: true });

  clearCurrentHandClass();

  // validation for current hand
  const currentHandsCounter = getPlayerHandsCounter();

  if (currentHandsCounter <= 5)
    qsa('.points-details__hand')[currentHandsCounter - 1].classList.add(
      'points-details__hand--current'
    );
};
