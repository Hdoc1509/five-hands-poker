/**
 * @fileoverview	General elements and functions
 * 
 * @version			v1.0.1
 * 
 * @author			Héctor Ochoa
 * 
 * @copyright		Héctor Ochoa 2021
 * 
 * 
 * CHANGELOG
 * --------
 * v1.0.1			Renamed internal function "setCardColorAndFigure" to "setCardColor"
 * 07-01-2022		Optimized and improved internal function "changeSelectedCards"
 * 					Fixed wrong change of cards when executing function "changeSelectedCards"
 * 					Improved generation of first 5 hands of each hand on internal function "startGame"
 * 					Added function "hideShowButton" for game buttons
 * 					Renamed all internal variables to camelCase naming convention
 * 					Renamed internal function "setCardNumberAndFigure" to "setCardNumAndFig"
 * 					Removed "card" parameter on setCardNumAndFig
 * 					Added function "clearCurrentHandClass"
 * 					Fixed some wrong validations of hands
 * 					Removed some unnecessary comments
 * 					Updated comments to JSDoc syntax
 * 					Added functions "arrayRandElement", "cleanArray" and "removeElement" for using with arrays
 * 					
 * --------
 * v1.0 				First launched version
 * 05-12-2021
 * --------
 * 
 * First version of Five Hands Poker was written by Héctor Ochoa
 */

/**
 * Number and figure in the corners of each card 
 * @type {NodeListOf<Element>}
*/
const cardsInfo = document.querySelectorAll(".section__card-info");

/** 
 * Central figure of each card
 * @type {NodeListOf<Element>}
 */
const cardDisplay = document.querySelectorAll(".section__card");

/** 
 * CSS Class for all cards
 * @type {NodeListOf<Element>}
 */
const cardsToChange = document.querySelectorAll(".section__card-container");

/** 
 * Container for remaining cards
 * @type {HTMLElement}
 */
const remainingCardsContainer = document.getElementById("remaining-cards-container");

/**
 * Array of game figures
 * @type {Array<String>}
 */
const figures = ["♥", "♦", "♣", "♠"];

/**
 * Array of game numbers
 * @type {Array<String | Number>}
 */
const numbers = ["A", 2, 3, 4, 5, 6, 7, 8, 9, "10", "J", "Q", "K"];

/**
 * Array for unique generated cards
 * @type {Array<String>}
 */
const generatedCards = [];

/**
 * Card Object
 * @typedef {Object} ObjCard
 * @property {String} id Card's id
 * @property {String | Number} number Card's number
 * @property {String} figure Card's figure
 */

/**
 * Array of cards for each hand
 * @type {Array<ObjCard>}
 */
const generatedObjCards = [];


const playerHands = [];

/** Generating all cards */
for (let i = 0; i < 52; i++) {
	let genCard = generateRandomCard();
	generatedCards.push(genCard);
}

/**
 * Get a random element from an array
 * @param {Array} array Array from get an element
 * @returns {Number | String | Array | Object} Element
 */
function arrayRandElement(array) {
	if (Array.isArray(array)) {
		let index = Math.floor(Math.random() * array.length);
		let randElement = array[index]
		return randElement;
	} else {
		console.error("Uncaught TypeError: especting an 'array' parameter on 'arrayRandElement'");
	}	
}

/**
 * Clean all elements of an array
 * @param {Array} array
 */
function cleanArray(array) {
	array.splice(0, array.length);
}

/**
 * Remove an string element of an array
 * @param {String} element
 */
 function removeElement(element, array) {
 	if (typeof element == "string") {
 		let elementPosition = array.indexOf(element);
   	array.splice(elementPosition, 1);
 	} else {
 		console.error("Uncaught TypeError: especting an 'string' parameter on 'removeElement'");
 	}
}

/**
 * Generate random unique cards
 * @returns {String}
 */
