import { GAME_BUTTONS } from './game-buttons.js';
import { setRemainingCardsCounter } from './remaining-cards.js';
import { setCardNumAndFig } from './card-data.js';
import { toggleSelectedCard } from './card-utils.js';
import { changeSelectedCards } from './change-cards.js';
import { stayHand } from './stay-hand.js';
import { clearCurrentHandClass, getPlayerHandsCounter } from './game-hands.js';
import { gid, qsa } from './utils/dom.js';

export const startGame = () => {
  GAME_BUTTONS.start.classList.add('hidden');
  GAME_BUTTONS.nextHand.classList.add('hidden');
  GAME_BUTTONS.change.classList.remove('hidden');
  GAME_BUTTONS.stay.classList.remove('hidden');

  // Setting and displaying counter of remaining cards
  setRemainingCardsCounter(3);

  // Generating the first 5 cards of the hand
  for (let i = 0; i < 5; i++) {
    const { id, cardInfo } = setCardNumAndFig(`card${i + 1}`, false);

    // Displaying info in the corners of each card
    qsa('.card__info', gid(id)).forEach((info) => (info.innerText = cardInfo));
  }

  // Listener for cards
  document.addEventListener('click', toggleSelectedCard);

  // Listener for the Change Button
  GAME_BUTTONS.change.addEventListener('click', changeSelectedCards);

  // Listener for the Stay Button
  GAME_BUTTONS.stay.addEventListener('click', stayHand);

  clearCurrentHandClass();

  // validation for current hand
  const currentHandsCounter = getPlayerHandsCounter();

  if (currentHandsCounter <= 5)
    qsa('.points-details__hand')[currentHandsCounter - 1].classList.add(
      'points-details__hand--current'
    );

  // Removing listeners of the start button and the next hand button
  GAME_BUTTONS.start.removeEventListener('click', startGame);
  GAME_BUTTONS.nextHand.removeEventListener('click', startGame);
};

GAME_BUTTONS.start.addEventListener('click', startGame);
