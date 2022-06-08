/**
 * @fileoverview	Functions, elements and instructions for stay hand and next hand
 * 
 * @author			Héctor Ochoa
 * 
 * @copyright		Héctor Ochoa 2021
 */

/**
 * Stay hand button
 * @type {HTMLElement}
 */
const stayButton = document.getElementById("stay-button");

/**
 * Next hand button
 * @type {HTMLElement}
 */
const nextHandButton = document.getElementById("next-hand-button");

/**
 * Play again button
 * @type {HTMLElement}
 */
const playAgainButton = document.getElementById("play-again-button");

/**
 * Text box for total player points
 * @type {HTMLElement}
 */
const totalPlayerPoints = document.getElementById("total-hands-points");

/**
 * Counter for player hands
 * @type {Number}
 */
let handsPlayerCounter = 1;

/** Play again the game */
function playAgain() {
	location.reload();
}

/** Show player hands */
function showPlayerHands() {
	let cardsDesc = document.querySelectorAll(".section__hand-cards"),
	pointsDetails = document.querySelectorAll(".section__points-details"),
	totalPointsBox = document.getElementById("total-points");

	//Displaying description container of each hand
	// @ts-ignore
	cardsDesc.forEach(handCards => {handCards.style.display = "inline-block"});

	// Setting new styles for description of each hand
	pointsDetails.forEach(details => {
		// @ts-ignore
		details.style.backgroundColor = "#0ba70566";
		// @ts-ignore
		details.style.width = "280px";
		// @ts-ignore
		details.style.borderRadius = "10px";
	});

	// Setting width for total points
	totalPointsBox.style.width = "140px";

	// Show player hands
	for (let hand of playerHands) {
		let handCards = hand.cards,
		currentHandId = hand.id,
		handDescTxt = `(${handCards.join(" ")})`;

		const handTxtBox = document.getElementById(`${currentHandId}-cards`);

		// Displaying hand cards
		handTxtBox.innerHTML = handDescTxt;
	}
}

/** Stay with the current hand */
function stayHand() {
	hideShowButton(changeButton, "hide");
	hideShowButton(stayButton, "hide");

	changeButton.removeEventListener("click", changeSelectedCards);
	stayButton.removeEventListener("click", stayHand);

	for (let card of cardsToChange) {
		card.removeEventListener("click", toggleClassSelectedCard);
	}

	// Data for the current hand
	const currentHandData = verificateHand(generatedObjCards[0], generatedObjCards[1], generatedObjCards[2], generatedObjCards[3], generatedObjCards[4]);
	currentHandData.id = `hand${handsPlayerCounter}`;

	// Updating the points of the current hand
	let currentHandPointBox = document.getElementById(`hand${handsPlayerCounter}-points`);
	currentHandPointBox.innerHTML = `${currentHandData.points}`;

	// Adding the current hand to array playerHands
	playerHands.push(currentHandData);

	// Updating the counter of hands
	handsPlayerCounter++;

	//Validation if it's the last hand
	if (playerHands.length == 5) {
		hideShowButton(nextHandButton, "hide");
		hideShowButton(playAgainButton, "show");

		playAgainButton.addEventListener("click", playAgain);
		nextHandButton.removeEventListener("click", startGame);

		// Removing class for current hand
		clearCurrentHandClass();
		
		// Setting total points
		let playerPoints = 0;
		playerHands.forEach(playerHand => {playerPoints += playerHand.points});

		// Updating the total points
		totalPlayerPoints.innerHTML = `${playerPoints}`;

		// Updating styles for total points
		let totalPointsBox = document.getElementById("total-points");

		totalPointsBox.style.fontSize = "24px";
		totalPointsBox.style.color = "#fff";
		document.getElementById("total-hands-points").style.fontSize = "24px";

		// Showing game result
		const gameResult = document.getElementById("game-result");
		// @ts-ignore
		gameResult.show();

		// Show player hands beside points of each hand
		showPlayerHands();

		// Validation for win the game
		let textResult = "";

		if (playerPoints >= 60) {
			textResult = "You win!";
			gameResult.style.backgroundColor = "#106e10";
			totalPointsBox.style.backgroundColor = "#106e10";

		} else {
			textResult = "You lose!";
			gameResult.style.backgroundColor = "#e71e1e";
			totalPointsBox.style.backgroundColor = "#c71c1c";
		}

		gameResult.innerHTML = textResult;

		// Hidding the remaining card container
		remainingCardsContainer.style.display = "none";
	}

	// If it isn't the last hand
	else {
		hideShowButton(nextHandButton, "show");

		nextHandButton.addEventListener("click", startGame);
		playAgainButton.removeEventListener("click", playAgain);

		// Cleaning the array generatedObjCards
		cleanArray(generatedObjCards);
	}

	remainingCards.innerHTML = "-";
}