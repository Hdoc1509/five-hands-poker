const STRAIGHT = Object.freeze({
  'A-5': /^A|[2-5]$/,
  '2-6': /^[2-6]$/,
  '3-7': /^[3-7]$/,
  '4-8': /^[4-8]$/,
  '5-9': /^[5-9]$/,
  '6-10': /^[6-9]|10$/,
  '7-J': /^[7-9]|10|J$/,
  '8-Q': /^8|9|10|J|Q$/,
  '9-K': /^9|10|J|Q|K$/,
  '10-A': /^10|J|Q|K|A$/,
});

/**
 * Check if all cards has different numbers
 * @param  {Array<ObjCard>} cards
 */
const allDifferentNumbers = (cards) => {
  const numbers = new Set(cards.map(({ number }) => number));

  return numbers.size === cards.length;
};

/**
 * Check if all cards has the same figure
 * @param  {Array<ObjCard>} cards
 */
const allSameFigure = (cards) => {
  const [{ figure: figureToCheck }] = cards;

  return cards.every(({ figure }) => figure === figureToCheck);
};

/**
 * Check if hand is an specific PAIR
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check pair
 */
const isPair = (cards, { number: numberToChcek }) => {
  const matches = cards.filter(({ number }) => number === numberToChcek);

  const restNumbers = cards.filter(({ number }) => number !== numberToChcek);

  return matches.length === 2 && allDifferentNumbers(restNumbers);
};

/**
 * Check if hand is an specific STRAIGHT
 * @param  {Array<ObjCard>} cards
 * @param  {string} straight
 */
const isStraight = (cards, straight) =>
  cards.every(({ number }) => number.match(STRAIGHT[straight])) &&
  allDifferentNumbers(cards);

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
 * @param {Array<ObjCard>} cards
 * @param {number} handsPlayerCounter
 * @returns {ObjHand} Returns hand information as an object
 */
function verificateHand(cards, handsPlayerCounter) {
  const [card1, card2, card3, card4, card5] = cards;

  const hand = {
    cards: cards.map(({ number, figure }) => `${number}${figure}`),
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

  // For TWO PAIR
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

  // For THREE OF A KIND
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

  // For STRAIGHT
  else if (isStraight(cards, 'A-5')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): A - 5`
      : 'Escalera: A - 5';
  } else if (isStraight(cards, '2-6')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 2 - 6`
      : 'Escalera: 2 - 6';
  } else if (isStraight(cards, '3-7')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 3 - 7`
      : 'Escalera: 3 - 7';
  } else if (isStraight(cards, '4-8')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 4 - 8`
      : 'Escalera: 4 - 8';
  } else if (isStraight(cards, '5-9')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 5 - 9`
      : 'Escalera: 5 - 9';
  } else if (isStraight(cards, '6-10')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 6 - 10`
      : 'Escalera: 6 - 10';
  } else if (isStraight(cards, '7-J')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 7 - J`
      : 'Escalera: 7 - J';
  } else if (isStraight(cards, '8-Q')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 8 - Q`
      : 'Escalera: 8 - Q';
  } else if (isStraight(cards, '9-K')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera de Color(${card1.figure}): 9 - K`
      : 'Escalera: 9 - K';
  } else if (isStraight(cards, '10-A')) {
    hand.points = allSameFigure(cards) ? 75 : 15;
    hand.description = allSameFigure(cards)
      ? `Escalera Real de Color(${card1.figure})`
      : 'Escalera: 10 - A';
  }

  // For FLUSH
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
