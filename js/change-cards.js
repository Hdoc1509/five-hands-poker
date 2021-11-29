const change_button = document.getElementById("change-button");

//For toggle class "section__selected-card"
function toggleClassSelectedCard(){
	this.classList.toggle("section__selected-card");
}

//Change selected cards
function changeSelectedCards(){
	const selected_cards = document.querySelectorAll(".section__selected-card");
	let newCard1, newCard1_position, newCard2, newCard2_position, newCard3, newCard3_position;

	//Validation for remaining cards
	if (counter_remaining_cards == 3) {
		//validation for quantity of select cards to change
		switch(selected_cards.length){
			case 1:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0], selected_cards[0].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				`${newCard1.number}<br>${newCard1.figure}`;

				//Setting the position of card to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);
				
				setCardColorAndFigure(newCard1.figure, newCard1_position);

				//Updating the counter of remaining cards
				counter_remaining_cards--;
				break;

			case 2:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0], selected_cards[0].id, true);
				newCard2 =
				setCardNumberAndFigure(generatedCards[1], selected_cards[1].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				`${newCard1.number}<br>${newCard1.figure}`;
				selected_cards[1].firstElementChild.innerHTML =
				`${newCard2.number}<br>${newCard2.figure}`;

				//Setting the position of cards to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);
				newCard2_position =
				setNewCardPosition(selected_cards[1].id, newCard2.number, newCard2.figure);

				setCardColorAndFigure(newCard1.figure, newCard1_position);
				setCardColorAndFigure(newCard2.figure, newCard2_position);

				//Updating the counter of remaining cards
				counter_remaining_cards -= 2;
				break;

			case 3:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0], selected_cards[0].id, true);
				newCard2 =
				setCardNumberAndFigure(generatedCards[1], selected_cards[1].id, true);
				newCard3 =
				setCardNumberAndFigure(generatedCards[2], selected_cards[2].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				`${newCard1.number}<br>${newCard1.figure}`;
				selected_cards[1].firstElementChild.innerHTML =
				`${newCard2.number}<br>${newCard2.figure}`;
				selected_cards[2].firstElementChild.innerHTML =
				`${newCard3.number}<br>${newCard3.figure}`;

				//Setting the position of cards to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);
				newCard2_position =
				setNewCardPosition(selected_cards[1].id, newCard2.number, newCard2.figure);
				newCard3_position =
				setNewCardPosition(selected_cards[2].id, newCard3.number, newCard3.figure);

				setCardColorAndFigure(newCard1.figure, newCard1_position);
				setCardColorAndFigure(newCard2.figure, newCard2_position);
				setCardColorAndFigure(newCard3.figure, newCard3_position);

				//Updating the counter of remaining cards
				counter_remaining_cards -= 3;
				break;

			default:
				alert("Error.  No se puede cambiar esa cantidad de cartas");
				break;
		}
		
	} else if (counter_remaining_cards == 2) {
		switch(selected_cards.length){
			case 1:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0], selected_cards[0].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				`${newCard1.number}<br>${newCard1.figure}`;

				//Setting the position of card to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);

				setCardColorAndFigure(newCard1.figure, newCard1_position);

				//Updating the counter of remaining cards
				counter_remaining_cards--;
				break;

			case 2:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0],selected_cards[0].id, true);
				newCard2 =
				setCardNumberAndFigure(generatedCards[1],selected_cards[1].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				newCard1.number + "<br>" + newCard1.figure;
				selected_cards[1].firstElementChild.innerHTML =
				newCard2.number + "<br>" + newCard2.figure;

				//Setting the position of cards to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);
				newCard2_position =
				setNewCardPosition(selected_cards[1].id, newCard2.number, newCard2.figure);

				setCardColorAndFigure(newCard1.figure, newCard1_position);
				setCardColorAndFigure(newCard2.figure, newCard2_position);

				//Updating the counter of remaining cards
				counter_remaining_cards -= 2;
				break;

			default:
				alert("Error.  No se puede cambiar esa cantidad de cartas");
				break;
		}

	} else if (counter_remaining_cards == 1) {
		switch(selected_cards.length){
			case 1:
				newCard1 =
				setCardNumberAndFigure(generatedCards[0], selected_cards[0].id, true);

				selected_cards[0].firstElementChild.innerHTML =
				newCard1.number + "<br>" + newCard1.figure;

				//Setting the position of card to change
				newCard1_position =
				setNewCardPosition(selected_cards[0].id, newCard1.number, newCard1.figure);

				setCardColorAndFigure(newCard1.figure, newCard1_position);

				//Updating the counter of remaining cards
				counter_remaining_cards--;
				break;

			default:
				alert("Error.  No se puede cambiar esa cantidad de cartas");
				break;
		}
	}

	//Removing class "section__selected-card" of the selected cards
	selected_cards.forEach(card=>{
		card.classList.remove("section__selected-card");
	});

	//Updating the counter of remaining cards
	remaining_cards.innerHTML = counter_remaining_cards;

	//Validation if there isn't remaining card
	if (counter_remaining_cards == 0) {
		//Hiding the Change button
		change_button.style.display = "none";

		//Removing the listener for toggle class "section__selected-card"
		for (let card of cards_to_change) {
			card.removeEventListener("click", toggleClassSelectedCard);
		}
	}
}