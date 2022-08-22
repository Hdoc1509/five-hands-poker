import { GAME_BUTTONS } from './game-buttons';
import { changeSelectedCards } from './change-cards';
import { toggleSelectedCard } from './card-utils';
import { getPlayerHandsCounter, setPlayerHandsCounter, clearCurrentHandClass } from './game-hands';
import { verificateHand } from 'poker-hand-verifier';
import { getObjCards, setObjCards } from './game-cards';
import { startGame } from './start-game';
import { qsa, gid, qs } from '../utils/dom';
import { setRemainingCardsCounter } from './remaining-cards';
import { HAND_POINTS } from './hand-points';
import { hideElements, showElements } from '../utils/gui';

type PlayerHandData = {
  cards: Array<string>;
  id: string;
  points: number;
  description: string;
}

const playerHands: Array<PlayerHandData> = [];

const playAgain = () => location.reload();

const showPlayerHands = () => {
  // Displaying description container of each hand
  showElements(...qsa('.points-details__hand-cards'));

  // Setting new styles for description of each hand
  qsa('.points-details__hand').forEach(($detail) =>
    $detail.classList.add('points-details__hand--game-over')
  );

  // Setting player hands text
  playerHands.forEach(({ cards, id }) => {
    const handCards = `(${cards
      .join(' ')
      .replace(/H/g, '♥')
      .replace(/D/g, '♦')
      .replace(/C/g, '♣')
      .replace(/S/g, '♠')})`;

    gid(`${id}-cards`)!.textContent = handCards;
  });
};

export const stayHand = () => {
  hideElements(GAME_BUTTONS.CHANGE, GAME_BUTTONS.STAY);

  GAME_BUTTONS.CHANGE.removeEventListener('click', changeSelectedCards);

  // Listener for cards
  document.removeEventListener('click', toggleSelectedCard);

  // Data for the current hand
  const handsCounter = getPlayerHandsCounter();
  const currentHand = verificateHand(getObjCards());
  const currentHandData: PlayerHandData = {
    ...currentHand,
    id: `hand${handsCounter}`,
    points: HAND_POINTS[currentHand.type],
  };

  // Displaying the points of the current hand
  gid(`hand${handsCounter}-points`)!.textContent = `${currentHandData.points}`;

  // Adding the current hand to array playerHands
  playerHands.push(currentHandData);

  // Updating the counter of hands
  setPlayerHandsCounter((current) => current + 1);

  //Validation if it's the last hand
  if (playerHands.length === 5) {
    hideElements(GAME_BUTTONS.NEXT_HAND);
    showElements(GAME_BUTTONS.PLAY_AGAIN);

    GAME_BUTTONS.PLAY_AGAIN.addEventListener('click', playAgain, { once: true });

    // Removing class for current hand
    clearCurrentHandClass();
    setPlayerHandsCounter(0);

    // Setting total points
    const playerPoints = playerHands.reduce(
      (prev, { points }) => prev + points,
      0
    );

    // Displaying total points
    gid('total-hands-points')!.textContent = `${playerPoints}`;

    // Updating styles for total points box
    const $totalPointsBox = gid('total-points') as HTMLParagraphElement;
    showElements($totalPointsBox);

    const $gameResult = gid('game-result') as HTMLDialogElement;
    $gameResult.show();

    // Show player hands beside points of each hand
    showPlayerHands();

    // Validation for win the game
    const resultText = playerPoints >= 60 ? 'win' : 'lose';

    $gameResult.classList.add(`dialog-game-result--${resultText}`);
    $gameResult.textContent = `You ${resultText}!`;
    $totalPointsBox.classList.add(`points-details__total--${resultText}`);

    // Hidding the remaining cards container
    hideElements(qs('.remaining-cards') as HTMLDivElement);
  } else {
    // If it isn't the last hand
    showElements(GAME_BUTTONS.NEXT_HAND);
    GAME_BUTTONS.NEXT_HAND.addEventListener('click', startGame, { once: true });
  }

  setRemainingCardsCounter(0); // Cleaning counter
  setObjCards([]); // Cleaning cards
};
