const stayButton = document.getElementById('stay-button');
const nextHandButton = document.getElementById('next-hand-button');
const playAgainButton = document.getElementById('play-again-button');
const playerHands = [];

let handsPlayerCounter = 1;

const playAgain = () => location.reload();

function showPlayerHands() {
  const cardsDesc = document.querySelectorAll('.points-details__hand-cards');
  const pointsDetails = document.querySelectorAll('.points-details__hand');

  //Displaying description container of each hand
  cardsDesc.forEach((handCards) => handCards.classList.remove('hidden'));

  // Setting new styles for description of each hand
  pointsDetails.forEach((detail) => {
    detail.classList.add('points-details__hand--game-over');
  });

  // Show player hands
  playerHands.forEach(({ cards, id }) => {
    const handCards = `(${cards.join(' ')})`;
    document.getElementById(`${id}-cards`).textContent = handCards;
  });
}

/** Stay with the current hand */
function stayHand() {
  changeButton.classList.add('hidden');
  stayButton.classList.add('hidden');

  changeButton.removeEventListener('click', changeSelectedCards);
  stayButton.removeEventListener('click', stayHand);

  cardsToChange.forEach((card) =>
    card.removeEventListener('click', toggleClassSelectedCard)
  );

  // Data for the current hand
  const currentHand = verificateHand(...generatedObjCards);
  currentHand.id = `hand${handsPlayerCounter}`;

  // Displaying the points of the current hand
  const handPointBox = document.getElementById(
    `hand${handsPlayerCounter}-points`
  );
  handPointBox.textContent = `${currentHand.points}`;

  // Adding the current hand to array playerHands
  playerHands.push(currentHand);

  // Updating the counter of hands
  handsPlayerCounter++;

  //Validation if it's the last hand
  if (playerHands.length === 5) {
    nextHandButton.classList.add('hidden');
    playAgainButton.classList.remove('hidden');

    playAgainButton.addEventListener('click', playAgain);
    nextHandButton.removeEventListener('click', startGame);

    // Removing class for current hand
    clearCurrentHandClass();

    // Setting total points
    let playerPoints = 0;
    playerHands.forEach(({ points }) => (playerPoints += points));

    // Displaying total points
    const totalPlayerPoints = document.getElementById('total-hands-points');
    totalPlayerPoints.textContent = `${playerPoints}`;

    // Updating styles for total points box
    const totalPointsBox = document.getElementById('total-points');
    totalPointsBox.classList.remove('hidden');

    /** @type {HTMLDialogElement} */
    const gameResult = document.getElementById('game-result');
    gameResult.show();

    // Show player hands beside points of each hand
    showPlayerHands();

    // Validation for win the game
    const playerWin = playerPoints >= 60;

    if (playerWin) {
      gameResult.classList.add('dialog-game-result--win');
      totalPointsBox.classList.add('points-details__total--win');
    } else {
      gameResult.classList.add('dialog-game-result--lose');
      totalPointsBox.classList.add('points-details__total--lose');
    }

    gameResult.textContent = playerWin ? 'You win!' : 'You lose!';

    // Hidding the remaining cards container
    document
      .getElementById('remaining-cards-container')
      .classList.add('hidden');
  } else {
    // If it isn't the last hand
    nextHandButton.classList.remove('hidden');

    nextHandButton.addEventListener('click', startGame);
    playAgainButton.removeEventListener('click', playAgain);

    cleanArray(generatedObjCards);
  }

  document.getElementById('remaining-cards').textContent = '-';
}
