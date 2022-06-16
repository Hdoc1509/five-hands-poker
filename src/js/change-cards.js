const changeButton = document.getElementById('change-button');

function changeSelectedCards() {
  const selectedCards = document.querySelectorAll('.card--selected'),
    len = selectedCards.length;

  function changeCardsQuantity(quantity) {
    for (let i = 0; i < quantity; i++) {
      const { id, cardInfo } = setCardNumAndFig(selectedCards[i].id, true);

      selectedCards[i].firstElementChild.innerText = cardInfo;
      if (id === 'card5')
        selectedCards[len - 1].lastElementChild.innerText = cardInfo;
    }

    // Updating the counter of remaining cards
    remainingCardsCounter -= quantity;
  }

  if (len > remainingCardsCounter) errChangeCardsQuantity();
  else if (len == 0) errNoCardSelected();
  else changeCardsQuantity(len);

  selectedCards.forEach((card) => card.classList.remove('card--selected'));

  // Updating the counter of remaining cards
  document.getElementById(
    'remaining-cards'
  ).textContent = `${remainingCardsCounter}`;

  if (remainingCardsCounter === 0) {
    changeButton.classList.add('hidden');

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
}
