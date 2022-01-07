/**
 * @fileoverview	Functions, elements and instructions for start game and start each hand
 * 
 * @author			Héctor Ochoa
 * 
 * @copyright		Héctor Ochoa 2021
 */

/**
 * Start game button
 * @type {HTMLElement}
 */
const startButton = document.getElementById("start-button");

/**
 * Remaing cards box
 * @type {HTMLElement}
 */
const remainingCards = document.getElementById("remaining-cards");

/**
 * Remaining cards counter
 * @type {Number}
 */
let remainingCardsCounter = 0;

startButton.addEventListener("click", startGame);

/** Start the game */
function startGame() {
	hideShowButton(startButton, "hide");
	hideShowButton(nextHandButton, "hide");
	hideShowButton(changeButton, "show");
	hideShowButton(stayButton, "show");
	
	// Display counter of remaining cards
	remainingCardsCounter = 3;
	remainingCards.innerHTML = `${remainingCardsCounter}`;

	// Generating the first 5 cards of the hand
	for (let i = 0; i < 5; i++) {
		// Generating the number and the figure for each card
		const card = setCardNumAndFig(`card${i + 1}`, false);

		// Adding to each card its info on its corners
		setCardColor(card.figure, i + 1);
		cardsInfo[i].innerHTML = `${card.number}<br>${card.figure}`;

		if (card.id == "card5") {
			cardsInfo[i + 1].innerHTML = `${card.number}<br>${card.figure}`;
		}
	}

	// Add the event click for toggle class for selected cards
	cardsToChange.forEach(card => {
		card.addEventListener("click", toggleClassSelectedCard);
	});

	// Listener for the Change Button
	changeButton.addEventListener("click", changeSelectedCards);

	// Listener for the Stay Button
	stayButton.addEventListener("click", stayHand);

	// validation for current hand
	if (handsPlayerCounter <= 5) {
		let handPlayerPoint = document.getElementById(`hand${handsPlayerCounter}-points`);
		// @ts-ignore
		handPlayerPoint.parentNode.classList.add("section__current-hand");
	}

	// Removing listeners of the start button and the next hand button
	startButton.removeEventListener("click", startGame);
	nextHandButton.removeEventListener("click", startGame);

	// Listener for the next hand
	nextHandButton.addEventListener("click", clearCurrentHandClass);
}