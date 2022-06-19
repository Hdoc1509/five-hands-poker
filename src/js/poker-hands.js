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
const isPair = (cards, { number: numberToCheck }) => {
  const matches = cards.filter(({ number }) => number === numberToCheck);

  const restNumbers = cards.filter(({ number }) => number !== numberToCheck);

  return matches.length === 2 && allDifferentNumbers(restNumbers);
};

/**
 * Check if hand is any possible PAIR
 * @param {Array<ObjCard>} cards
 */
const isAnyPair = (cards) => cards.some((card) => isPair(cards, card));

/**
 * Searchs for any possible PAIR and returns its card number
 * @param {Array<ObjCard>} cards
 */
const findPair = (cards) => cards.find((card) => isPair(cards, card));

/**
 * Check if hand is an specific TWO PAIR
 * @param {Array<ObjCard>} cards
 * @param {Array<ObjCard>} cardsToCheck - Cards to check its pairs
 */
const isTwoPair = (cards, [{ number: number1 }, { number: number2 }]) => {
  const number1Matches = cards.filter(({ number }) => number === number1);
  const number2Matches = cards.filter(({ number }) => number === number2);

  return (
    number1Matches.length === 2 &&
    number2Matches.length === 2 &&
    number1 !== number2
  );
};

/**
 * Check if hand is an specific STRAIGHT
 * @param {Array<ObjCard>} cards
 * @param {string}         straight - Straight to check
 */
const isStraight = (cards, straight) =>
  cards.every(({ number }) => number.match(STRAIGHT[straight])) &&
  allDifferentNumbers(cards);

/**
 * Check if hand is any possible STRAIGHT
 * @param  {Array<ObjCard>} cards
 */
const isAnyStraight = (cards) =>
  Object.keys(STRAIGHT).some((key) => isStraight(cards, key));

/**
 * Searchs for any possible STRAIGHT and returns it
 * @param  {Array<ObjCard>} cards
 * @return {string}         Straight found
 */
const findStraight = (cards) =>
  Object.keys(STRAIGHT).find((key) => isStraight(cards, key));

/**
 * Check if hand is an specific THREE OF A KIND
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check
 */
const isThreeOfKind = (cards, { number: numberToCheck }) => {
  const matches = cards.filter(({ number }) => number === numberToCheck);
  const restNumbers = cards.filter(({ number }) => number !== numberToCheck);

  return matches.length === 3 && allDifferentNumbers(restNumbers);
};

/**
 * Check if hand is an specific FULL HOUSE
 * @param {Array<ObjCard>} cards
 * @param {Array<ObjCard>} cardsToCheck - Cards for check full house
 */
const isFullHouse = (cards, [{ number: number1 }, { number: number2 }]) => {
  const number1Matches = cards.filter(({ number }) => number === number1);
  const number2Matches = cards.filter(({ number }) => number === number2);

  return (
    ((number1Matches.length === 3 && number2Matches.length === 2) ||
      (number1Matches.length === 2 && number2Matches.length === 3)) &&
    number1 !== number2
  );
};

/**
 * Check if hand is an specific FOUR OF A KIND
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check
 */
const isFourOfKind = (cards, { number: numberToCheck }) => {
  const matches = cards.filter(({ number }) => number === numberToCheck);

  return matches.length === 4;
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
 * @param {Array<ObjCard>} cards
 * @param {number} handsPlayerCounter
 * @returns {ObjHand} Returns hand information as an object
 */
function verificateHand(cards, handsPlayerCounter) {
  if (cards.length !== 5)
    throw new Error('Array of cards must have 5 elements');

  const [card1, card2, card3, card4, card5] = cards;

  const hand = {
    cards: cards.map(({ number, figure }) => `${number}${figure}`),
    description: '',
    id: `hand${handsPlayerCounter}`,
    points: 0,
  };

  // For PAIR

  if (isAnyPair(cards)) {
    const { number } = findPair(cards);

    hand.points = 2;
    hand.description = `Pair (${number})`;
  }

  // For TWO PAIR
  else if (isTwoPair(cards, [card1, card2])) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card2.number}`;
  } else if (isTwoPair(cards, [card1, card3])) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card3.number}`;
  } else if (isTwoPair(cards, [card1, card4])) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card1.number} y par de ${card4.number}`;
  } else if (isTwoPair(cards, [card2, card3])) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card2.number} y par de ${card3.number}`;
  } else if (isTwoPair(cards, [card2, card4])) {
    hand.points = 5;
    hand.description = `Doble par: par de ${card2.number} y par de ${card4.number}`;
  }

  // For THREE OF A KIND
  else if (isThreeOfKind(cards, card1)) {
    hand.points = 10;
    hand.description = `Trío de ${card1.number}`;
  } else if (isThreeOfKind(cards, card2)) {
    hand.points = 10;
    hand.description = `Trío de ${card2.number}`;
  } else if (isThreeOfKind(cards, card3)) {
    hand.points = 10;
    hand.description = `Trío de ${card3.number}`;
  }

  // For STRAIGHT
  else if (isAnyStraight(cards)) {
    const straightMatch = findStraight(cards);
    const parsedStraightMatch = straightMatch.replace('-', ' - ');

    if (straightMatch === '10-A') {
      hand.points = allSameFigure(cards) ? 100 : 15;
      hand.description = allSameFigure(cards)
        ? `Royal Flush (${card1.figure}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    } else {
      hand.points = allSameFigure(cards) ? 75 : 15;
      hand.description = allSameFigure(cards)
        ? `Straight Flush (${card1.figure}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    }
  }

  // For FLUSH
  else if (allSameFigure(cards)) {
    hand.points = 20;
    hand.description = `Flush (${card1.figure})`;
  }

  // For FULL HOUSE
  else if (
    isFullHouse(cards, [card1, card2]) ||
    isFullHouse(cards, [card1, card3]) ||
    isFullHouse(cards, [card1, card4])
  ) {
    hand.points = 25;
    hand.description = 'Full House';
  }

  // For FOUR OF A KIND
  else if (isFourOfKind(cards, card1)) {
    hand.points = 50;
    hand.description = `Póker de ${card1.number}`;
  } else if (isFourOfKind(cards, card2)) {
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
