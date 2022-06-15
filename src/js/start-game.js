const startButton = document.getElementById('start-button');
let remainingCardsCounter = 0;

startButton.addEventListener('click', startGame);

function startGame() {
  startButton.classList.add('hidden');
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
    cardsInfo[i].innerText = cardInfo;
    if (id === 'card5') cardsInfo[i + 1].innerText = cardInfo;
  }

  // Add the event click for toggle class for selected cards
  cardsToChange.forEach((card) => {
    card.addEventListener('click', toggleClassSelectedCard);
  });

  // Listener for the Change Button
  changeButton.addEventListener('click', changeSelectedCards);

  // Listener for the Stay Button
  stayButton.addEventListener('click', stayHand);

  clearCurrentHandClass();

  // validation for current hand
  if (handsPlayerCounter <= 5) {
    const currentHand = document.getElementById(
      `hand${handsPlayerCounter}-points`
    );
    // @ts-ignore
    currentHand.parentNode.classList.add('points-details__hand--current');
  }

  // Removing listeners of the start button and the next hand button
  startButton.removeEventListener('click', startGame);
  nextHandButton.removeEventListener('click', startGame);
}
