const changeButton = document.getElementById('change-button');

function changeSelectedCards() {
  const selectedCards = document.querySelectorAll('.card--selected'),
    len = selectedCards.length;

  function changeCardsQuantity(quantity) {
    for (let i = 0; i < quantity; i++) {
      let card = setCardNumAndFig(selectedCards[i].id, true),
        cardPosition = setNewCardPosition(
          selectedCards[i].id,
          card.number,
          card.figure
        );

      selectedCards[
        i
      ].firstElementChild.innerHTML = `${card.number}<br>${card.figure}`;
      setCardColor(card.figure, cardPosition);
    }

    // Updating the counter of remaining cards
    remainingCardsCounter -= quantity;
  }

  if (len > remainingCardsCounter) {
    errChangeCardsQuantity();
  } else if (len == 0) {
    errNoCardSelected();
  } else {
    changeCardsQuantity(len);
  }

  selectedCards.forEach((card) => {
    card.classList.remove('card--selected');
  });

  // Updating the counter of remaining cards
  remainingCards.innerHTML = `${remainingCardsCounter}`;

  if (remainingCardsCounter == 0) {
    changeButton.classList.add('hidden');

    for (let card of cardsToChange) {
      card.removeEventListener('click', toggleClassSelectedCard);
    }
  }
}
