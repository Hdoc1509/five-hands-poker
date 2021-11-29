const start_button = document.getElementById("start-button");

//Remaining cards
const remaining_cards = document.getElementById("remaining-cards");

//Counter for remaining cards
let counter_remaining_cards = 3;

//Listener of the Main Button
start_button.addEventListener("click", startGame);

//Start Game
function startGame(){
	//Changes of buttons
	start_button.style.display = "none";
	change_button.style.display = "inline-block";
	stay_button.style.display = "inline-block";
	next_hand_button.style.display = "none";
	
	//Disaply counter of remaining cards
	remaining_cards.innerHTML = counter_remaining_cards;

	//Generating the number and the figure for card1
	const card1 = setCardNumberAndFigure(generatedCards[0], "card1", false);
	setCardColorAndFigure(card1.figure, 1);

	//Generating the number and the figure for card2
	const card2 = setCardNumberAndFigure(generatedCards[0], "card2", false);
	setCardColorAndFigure(card2.figure, 2);

	//Generating the number and the figure for card3
	const card3 = setCardNumberAndFigure(generatedCards[0], "card3", false);
	setCardColorAndFigure(card3.figure, 3);

	//Generating the number and the figure for card4
	const card4 = setCardNumberAndFigure(generatedCards[0], "card4", false);
	setCardColorAndFigure(card4.figure, 4);

	//Generating the number and the figure for card5
	const card5 = setCardNumberAndFigure(generatedCards[0], "card5", false);
	setCardColorAndFigure(card5.figure, 5);

	//Adding to each card its info to its corners
	cards_Info[0].innerHTML = `${card1.number} <br> ${card1.figure}`;

	cards_Info[1].innerHTML = `${card2.number} <br> ${card2.figure}`;

	cards_Info[2].innerHTML = `${card3.number} <br> ${card3.figure}`;

	cards_Info[3].innerHTML = `${card4.number} <br> ${card4.figure}`;

	cards_Info[4].innerHTML = `${card5.number} <br> ${card5.figure}`;
	cards_Info[5].innerHTML = `${card5.number} <br> ${card5.figure}`;

	//Add the event click for toggle class for selected cards
	for (let card of cards_to_change) {
		card.addEventListener("click", toggleClassSelectedCard);
	}

	//Listener for the Change Button
	change_button.addEventListener("click", changeSelectedCards);

	//Listener for the Stay Button
	stay_button.addEventListener("click", stayHand);

	//validation for the fifth player hand
	if (counter_hands_player <= 5) {
		let hand_p_point = document.getElementById(`hand${counter_hands_player}-points`);
		hand_p_point.parentNode.classList.add("section__current-hand");
	}

	//Removing listeners of the start button and the next hand button
	start_button.removeEventListener("click", startGame);
	next_hand_button.removeEventListener("click", startGame);

	//Listener for the next hand
	next_hand_button.addEventListener("click",function(){
		const current_hand = document.querySelectorAll("p.section__current-hand");

		//Removing class for current hand
		current_hand.forEach(hand_p => {
			hand_p.classList.remove("section__current-hand");
		});
	});
}