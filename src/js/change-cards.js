const changeButton = document.getElementById('change-button');

function changeSelectedCards() {
  const selectedCards = document.querySelectorAll('.card--selected'),
    len = selectedCards.length;

  function changeCardsQuantity(quantity) {
    for (let i = 0; i < quantity; i++) {
      const { figure, id, cardInfo } = setCardNumAndFig(
        selectedCards[i].id,
        true
      );
      const position = Number(id.charAt(4));

      selectedCards[i].firstElementChild.innerText = cardInfo;
      if (id === 'card5')
        selectedCards[len - 1].lastElementChild.innerText = cardInfo;
      setCardColor(figure, position);
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
