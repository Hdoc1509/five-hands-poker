/**
 * @fileoverview	Functions, elements and instructions for change cards of each hand
 * 
 * @author			Héctor Ochoa
 * 
 * @copyright		Héctor Ochoa 2021
 */

/**
 * Change card button
 * @type {HTMLElement}
 */
const changeButton = document.getElementById("change-button");

/** Change selected cards */
function changeSelectedCards() {
	const selectedCards = document.querySelectorAll(".section__selected-card"),
	len = selectedCards.length;

	function changeCardsQuantity(quantity) {
		for (let i = 0; i < quantity; i++) {
			let card = setCardNumAndFig(selectedCards[i].id, true),
			cardPosition = setNewCardPosition(selectedCards[i].id, card.number, card.figure);

			selectedCards[i].firstElementChild.innerHTML = `${card.number}<br>${card.figure}`;
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

	selectedCards.forEach(card => {
		card.classList.remove("section__selected-card");
	});

	// Updating the counter of remaining cards
	remainingCards.innerHTML = `${remainingCardsCounter}`;

	if (remainingCardsCounter == 0) {
		hideShowButton(changeButton, "hide");

		for (let card of cardsToChange) {
			card.removeEventListener("click", toggleClassSelectedCard);
		}
	}
}