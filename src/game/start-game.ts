import { GAME_BUTTONS } from './game-buttons';
import { setRemainingCardsCounter } from './remaining-cards';
import { setCardData } from './card-data';
import { toggleSelectedCard } from './card-utils';
import { changeSelectedCards } from './change-cards';
import { stayHand } from './stay-hand';
import { clearCurrentHandClass, getPlayerHandsCounter } from './game-hands';
import { qsa } from '../utils/dom';
import { setObjCards } from './game-cards';
import { hideElements, showElements } from '../utils/gui';

export const startGame = () => {
  hideElements(GAME_BUTTONS.START, GAME_BUTTONS.NEXT_HAND);
  showElements(GAME_BUTTONS.CHANGE, GAME_BUTTONS.STAY);

  // Setting and displaying counter of remaining cards
  setRemainingCardsCounter(3);

  // Generating the first 5 cards of the hand
  for (let i = 0; i < 5; i++)
    setObjCards((cards) => [...cards, setCardData(`card${i + 1}`)]);

  // Listener for cards
  document.addEventListener('click', toggleSelectedCard);

  // Adding Listener for the game buttons
  GAME_BUTTONS.CHANGE.addEventListener('click', changeSelectedCards);
  GAME_BUTTONS.STAY.addEventListener('click', stayHand, { once: true });

  clearCurrentHandClass();

  // validation for current hand
  const currentHandsCounter = getPlayerHandsCounter();

  if (currentHandsCounter <= 5)
    qsa('.points-details__hand')[currentHandsCounter - 1].classList.add(
      'points-details__hand--current'
    );
};
