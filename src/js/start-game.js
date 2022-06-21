let remainingCardsCounter = 0;

function startGame() {
  /** Number and suit in the corners of each card */
  const $cardsInfo = document.querySelectorAll('.card__info');

  GAME_BUTTONS.start.classList.add('hidden');
  nextHandButton.classList.add('hidden');
  changeButton.classList.remove('hidden');
  stayButton.classList.remove('hidden');

  // Displaying counter of remaining cards
  remainingCardsCounter = 3;
  document.getElementById(
    'remaining-cards'
  ).textContent = `${remainingCardsCounter}`;

  // Generating the first 5 cards of the hand
  for (let i = 0; i < 5; i++) {
    const { id, cardInfo } = setCardNumAndFig(`card${i + 1}`, false);

    // Displaying card info
    $cardsInfo[i].innerText = cardInfo;
    if (id === 'card5') $cardsInfo[i + 1].innerText = cardInfo;
  }

  // Listener for cards
  document.addEventListener('click', toggleSelectedCard);

  // Listener for the Change Button
  changeButton.addEventListener('click', changeSelectedCards);

  // Listener for the Stay Button
  stayButton.addEventListener('click', stayHand);

  clearCurrentHandClass();

  // validation for current hand
  if (handsPlayerCounter <= 5) {
    const $currentHand = document.getElementById(
      `hand${handsPlayerCounter}-points`
    );
    // @ts-ignore
    $currentHand.parentNode.classList.add('points-details__hand--current');
  }

  // Removing listeners of the start button and the next hand button
  GAME_BUTTONS.start.removeEventListener('click', startGame);
  nextHandButton.removeEventListener('click', startGame);
}

GAME_BUTTONS.start.addEventListener('click', startGame);
