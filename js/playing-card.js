//Number and figure in the corners of each card
const cards_Info = document.querySelectorAll(".section__card-info");

//Central Figure
const cardDisplay = document.querySelectorAll(".section__card");

//CSS Class for each card
const cards_to_change = document.querySelectorAll(".section__card-container");

//Remaining cards container
const remaining_cards_container = document.getElementById("remaining-cards-container");

//Figures for cards
const figures = ["♥","♦","♣","♠"];

//Numbers for cards
const numbers = ["A",2,3,4,5,6,7,8,9,"10","J","Q","K"];

//Array for unique generated cards
const generatedCards = [];

//Array for cards in game
const generatedObjCards = [];

//Array for hands
const playerHands = [];

//Generating all cards
for (let i = 0; i < 52; i++) {
	let number = generateRandomCard();
	generatedCards.push(number);
}

//Generate random unique cards
function generateRandomCard(){
	//Generating the card
	let cardNumber = numbers[Math.floor(Math.random() * numbers.length)],
		cardFigure = figures[Math.floor(Math.random() * figures.length)],
		generatedRandomCard = `${cardNumber}${cardFigure}`;

	//Validation for get unique cards
	while(generatedCards.includes(generatedRandomCard)){
		cardNumber = numbers[Math.floor(Math.random() * numbers.length)];
		cardFigure = figures[Math.floor(Math.random() * figures.length)];
		generatedRandomCard = `${cardNumber}${cardFigure}`;
	}

	return generatedRandomCard;
}

//For set the info of each card
function setCardNumberAndFigure(card, card_id, is_to_change){
	let card_number, card_figure;

	//If card number is 10
	if (card.includes("10")) {

		card_number = Number(card.slice(0,2));
		card_figure = card.charAt(2);
	}

	//If card number is J,Q,K or A
	else if (card.includes("J") ||
		card.includes("Q") ||
		card.includes("K") ||
		card.includes("A")) {

		card_number = card.charAt(0);
		card_figure = card.charAt(1);
		
	} else {

		card_number = Number(card.charAt(0));
		card_figure = card.charAt(1);
	}

	//Setting the object for each card
	let card_obj = {
		id: card_id,
		number: card_number,
		figure: card_figure
	};

	//Validation for change the current card
	if (is_to_change) {
		for (cards of generatedObjCards) {
			if (cards.id == card_id) {

				cards.number = card_number;
				cards.figure = card_figure;
			}
		}
	} else {

		generatedObjCards.push(card_obj);
	}

	//Remove the first card of array generated cards
	generatedCards.shift();

	return card_obj;
}

//For display the info of each card
function setCardColorAndFigure(cardFigure, cardOrdinalPosition){
	switch(cardFigure){
		//Color for ♥ and ♦
		case "♥":
		case "♦":
			cards_to_change[cardOrdinalPosition - 1].style.color = "red";
			break;

		//Color for ♣ and ♠
		default:
			cards_to_change[cardOrdinalPosition - 1].style.color = "black";
			break;
	}

	//Displaying the figure of the card
	cardDisplay[cardOrdinalPosition - 1].innerHTML = cardFigure;
}

//For set the ordinal position of the card that will be changed
function setNewCardPosition(card_id, card_number, card_figure){
	const selected_cards = document.querySelectorAll(".section__selected-card");
	let card_position;

	switch (card_id) {
		//If the card is the fifth card
		case "card5":
			card_position = 5;
			selected_cards[selected_cards.length - 1].lastElementChild.innerHTML =
			`${card_number}<br>${card_figure}`;
			break;

		case "card4":
			card_position = 4;
			break;

		case "card3":
			card_position = 3;
			break;

		case "card2":
			card_position = 2;
			break;

		case "card1":
			card_position = 1;
			break;
	}

	return card_position;
}