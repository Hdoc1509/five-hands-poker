function changeSelectedCards() {
  const $selectedCards = document.querySelectorAll('.card--selected');
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCards()) errChangeCardsQuantity();
  else if (quantity == 0) errNoCardSelected();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const { id, cardInfo } = setCardNumAndFig($selectedCards[i].id, true);

      $selectedCards[i].querySelector('.card__info--top').innerText = cardInfo;
      if (id === 'card5')
        $selectedCards[i].querySelector('.card__info--bottom').innerText =
          cardInfo;
    }

    setRemainingCards((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove('card--selected'));

  // Updating the counter of remaining cards
  const currentRemainingCards = getRemainingCards();

  document.getElementById(
    'remaining-cards'
  ).textContent = `${currentRemainingCards}`;

  if (currentRemainingCards === 0) {
    GAME_BUTTONS.change.classList.add('hidden');
    GAME_BUTTONS.change.removeEventListener('click', changeSelectedCards);

    // Listener for cards
    document.removeEventListener('click', toggleSelectedCard);
  }
}
