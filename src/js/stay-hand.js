const stayButton = document.getElementById('stay-button');
const nextHandButton = document.getElementById('next-hand-button');
const playAgainButton = document.getElementById('play-again-button');
/** Text box for total player points */
const totalPlayerPoints = document.getElementById('total-hands-points');

let handsPlayerCounter = 1;

const playAgain = () => location.reload();

function showPlayerHands() {
  const cardsDesc = document.querySelectorAll('.points-details__hand-cards');
  const pointsDetails = document.querySelectorAll('.points-details__hand');

  //Displaying description container of each hand
  cardsDesc.forEach((handCards) => handCards.classList.remove('hidden'));

  // Setting new styles for description of each hand
  pointsDetails.forEach((detail) =>
    detail.classList.add('points-details__hand--game-over')
  );

  // Show player hands
  playerHands.forEach(({ cards, id }) => {
    const handId = id;
    const handCards = `(${cards.join(' ')})`;
    const handCardsId = document.getElementById(`${handId}-cards`);

    handCardsId.textContent = handCards;
  });
}

/** Stay with the current hand */
function stayHand() {
  changeButton.classList.add('hidden');
  stayButton.classList.add('hidden');

  changeButton.removeEventListener('click', changeSelectedCards);
  stayButton.removeEventListener('click', stayHand);

  for (let card of cardsToChange) {
    card.removeEventListener('click', toggleClassSelectedCard);
  }

  // Data for the current hand
  const currentHandData = verificateHand(
    generatedObjCards[0],
    generatedObjCards[1],
    generatedObjCards[2],
    generatedObjCards[3],
    generatedObjCards[4]
  );
  currentHandData.id = `hand${handsPlayerCounter}`;

  // Updating the points of the current hand
  let currentHandPointBox = document.getElementById(
    `hand${handsPlayerCounter}-points`
  );
  currentHandPointBox.innerHTML = `${currentHandData.points}`;

  // Adding the current hand to array playerHands
  playerHands.push(currentHandData);

  // Updating the counter of hands
  handsPlayerCounter++;

  //Validation if it's the last hand
  if (playerHands.length == 5) {
    nextHandButton.classList.add('hidden');
    playAgainButton.classList.remove('hidden');

    playAgainButton.addEventListener('click', playAgain);
    nextHandButton.removeEventListener('click', startGame);

    // Removing class for current hand
    clearCurrentHandClass();

    // Setting total points
    let playerPoints = 0;
    playerHands.forEach((playerHand) => {
      playerPoints += playerHand.points;
    });

    // Updating the total points
    totalPlayerPoints.innerHTML = `${playerPoints}`;

    // Updating styles for total points
    const totalPointsBox = document.getElementById('total-points');
    totalPointsBox.classList.remove('hidden');

    /** @type {HTMLDialogElement} */
    const gameResult = document.getElementById('game-result');
    gameResult.show();

    // Show player hands beside points of each hand
    showPlayerHands();

    // Validation for win the game
    let textResult = '';

    if (playerPoints >= 60) {
      textResult = 'You win!';
      gameResult.classList.add('dialog-game-result--win');
      totalPointsBox.classList.add('points-details__total--win');
    } else {
      textResult = 'You lose!';
      gameResult.classList.add('dialog-game-result--lose');
      totalPointsBox.classList.add('points-details__total--lose');
    }

    gameResult.textContent = textResult;

    // Hidding the remaining card container
    remainingCardsContainer.style.display = 'none';
  }

  // If it isn't the last hand
  else {
    nextHandButton.classList.remove('hidden');

    nextHandButton.addEventListener('click', startGame);
    playAgainButton.removeEventListener('click', playAgain);

    // Cleaning the array generatedObjCards
    cleanArray(generatedObjCards);
  }

  remainingCards.innerHTML = '-';
}
