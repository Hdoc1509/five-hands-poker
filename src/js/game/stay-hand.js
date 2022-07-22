import { GAME_BUTTONS } from './game-buttons.js';
import { changeSelectedCards } from './change-cards.js';
import { toggleSelectedCard } from './card-utils.js';
import { getPlayerHandsCounter, setPlayerHandsCounter } from './game-hands.js';
import { verificateHand } from 'poker-hand-verifier';
import { getObjCards, setObjCards } from './game-cards.js';
import { startGame } from './start-game.js';
import { clearCurrentHandClass } from './game-hands.js';
import { qsa, gid } from '../utils/dom.js';
import { setRemainingCardsCounter } from './remaining-cards.js';
import { HAND_POINTS } from './hand-points.js';

const playerHands = [];

const playAgain = () => location.reload();

const showPlayerHands = () => {
  const $cardsDesc = qsa('.points-details__hand-cards');
  const $pointsDetails = qsa('.points-details__hand');

  //Displaying description container of each hand
  $cardsDesc.forEach(($handCards) => $handCards.classList.remove('hidden'));

  // Setting new styles for description of each hand
  $pointsDetails.forEach(($detail) => {
    $detail.classList.add('points-details__hand--game-over');
  });

  // Show player hands
  playerHands.forEach(({ cards, id }) => {
    const handCards = `(${cards
      .join(' ')
      .replace(/H/g, '♥')
      .replace(/D/g, '♦')
      .replace(/C/g, '♣')
      .replace(/S/g, '♠')})`;
    gid(`${id}-cards`).textContent = handCards;
  });
};

export const stayHand = () => {
  GAME_BUTTONS.change.classList.add('hidden');
  GAME_BUTTONS.stay.classList.add('hidden');

  GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);

  // Listener for cards
  document.removeEventListener('click', toggleSelectedCard);

  // Data for the current hand
  const handsCounter = getPlayerHandsCounter();
  const currentHand = verificateHand(getObjCards());

  currentHand.id = `hand${handsCounter}`;
  currentHand.points = HAND_POINTS[currentHand.type];

  // Displaying the points of the current hand
  gid(`hand${handsCounter}-points`).textContent = `${currentHand.points}`;

  // Adding the current hand to array playerHands
  playerHands.push(currentHand);

  // Updating the counter of hands
  setPlayerHandsCounter((current) => current + 1);

  //Validation if it's the last hand
  if (playerHands.length === 5) {
    GAME_BUTTONS.nextHand.classList.add('hidden');
    GAME_BUTTONS.playAgain.classList.remove('hidden');

    GAME_BUTTONS.playAgain.addEventListener('click', playAgain, { once: true });

    // Removing class for current hand
    clearCurrentHandClass();
    setPlayerHandsCounter(() => null);

    // Setting total points
    const playerPoints = playerHands.reduce(
      (prev, { points }) => prev + points,
      0
    );

    // Displaying total points
    gid('total-hands-points').textContent = `${playerPoints}`;

    // Updating styles for total points box
    const $totalPointsBox = gid('total-points');
    $totalPointsBox.classList.remove('hidden');

    /** @type {HTMLDialogElement} */
    const $gameResult = gid('game-result');
    $gameResult.show();

    // Show player hands beside points of each hand
    showPlayerHands();

    // Validation for win the game
    const playerWin = playerPoints >= 60;

    $gameResult.classList.add(
      `dialog-game-result--${playerWin ? 'win' : 'lose'}`
    );
    $totalPointsBox.classList.add(
      `points-details__total--${playerWin ? 'win' : 'lose'}`
    );
    $gameResult.textContent = playerWin ? 'You win!' : 'You lose!';

    // Hidding the remaining cards container
    gid('remaining-cards-container').classList.add('hidden');
  } else {
    // If it isn't the last hand
    GAME_BUTTONS.nextHand.classList.remove('hidden');

    GAME_BUTTONS.nextHand.addEventListener('click', startGame, { once: true });
  }

  setRemainingCardsCounter(null); // Cleaning counter
  setObjCards([]); // Cleaning cards
};
