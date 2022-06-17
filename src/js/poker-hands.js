/**
 * Check if all cards has different numbers
 * @param  {Array<ObjCard>} cards
 */
const allDifferentNumbers = (cards) => {
  const [card1, card2, card3, card4, card5] = cards;

  return (
    card1.number !== card2.number &&
    card1.number !== card3.number &&
    card1.number !== card4.number &&
    card1.number !== card5.number &&
    card2.number !== card3.number &&
    card2.number !== card4.number &&
    card2.number !== card5.number &&
    card3.number !== card4.number &&
    card3.number !== card5.number &&
    card4.number !== card5.number
  );
};

/**
 * Hand Object
 * @typedef {Object} ObjHand
 * @property {Array<String>} cards Hand's cards
 * @property {String} description Hand's description
 * @property {String} id Hand's id
 * @property {Number} points Hand's points
 */

/**
 * Card Object
 * @typedef {Object} ObjCard
 * @property {String} id Card's id
 * @property {String} number Card's number
 * @property {String} figure Card's figure
 */

/**
 * Verificate hand
 * @param {Array<ObjCard>} generatedObjCards
 * @param {number} handsPlayerCounter
 * @returns {ObjHand} Returns hand information as an object
 */
function verificateHand(generatedObjCards, handsPlayerCounter) {
  const [card1, card2, card3, card4, card5] = generatedObjCards;

  const hand = {
    cards: [
      `${card1.number}${card1.figure}`,
      `${card2.number}${card2.figure}`,
      `${card3.number}${card3.figure}`,
      `${card4.number}${card4.figure}`,
      `${card5.number}${card5.figure}`,
    ],
    description: '',
    id: `hand${handsPlayerCounter}`,
    points: 0,
  };

  // For PAIR
  if (
    (card1.number == card2.number &&
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
      card3.number != card4.number)
  ) {
    hand.points = 2;
    hand.description = `Par de ${card1.number}`;
  } else if (
    (card2.number == card3.number &&
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
      card3.number != card4.number)
  ) {
    hand.points = 2;
    hand.description = `Par de ${card2.number}`;
  } else if (
    (card3.number == card4.number &&
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
      card2.number != card4.number)
  ) {
    hand.points = 2;
    hand.description = `Par de ${card3.number}`;
  } else if (
    card4.number == card5.number &&
    card4.number != card1.number &&
    card4.number != card2.number &&
    card4.number != card3.number &&
    card1.number != card2.number &&
    card1.number != card3.number &&
    card2.number != card3.number
  ) {
    hand.points = 2;
    hand.description = `Par de ${card4.number}`;
  }

  // For DOUBLE PAIR
  else if (
    (card1.number == card2.number &&
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
      card3.number != card2.number)
  ) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card3.number}`;
  } else if (
    (card1.number == card2.number &&
      card4.number == card5.number &&
      card1.number != card4.number &&
      card1.number != card3.number &&
      card4.number != card3.number) ||
    (card1.number == card3.number &&
      card4.number == card5.number &&
      card1.number != card2.number &&
      card1.number != card4.number &&
      card2.number != card4.number)
  ) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card4.number}`;
  } else if (
    card2.number == card3.number &&
    card4.number == card5.number &&
    card2.number != card4.number &&
    card2.number != card1.number &&
    card4.number != card1.number
  ) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card2.number} y par de ${card4.number}`;
  } else if (
    (card1.number == card3.number &&
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
      card2.number != card3.number)
  ) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card2.number}`;
  } else if (
    (card2.number == card4.number &&
      card3.number == card5.number &&
      card2.number != card3.number &&
      card2.number != card1.number &&
      card3.number != card1.number) ||
    (card2.number == card5.number &&
      card3.number == card4.number &&
      card2.number != card3.number &&
      card2.number != card1.number &&
      card3.number != card1.number)
  ) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card2.number} y par de ${card3.number}`;
  }

  // For TRIO
  else if (
    (card1.number == card2.number &&
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
      card2.number != card3.number)
  ) {
    hand.points = 10;
    hand.description = `Trío de ${card1.number}`;
  } else if (
    (card2.number == card3.number &&
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
      card1.number != card3.number)
  ) {
    hand.points = 10;
    hand.description = `Trío de ${card2.number}`;
  } else if (
    card3.number == card4.number &&
    card3.number == card5.number &&
    card3.number != card1.number &&
    card3.number != card2.number &&
    card1.number != card2.number
  ) {
    hand.points = 10;
    hand.description = `Trío de ${card3.number}`;
  }

  // For STAIR
  else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^A|[2-5]$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): A - 5`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: A - 5';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[2-6]$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure})`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 2 - 6';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[3-7]$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 3 - 7`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 3 - 7';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[4-8]$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 4 - 8`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 4 - 8';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[5-9]$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 5 - 9`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 5 - 9';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[6-9]|10$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 6 - 10`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 6 - 10';
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^[7-9]|10|J$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 7 - J`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = `Escalera: 7 - J`;
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^8|9|10|J|Q$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 8 - Q`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = `Escalera: 8 - Q`;
    }
  } else if (
    // NOTE: Checked ✅
    generatedObjCards.every(({ number }) => number.match(/^9|10|J|Q|K$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For COLOR STAIR
      hand.points = 75;
      hand.description = `Escalera de Color(${card1.figure}): 9 - K`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 9 - K';
    }
  } else if (
    generatedObjCards.every(({ number }) => number.match(/^10|J|Q|K|A$/)) &&
    allDifferentNumbers(generatedObjCards)
  ) {
    if (
      card1.figure === card2.figure &&
      card2.figure === card3.figure &&
      card3.figure === card4.figure &&
      card4.figure === card5.figure
    ) {
      // For REAL COLOR STAIR
      hand.points = 100;
      hand.description = `Escaler Real de Color (${card1.figure})`;
    } else {
      // For STAIR
      hand.points = 15;
      hand.description = 'Escalera: 10 - A';
    }
  }

  // For COLOR
  else if (
    card1.figure == card2.figure &&
    card2.figure == card3.figure &&
    card3.figure == card4.figure &&
    card4.figure == card5.figure
  ) {
    hand.points = 20;
    hand.description = `Color(${card1.figure})`;
  }

  // For FULL HOUSE
  else if (
    (card1.number == card2.number &&
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
      card1.number == card2.number)
  ) {
    hand.points = 25;
    hand.description = 'Full House';
  }

  // For POKER
  else if (
    (card1.number == card2.number &&
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
      card1.number != card2.number)
  ) {
    hand.points = 50;
    hand.description = `Póker de ${card1.number}`;
  } else if (
    card2.number == card3.number &&
    card2.number == card4.number &&
    card2.number == card5.number &&
    card2.number != card1.number
  ) {
    hand.points = 50;
    hand.description = `Póker de ${card2.number}`;
  }

  //For NOTHING
  else {
    hand.points = 0;
    hand.description = 'Nothing';
  }

  return hand;
}
