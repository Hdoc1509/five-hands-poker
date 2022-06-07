/**
 * Hand Object
 * @typedef {Object} ObjHand
 * @property {Array<String>} cards Hand's cards
 * @property {String} description Hand's description
 * @property {String} id Hand's id
 * @property {Number} points Hand's points
 */

/**
 * Verificate hand
 * @param {ObjCard} card1 First card
 * @param {ObjCard} card2 Second card
 * @param {ObjCard} card3 Third card
 * @param {ObjCard} card4 Fourth card
 * @param {ObjCard} card5 Fifth card
 * @returns {ObjHand} Returns hand information as an object
 */
function verificateHand(card1, card2, card3, card4, card5) {
	const hand = {
		cards: [
			`${card1.number}${card1.figure}`,
			`${card2.number}${card2.figure}`,
			`${card3.number}${card3.figure}`,
			`${card4.number}${card4.figure}`,
			`${card5.number}${card5.figure}`
		],
		description: "",
		id: "",
		points: 0
	};

	// For PAIR
	if ((card1.number == card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&
		card3.number != card4.number &&
		card3.number != card5.number &&
		card4.number != card5.number) ||

		(card1.number == card3.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&
		card4.number != card5.number) ||

		(card1.number == card4.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card5.number &&
		card2.number != card3.number &&
		card2.number != card5.number &&
		card3.number != card5.number) ||

		(card1.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card2.number != card3.number &&
		card2.number != card4.number &&
		card3.number != card4.number)) {

		hand.points = 2;
		hand.description = `Par de ${card1.number}`;

	} else if ((card2.number == card3.number &&
		card2.number != card1.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&
		card4.number != card5.number) ||

		(card2.number == card4.number &&
		card2.number != card1.number &&
		card2.number != card3.number &&
		card2.number != card5.number &&
		card1.number != card3.number &&
		card1.number != card5.number &&
		card3.number != card5.number) ||

		(card2.number == card5.number &&
		card2.number != card1.number &&
		card2.number != card3.number &&
		card2.number != card4.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card3.number != card4.number)) {

		hand.points = 2;
		hand.description = `Par de ${card2.number}`;

	} else if ((card3.number == card4.number &&
		card3.number != card1.number &&
		card3.number != card2.number &&
		card3.number != card5.number &&
		card1.number != card2.number &&
		card1.number != card5.number &&
		card2.number != card5.number) ||

		(card3.number == card5.number &&
		card3.number != card1.number &&
		card3.number != card2.number &&
		card3.number != card4.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number != card4.number)) {

		hand.points = 2;
		hand.description = `Par de ${card3.number}`;

	} else if (card4.number == card5.number &&
		card4.number != card1.number &&
		card4.number != card2.number &&
		card4.number != card3.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card2.number != card3.number) {

		hand.points = 2;
		hand.description = `Par de ${card4.number}`;
	}

	// For DOUBLE PAIR
	else if ((card1.number == card2.number &&
		card3.number == card4.number &&
		card1.number != card3.number &&
		card1.number != card5.number &&
		card3.number != card5.number) ||

		(card1.number == card2.number &&
		card3.number == card5.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card3.number != card4.number) ||

		(card1.number == card4.number &&
		card3.number == card5.number &&
		card1.number != card3.number &&
		card1.number != card2.number &&
		card3.number != card2.number) ||

		(card1.number == card5.number &&
		card3.number == card4.number &&
		card1.number != card3.number &&
		card1.number != card2.number &&
		card3.number != card2.number)) {

		hand.points = 5;
		hand.description =
		`Doble par: par de ${card1.number} y par de ${card3.number}`;

	} else if ((card1.number == card2.number &&
		card4.number == card5.number &&
		card1.number != card4.number &&
		card1.number != card3.number &&
		card4.number != card3.number) ||

		(card1.number == card3.number &&
		card4.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number != card4.number)) {

		hand.points = 5;
		hand.description =
		`Doble par: par de ${card1.number} y par de ${card4.number}`;

	} else if (card2.number == card3.number &&
		card4.number == card5.number &&
		card2.number != card4.number &&
		card2.number != card1.number &&
		card4.number != card1.number) {

		hand.points = 5;
		hand.description =
		`Doble par: par de ${card2.number} y par de ${card4.number}`;

	} else if ((card1.number == card3.number &&
		card2.number == card4.number &&
		card1.number != card2.number &&
		card1.number != card5.number &&
		card2.number != card5.number) ||

		(card1.number == card3.number &&
		card2.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number != card4.number) ||

		(card1.number == card4.number &&
		card2.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card2.number != card3.number) ||

		(card1.number == card4.number &&
		card2.number == card3.number &&
		card1.number != card2.number &&
		card1.number != card5.number &&
		card2.number != card5.number) ||

		(card1.number == card5.number &&
		card2.number == card3.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number != card4.number) ||

		(card1.number == card5.number &&
		card2.number == card4.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card2.number != card3.number)) {

		hand.points = 5;
		hand.description =
		`Doble par: par de ${card1.number} y par de ${card2.number}`;

	} else if ((card2.number == card4.number &&
		card3.number == card5.number &&
		card2.number != card3.number &&
		card2.number != card1.number &&
		card3.number != card1.number) ||

		(card2.number == card5.number &&
		card3.number == card4.number &&
		card2.number != card3.number &&
		card2.number != card1.number &&
		card3.number != card1.number)) {

		hand.points = 5;
		hand.description =
		`Doble par: par de ${card2.number} y par de ${card3.number}`;
	}

	// For TRIO
	else if ((card1.number == card2.number &&
		card1.number == card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&
		card4.number != card5.number) ||

		(card1.number == card2.number &&
		card1.number == card4.number &&
		card1.number != card3.number &&
		card1.number != card5.number &&
		card3.number != card5.number) ||

		(card1.number == card2.number &&
		card1.number == card5.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card3.number != card4.number) ||

		(card1.number == card3.number &&
		card1.number == card4.number &&
		card1.number != card2.number &&
		card1.number != card5.number &&
		card2.number != card5.number) ||
		
		(card1.number == card3.number &&
		card1.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number != card4.number) ||

		(card1.number == card4.number &&
		card1.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card2.number != card3.number)) {

		hand.points = 10;
		hand.description = `Trío de ${card1.number}`;

	} else if ((card2.number == card3.number &&
		card2.number == card4.number &&
		card2.number != card1.number &&
		card2.number != card5.number &&
		card1.number != card5.number) ||

		(card2.number == card3.number &&
		card2.number == card5.number &&
		card2.number != card1.number &&
		card2.number != card4.number &&
		card1.number != card4.number) ||

		(card2.number == card4.number &&
		card2.number == card5.number &&
		card2.number != card1.number &&
		card2.number != card3.number &&
		card1.number != card3.number)) {

		hand.points = 10;
		hand.description = `Trío de ${card2.number}`;

	} else if (card3.number == card4.number &&
		card3.number == card5.number &&
		card3.number != card1.number &&
		card3.number != card2.number &&
		card1.number != card2.number) {

		hand.points = 10;
		hand.description = `Trío de ${card3.number}`;
	}

	// For STAIR
	else if ((card1.number == "A" ||
		card1.number == 2 ||
		card1.number == 3 ||
		card1.number == 4 ||
		card1.number == 5) &&

		(card2.number == "A" ||
		card2.number == 2 ||
		card2.number == 3 ||
		card2.number == 4 ||
		card2.number == 5) &&

		(card3.number == "A" ||
		card3.number == 2 ||
		card3.number == 3 ||
		card3.number == 4 ||
		card3.number == 5) &&

		(card4.number == "A" ||
		card4.number == 2 ||
		card4.number == 3 ||
		card4.number == 4 ||
		card4.number == 5) &&

		(card5.number == "A" ||
		card5.number == 2 ||
		card5.number == 3 ||
		card5.number == 4 ||
		card5.number == 5) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): A - 5`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: A - 5";
		}

	} else if ((card1.number == 2 ||
		card1.number == 3 ||
		card1.number == 4 ||
		card1.number == 5 ||
		card1.number == 6) &&

		(card2.number == 2 ||
		card2.number == 3 ||
		card2.number == 4 ||
		card2.number == 5 ||
		card2.number == 6) &&

		(card3.number == 2 ||
		card3.number == 3 ||
		card3.number == 4 ||
		card3.number == 5 ||
		card3.number == 6) &&

		(card4.number == 2 ||
		card4.number == 3 ||
		card4.number == 4 ||
		card4.number == 5 ||
		card4.number == 6) &&

		(card5.number == 2 ||
		card5.number == 3 ||
		card5.number == 4 ||
		card5.number == 5 ||
		card5.number == 6) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure})`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 2 - 6";
		}

	} else if ((card1.number == 3 ||
		card1.number == 4 ||
		card1.number == 5 ||
		card1.number == 6 ||
		card1.number == 7) &&

		(card2.number == 3 ||
		card2.number == 4 ||
		card2.number == 5 ||
		card2.number == 6 ||
		card2.number == 7) &&

		(card3.number == 3 ||
		card3.number == 4 ||
		card3.number == 5 ||
		card3.number == 6 ||
		card3.number == 7) &&

		(card4.number == 3 ||
		card4.number == 4 ||
		card4.number == 5 ||
		card4.number == 6 ||
		card4.number == 7) &&

		(card5.number == 3 ||
		card5.number == 4 ||
		card5.number == 5 ||
		card5.number == 6 ||
		card5.number == 7) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 3 - 7`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 3 - 7";
		}

	} else if ((card1.number == 4 ||
		card1.number == 5 ||
		card1.number == 6 ||
		card1.number == 7 ||
		card1.number == 8) &&

		(card2.number == 4 ||
		card2.number == 5 ||
		card2.number == 6 ||
		card2.number == 7 ||
		card2.number == 8) &&

		(card3.number == 4 ||
		card3.number == 5 ||
		card3.number == 6 ||
		card3.number == 7 ||
		card3.number == 8) &&

		(card4.number == 4 ||
		card4.number == 5 ||
		card4.number == 6 ||
		card4.number == 7 ||
		card4.number == 8) &&

		(card5.number == 4 ||
		card5.number == 5 ||
		card5.number == 6 ||
		card5.number == 7 ||
		card5.number == 8) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 4 - 8`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 4 - 8";
		}

	} else if ((card1.number == 5 ||
		card1.number == 6 ||
		card1.number == 7 ||
		card1.number == 8 ||
		card1.number == 9) &&

		(card2.number == 5 ||
		card2.number == 6 ||
		card2.number == 7 ||
		card2.number == 8 ||
		card2.number == 9) &&

		(card3.number == 5 ||
		card3.number == 6 ||
		card3.number == 7 ||
		card3.number == 8 ||
		card3.number == 9) &&

		(card4.number == 5 ||
		card4.number == 6 ||
		card4.number == 7 ||
		card4.number == 8 ||
		card4.number == 9) &&

		(card5.number == 5 ||
		card5.number == 6 ||
		card5.number == 7 ||
		card5.number == 8 ||
		card5.number == 9) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 5 - 9`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 5 - 9";
		}

	} else if ((card1.number == 6 ||
		card1.number == 7 ||
		card1.number == 8 ||
		card1.number == 9 ||
		card1.number == 10) &&

		(card2.number == 6 ||
		card2.number == 7 ||
		card2.number == 8 ||
		card2.number == 9 ||
		card2.number == 10) &&

		(card3.number == 6 ||
		card3.number == 7 ||
		card3.number == 8 ||
		card3.number == 9 ||
		card3.number == 10) &&

		(card4.number == 6 ||
		card4.number == 7 ||
		card4.number == 8 ||
		card4.number == 9 ||
		card4.number == 10) &&

		(card5.number == 6 ||
		card5.number == 7 ||
		card5.number == 8 ||
		card5.number == 9 ||
		card5.number == 10) &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 6 - 10`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 6 - 10";
		}

	} else if ((card1.number == 7 ||
		card1.number == 8 ||
		card1.number == 9 ||
		card1.number == 10 ||
		card1.number == "J") &&

		(card2.number == 7 ||
		card2.number == 8 ||
		card2.number == 9 ||
		card2.number == 10 ||
		card2.number == "J") &&

		(card3.number == 7 ||
		card3.number == 8 ||
		card3.number == 9 ||
		card3.number == 10 ||
		card3.number == "J") &&

		(card4.number == 7 ||
		card4.number == 8 ||
		card4.number == 9 ||
		card4.number == 10 ||
		card4.number == "J") &&

		(card5.number == 7 ||
		card5.number == 8 ||
		card5.number == 9 ||
		card5.number == 10 ||
		card5.number == "J") &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 7 - J`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = `Escalera: 7 - J`;
		}

	} else if ((card1.number == 8 ||
		card1.number == 9 ||
		card1.number == 10 ||
		card1.number == "J" ||
		card1.number == "Q") &&

		(card2.number == 8 ||
		card2.number == 9 ||
		card2.number == 10 ||
		card2.number == "J" ||
		card2.number == "Q") &&

		(card3.number == 8 ||
		card3.number == 9 ||
		card3.number == 10 ||
		card3.number == "J" ||
		card3.number == "Q") &&

		(card4.number == 8 ||
		card4.number == 9 ||
		card4.number == 10 ||
		card4.number == "J" ||
		card4.number == "Q") &&

		(card5.number == 8 ||
		card5.number == 9 ||
		card5.number == 10 ||
		card5.number == "J" ||
		card5.number == "Q") &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 8 - Q`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = `Escalera: 8 - Q`;
		}

	} else if ((card1.number == 9 ||
		card1.number == 10 ||
		card1.number == "J" ||
		card1.number == "Q" ||
		card1.number == "K") &&

		(card2.number == 9 ||
		card2.number == 10 ||
		card2.number == "J" ||
		card2.number == "Q" ||
		card2.number == "K") &&

		(card3.number == 9 ||
		card3.number == 10 ||
		card3.number == "J" ||
		card3.number == "Q" ||
		card3.number == "K") &&

		(card4.number == 9 ||
		card4.number == 10 ||
		card4.number == "J" ||
		card4.number == "Q" ||
		card4.number == "K") &&

		(card5.number == 9 ||
		card5.number == 10 ||
		card5.number == "J" ||
		card5.number == "Q" ||
		card5.number == "K") &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For COLOR STAIR
			hand.points = 75;
			hand.description = `Escalera de Color(${card1.figure}): 9 - K`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 9 - K";
		}

	} else if ((card1.number == 10 ||
		card1.number == "J" ||
		card1.number == "Q" ||
		card1.number == "K" ||
		card1.number == "A") &&

		(card2.number == 10 ||
		card2.number == "J" ||
		card2.number == "Q" ||
		card2.number == "K" ||
		card2.number == "A") &&

		(card3.number == 10 ||
		card3.number == "J" ||
		card3.number == "Q" ||
		card3.number == "K" ||
		card3.number == "A") &&

		(card4.number == 10 ||
		card4.number == "J" ||
		card4.number == "Q" ||
		card4.number == "K" ||
		card4.number == "A") &&

		(card5.number == 10 ||
		card5.number == "J" ||
		card5.number == "Q" ||
		card5.number == "K" ||
		card5.number == "A") &&

		card1.number != card2.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&

		card2.number != card3.number &&
		card2.number != card4.number &&
		card2.number != card5.number &&

		card3.number != card4.number &&
		card3.number != card5.number &&

		card4.number != card5.number) {

		if (card1.figure == card2.figure &&
			card2.figure == card3.figure &&
			card3.figure == card4.figure &&
			card4.figure == card5.figure) {

			// For REAL COLOR STAIR
			hand.points = 100;
			hand.description = `Escaler Real de Color (${card1.figure})`;

		} else {

			// For STAIR
			hand.points = 15;
			hand.description = "Escalera: 10 - A";
		}	
	}

	// For COLOR
	else if (card1.figure == card2.figure &&
		card2.figure == card3.figure &&
		card3.figure == card4.figure &&
		card4.figure == card5.figure) {

		hand.points = 20;
		hand.description = `Color(${card1.figure})`;
	}

	// For FULL HOUSE
	else if ((card1.number == card2.number &&
		card2.number == card3.number &&
		card1.number != card4.number &&
		card1.number != card5.number &&
		card4.number == card5.number) ||

		(card1.number == card2.number &&
		card1.number == card4.number &&
		card1.number != card3.number &&
		card1.number != card5.number &&
		card3.number == card5.number) ||

		(card1.number == card2.number &&
		card1.number == card5.number &&
		card1.number != card3.number &&
		card1.number != card4.number &&
		card3.number == card4.number) ||

		(card1.number == card3.number &&
		card1.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card4.number &&
		card2.number == card4.number) ||

		(card1.number == card3.number &&
		card1.number == card4.number &&
		card1.number != card2.number &&
		card1.number != card5.number &&
		card2.number == card5.number) ||

		(card1.number == card4.number &&
		card1.number == card5.number &&
		card1.number != card2.number &&
		card1.number != card3.number &&
		card2.number == card3.number) ||

		(card2.number == card3.number &&
		card2.number == card5.number &&
		card2.number != card1.number &&
		card2.number != card4.number &&
		card1.number == card4.number) ||

		(card2.number == card3.number &&
		card2.number == card4.number &&
		card2.number != card1.number &&
		card2.number != card5.number &&
		card1.number == card5.number) ||

		(card2.number == card4.number &&
		card2.number == card5.number &&
		card2.number != card1.number &&
		card2.number != card3.number &&
		card1.number == card3.number) ||

		(card3.number == card4.number &&
		card3.number == card5.number &&
		card3.number != card1.number &&
		card3.number != card2.number &&
		card1.number == card2.number)) {

		hand.points = 25;
		hand.description = "Full House";
	}

	// For POKER
	else if ((card1.number == card2.number &&
		card1.number == card3.number &&
		card1.number == card4.number &&
		card1.number != card5.number) ||

		(card1.number == card2.number &&
		card1.number == card3.number &&
		card1.number == card5.number &&
		card1.number != card4.number) ||

		(card1.number == card2.number &&
		card1.number == card4.number &&
		card1.number == card5.number &&
		card1.number != card3.number) ||

		(card1.number == card3.number &&
		card1.number == card4.number &&
		card1.number == card5.number &&
		card1.number != card2.number)) {

		hand.points = 50;
		hand.description = `Póker de ${card1.number}`;

	} else if (card2.number == card3.number &&
		card2.number == card4.number &&
		card2.number == card5.number &&
		card2.number != card1.number) {

		hand.points = 50;
		hand.description = `Póker de ${card2.number}`;
	}

	//For NOTHING
	else {
		hand.points = 0;
		hand.description = "Nothing";
	}

	return hand;
}