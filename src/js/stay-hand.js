const playerHands = [];

const playAgain = () => location.reload();

const showPlayerHands = () => {
  const $cardsDesc = document.querySelectorAll('.points-details__hand-cards');
  const $pointsDetails = document.querySelectorAll('.points-details__hand');

  //Displaying description container of each hand
  $cardsDesc.forEach(($handCards) => $handCards.classList.remove('hidden'));

  // Setting new styles for description of each hand
  $pointsDetails.forEach(($detail) => {
    $detail.classList.add('points-details__hand--game-over');
  });

  // Show player hands
  playerHands.forEach(({ cards, id }) => {
    const handCards = `(${cards.join(' ')})`;
    document.getElementById(`${id}-cards`).textContent = handCards;
  });
};

/** Stay with the current hand */
function stayHand() {
  GAME_BUTTONS.change.classList.add('hidden');
  GAME_BUTTONS.stay.classList.add('hidden');

  GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);
  GAME_BUTTONS.stay.removeEventListener('click', stayHand);

  // Listener for cards
  document.removeEventListener('click', toggleSelectedCard);

  // Data for the current hand
  const currentHandsCounter = getPlayerHands();
  const currentHand = verificateHand(generatedObjCards, currentHandsCounter);

  // Displaying the points of the current hand
  document.getElementById(
    `hand${currentHandsCounter}-points`
  ).textContent = `${currentHand.points}`;

  // Adding the current hand to array playerHands
  playerHands.push(currentHand);

  // Updating the counter of hands
  setPlayerHands((current) => current + 1);

  //Validation if it's the last hand
  if (playerHands.length === 5) {
    GAME_BUTTONS.nextHand.classList.add('hidden');
    GAME_BUTTONS.playAgain.classList.remove('hidden');

    GAME_BUTTONS.playAgain.addEventListener('click', playAgain);
    GAME_BUTTONS.nextHand.removeEventListener('click', startGame);

    // Removing class for current hand
    clearCurrentHandClass();
    setPlayerHands(() => null);

    // Setting total points
    const playerPoints = playerHands.reduce(
      (prev, { points }) => prev + points,
      0
    );

    // Displaying total points
    document.getElementById(
      'total-hands-points'
    ).textContent = `${playerPoints}`;

    // Updating styles for total points box
    const $totalPointsBox = document.getElementById('total-points');
    $totalPointsBox.classList.remove('hidden');

    /** @type {HTMLDialogElement} */
    const $gameResult = document.getElementById('game-result');
    $gameResult.show();

    // Show player hands beside points of each hand
    showPlayerHands();

    // Validation for win the game
    const playerWin = playerPoints >= 60;

    if (playerWin) {
      $gameResult.classList.add('dialog-game-result--win');
      $totalPointsBox.classList.add('points-details__total--win');
    } else {
      $gameResult.classList.add('dialog-game-result--lose');
      $totalPointsBox.classList.add('points-details__total--lose');
    }

    $gameResult.textContent = playerWin ? 'You win!' : 'You lose!';

    // Hidding the remaining cards container
    document
      .getElementById('remaining-cards-container')
      .classList.add('hidden');
  } else {
    // If it isn't the last hand
    GAME_BUTTONS.nextHand.classList.remove('hidden');

    GAME_BUTTONS.nextHand.addEventListener('click', startGame);
    GAME_BUTTONS.playAgain.removeEventListener('click', playAgain);
  }

  document.getElementById('remaining-cards').textContent = '-';
  cleanArray(generatedObjCards);
}
