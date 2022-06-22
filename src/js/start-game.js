function startGame() {
  /** Number and suit in the corners of each card */
  const $cardsInfo = document.querySelectorAll('.card__info');

  GAME_BUTTONS.start.classList.add('hidden');
  GAME_BUTTONS.nextHand.classList.add('hidden');
  GAME_BUTTONS.change.classList.remove('hidden');
  GAME_BUTTONS.stay.classList.remove('hidden');

  // Displaying counter of remaining cards
  setRemainingCards(() => 3);
  document.getElementById(
    'remaining-cards'
  ).textContent = `${getRemainingCards()}`;

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
  GAME_BUTTONS.change.addEventListener('click', changeSelectedCards);

  // Listener for the Stay Button
  GAME_BUTTONS.stay.addEventListener('click', stayHand);

  clearCurrentHandClass();

  // validation for current hand
  const currentHandsCounter = getPlayerHands();

  if (currentHandsCounter <= 5) {
    const $currentHand = document.getElementById(
      `hand${currentHandsCounter}-points`
    );
    // @ts-ignore
    $currentHand.parentNode.classList.add('points-details__hand--current');
  }

  // Removing listeners of the start button and the next hand button
  GAME_BUTTONS.start.removeEventListener('click', startGame);
  GAME_BUTTONS.nextHand.removeEventListener('click', startGame);
}

GAME_BUTTONS.start.addEventListener('click', startGame);
