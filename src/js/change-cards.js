const changeButton = document.getElementById('change-button');

function changeSelectedCards() {
  const selectedCards = document.querySelectorAll('.card--selected');
  const quantity = selectedCards.length;

  if (quantity > remainingCardsCounter) errChangeCardsQuantity();
  else if (quantity == 0) errNoCardSelected();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const { id, cardInfo } = setCardNumAndFig(selectedCards[i].id, true);

      selectedCards[i].firstElementChild.innerText = cardInfo;
      if (id === 'card5')
        selectedCards[quantity - 1].lastElementChild.innerText = cardInfo;
    }

    // Updating the counter of remaining cards
    remainingCardsCounter -= quantity;
  }

  selectedCards.forEach((card) => card.classList.remove('card--selected'));

  // Updating the counter of remaining cards
  document.getElementById(
    'remaining-cards'
  ).textContent = `${remainingCardsCounter}`;

  if (remainingCardsCounter === 0) {
    changeButton.classList.add('hidden');
    changeButton.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
}