function generateRandomCard() {
	let cardNumber = arrayRandElement(numbers),
		cardFigure = arrayRandElement(figures);
	let generatedRandCard = `${cardNumber}${cardFigure}`;

	/** Validation for get unique cards */
	while(generatedCards.includes(generatedRandCard)){
		cardNumber = arrayRandElement(numbers);
		cardFigure = arrayRandElement(figures);
		generatedRandCard = `${cardNumber}${cardFigure}`;
	}

	return generatedRandCard;
}

/**
 * Hide or show game buttons
 * @param {HTMLElement} btn Button to alter
 * @param {String} action Action to do
 */
function hideShowButton(btn, action) {
	if (action == "hide") {
		btn.style.display = "none";
	} else if (action == "show") {
		btn.style.display = "inline-block";
	} else {
		alert("Error, acción inválida");
	}
}

/**
 * Set the info of each card
 * @param {String} card Card in string format
 * @param {String} cardId Card's Id
 * @param {Boolean} isToChange Especify if the card must be changed
 * @returns {ObjCard} Returns the card as an object
 */
function setCardNumAndFig(cardId, isToChange) {
	let card = arrayRandElement(generatedCards), cardFigure = "", cardNumber;

	if (card.includes("10")) {
		cardNumber = Number(card.slice(0,2));
		cardFigure = card.charAt(2);
	}

	else if (card.includes("J") ||
		card.includes("Q") ||
		card.includes("K") ||
		card.includes("A")) {

		cardNumber = card.charAt(0);
		cardFigure = card.charAt(1);
		
	} else {
		cardNumber = Number(card.charAt(0));
		cardFigure = card.charAt(1);
	}

	// Setting the object for each card
	let cardObj = {
		id: cardId,
		number: cardNumber,
		figure: cardFigure
	};

	if (isToChange) {
		for (let cards of generatedObjCards) {
			// Update data of the card to change
			if (cards.id == cardId) {
				cards.number = cardNumber;
				cards.figure = cardFigure;
			}
		}
	} else {
		generatedObjCards.push(cardObj);
	}

	// Remove the card from generatedCards
	removeElement(card, generatedCards);

	return cardObj;
}

/**
 * Display the info of each card
 * @param {String} cardFigure Card's figure
 * @param {Number} cardOrdinalPosition Card's ordinal position
 */
function setCardColor(cardFigure, cardOrdinalPosition) {
	switch(cardFigure){
		// Color for ♥ and ♦
		case "♥":
		case "♦":
			// @ts-ignore
			cardsToChange[cardOrdinalPosition - 1].style.color = "#f00";
			break;

		// Color for ♣ and ♠
		default:
			// @ts-ignore
			cardsToChange[cardOrdinalPosition - 1].style.color = "#000";
			break;
	}

	// Displaying the figure of the card
	cardDisplay[cardOrdinalPosition - 1].innerHTML = cardFigure;
}

/**
 * Set the ordinal position for the card that will be changed
 * @param {String} cardId Card's id
 * @param {String | Number} cardNumber Card's number
 * @param {String} cardFigure Card's figure
 * @returns {Number}
 */
function setNewCardPosition(cardId, cardNumber, cardFigure) {
	const selectedCards = document.querySelectorAll(".section__selected-card");
	let selCardsLen = selectedCards.length, cardPosition = 0;

	switch (cardId) {
		case "card5":
			cardPosition = 5;
			selectedCards[selCardsLen - 1].lastElementChild.innerHTML =
			`${cardNumber}<br>${cardFigure}`;
			break;

		case "card4":
			cardPosition = 4;
			break;

		case "card3":
			cardPosition = 3;
			break;

		case "card2":
			cardPosition = 2;
			break;

		case "card1":
			cardPosition = 1;
			break;
	}

	return cardPosition;
}

/** Toggle class "section__selected-card" */
function toggleClassSelectedCard() {
	this.classList.toggle("section__selected-card");
}

/** Remove class "section__current-hand" */
function clearCurrentHandClass() {
	const currentHand = document.querySelectorAll("p.section__current-hand");

	currentHand.forEach(hand => {
		hand.classList.remove("section__current-hand");
	});
}