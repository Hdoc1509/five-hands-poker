const stay_button = document.getElementById("stay-button");
const next_hand_button = document.getElementById("next-hand-button");
let counter_hands_player = 1;
let total_p_points = document.getElementById("total-hands-points");
const current_hand = document.querySelectorAll("p.section__current-hand");
const play_again_button = document.getElementById("play-again-button");

//Play again
function playAgain(){location.reload()}

//Show player hands
function showPlayerHands(){
	let cards_desc = document.querySelectorAll(".section__hand-cards"),
	points_details = document.querySelectorAll(".section__points-details"),
	total_points = document.getElementById("total-points");

	//Displaying description of each hand
	cards_desc.forEach(hand_cards=>{
		hand_cards.style.display = "inline-block";
	});

	//Setting width for description of each hand
	points_details.forEach(details=>{
		details.style.width = "300px";
	});

	//Setting width for total points
	total_points.style.width = "140px";

	//Show player hands
	for (hand_cards in playerHands){
		//Taking the cards of the hand
		let hand_desc = playerHands[hand_cards].cards,

		//Getting the id of the card
		current_hand_id = playerHands[hand_cards].id,

		//Element of document with the previous id
		hand_txt = document.getElementById(`${current_hand_id}-cards`),

		//Text that will contain the cards of the hand
		hand_desc_txt = "(";

		//Array for the cards of the hand
		const hand_desc_array = [];
		
		//Adding each card to the array of hand cards
		for (hands in hand_desc){
			hand_desc_array.push(hand_desc[hands]);
		}

		//Completing the text of hand cards
		hand_desc_txt += hand_desc_array.join(" ");
		hand_desc_txt += ")";

		//Showing hand cards
		hand_txt.innerHTML = hand_desc_txt;
	}
}

//Stay Hand
function stayHand(){
	//Hidding the Change and the Stay buttons
	change_button.style.display = "none";
	stay_button.style.display = "none";

	//Removing listener for change cards
	change_button.removeEventListener("click", changeSelectedCards);

	//Removing listener for toggle class "section__selected-card"
	for (let card of cards_to_change) {
		card.removeEventListener("click", toggleClassSelectedCard);
	}

	//Generating data for the current hand
	const hand_p = verificateHand(generatedObjCards[0], generatedObjCards[1], generatedObjCards[2], generatedObjCards[3], generatedObjCards[4]);
	hand_p.id = `hand${counter_hands_player}`;

	//Updating the points of the current hand
	let hand_p_point = document.getElementById(`hand${counter_hands_player}-points`);
	hand_p_point.innerHTML = hand_p.points;

	//Adding the current hand to array playerHands
	playerHands.push(hand_p);

	//Updating the counter of hands
	counter_hands_player++;

	//Removing the listener for the Stay button
	stay_button.removeEventListener("click", stayHand);

	//Validation if it's the last hand
	if (playerHands.length == 5) {
		//Hidding the Next Hand button
		next_hand_button.style.display = "none";

		//Showing the Play Again button
		play_again_button.style.display = "inline-block";

		//Adding listener for play again
		play_again_button.addEventListener("click",playAgain);

		//Removing the listener for Next Hand button
		next_hand_button.removeEventListener("click", startGame);

		//Getting the current hand and removing its class "section__current-hand"
		const current_hand = document.querySelectorAll("p.section__current-hand");
		current_hand.forEach(hand_p => {
			hand_p.classList.remove("section__current-hand");
		});
		
		//Setting total points
		let p_points = 0;
		playerHands.forEach(p_hand => {p_points += p_hand.points});

		//Updating the total points
		total_p_points.innerHTML = p_points;

		//Updating styles for total points
		let total_points_container = document.getElementById("total-points");

		total_points_container.style.fontSize = "24px";
		total_points_container.style.color = "#fff";
		document.getElementById("total-hands-points").style.fontSize = "24px";

		//Showing game result
		let result_text = "";
		const game_result = document.getElementById("game-result");
		game_result.show();

		//Validation for win the game
		if (p_points >= 60) {
			result_text = "You win!";
			game_result.style.backgroundColor = "#106e10";
			total_points_container.style.backgroundColor = "#106e10";

		} else {
			result_text = "You lose!";
			game_result.style.backgroundColor = "#e71e1e";
			total_points_container.style.backgroundColor = "#c71c1c";
		}

		game_result.innerHTML = result_text;

		//Updating the counter of remaining cards
		counter_remaining_cards = 0;

		//Hidding the remaining card container
		remaining_cards_container.style.display = "none";

		//Show player hands beside points of each hand
		showPlayerHands();
	}

	//If it isn't the last hand
	else {
		//Displaying the Next Hand button
		next_hand_button.style.display = "inline-block";

		//Adding the listener for Next Hand button
		next_hand_button.addEventListener("click", startGame);

		//Removing the listener for Play Again button
		play_again_button.removeEventListener("click",playAgain);

		//Cleaning the array generatedObjCards
		generatedObjCards.splice(0,5);

		//Updating the counter of remaining cards
		counter_remaining_cards = 3;
	}
}
