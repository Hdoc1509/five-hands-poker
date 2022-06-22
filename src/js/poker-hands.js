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
 * Number matches
 * @typedef  {Object}         NumberMatches
 * @property {Array<ObjCard>} matches
 * @property {Array<ObjCard>} notMatches
 */

/**
 * Returns matches and not maches of a given card number
 * @param {Array<ObjCard>} cards
 * @param {number}         numberToCheck
 *
 * @returns {NumberMatches} Matches and not matches
 */
const numberMatches = (cards, numberToCheck) => ({
  matches: cards.filter(({ number }) => number === numberToCheck),
  notMatches: cards.filter(({ number }) => number !== numberToCheck),
});

/**
 * Check if hand is an specific PAIR
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check pair
 */
const isPair = (cards, { number }) => {
  const { matches, notMatches: restNumbers } = numberMatches(cards, number);

  return (
    matches.length === 2 &&
    allDifferentNumbers(restNumbers) &&
    !allSameFigure(matches)
  );
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
 * Retrieves all pairs in the hand
 * @param {Array<ObjCard>} cards
 *
 * @return {Set<string>} Unique numbers that have a pair
 */
const getPairs = (cards) => {
  const aux = cards
    .filter(({ number }) => {
      const { matches } = numberMatches(cards, number);

      return matches.length === 2 && !allSameFigure(matches);
    })
    .map(({ number }) => number);

  return new Set(aux);
};

/**
 * Check if hand is any possible TWO PAIR
 * @param {Array<ObjCard>} cards
 */
const isAnyTwoPair = (cards) => {
  const pairs = getPairs(cards);

  return pairs.size === 2;
};

/**
 * Searchs for any possible TWO PAIR and returns its card numbers
 * @param {Array<ObjCard>} cards
 *
 * @return {Array<string>} Numbers that have a pair
 */
const findTwoPair = (cards) => Array.from(getPairs(cards));

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
const isThreeOfKind = (cards, { number }) => {
  const { matches, notMatches: restNumbers } = numberMatches(cards, number);

  return matches.length === 3 && allDifferentNumbers(restNumbers);
};

/**
 * Check if hand is any possible THREE OF KIND
 * @param {Array<ObjCard>} cards
 */
const isAnyThreeOfKind = (cards) =>
  cards.some((card) => isThreeOfKind(cards, card));

/**
 * Searchs for any possible THREE OF KIND and returns its card
 * @param {Array<ObjCard>} cards
 */
const findThreeOfKind = (cards) =>
  cards.find((card) => isThreeOfKind(cards, card));

/**
 * Retrieves the number that compose the THREE OF A KIND in the hand
 * @param {Array<ObjCard>} cards
 */
const getThreeOfKind = (cards) => {
  const aux = cards
    .filter(({ number }) => {
      const { matches } = numberMatches(cards, number);

      return matches.length === 3 && !allSameFigure(matches);
    })
    .map(({ number }) => number);

  return new Set(aux);
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
 * Check if hand is any possible FULL HOUSE
 * @param {Array<ObjCard>} cards
 */
const isAnyFullHouse = (cards) => {
  const pairs = getPairs(cards);
  const threeOfKind = getThreeOfKind(cards);

  return pairs.size === 1 && threeOfKind.size === 1;
};

/**
 * Full House data
 * @typedef {Object} FullHouseData
 * @property {string} pair
 * @property {string} threeOfKind
 */

/**
 * Retrieves the numbers that compose the FULL HOUSE in the hand
 * @param {Array<ObjCard>} cards
 *
 * @return {FullHouseData}
 */
const findFullHouse = (cards) => {
  const [pair] = Array.from(getPairs(cards));
  const [threeOfKind] = Array.from(getThreeOfKind(cards));

  return { pair, threeOfKind };
};

/**
 * Check if hand is an specific FOUR OF A KIND
 * @param {Array<ObjCard>} cards
 * @param {ObjCard}        card        - Card with specific number
 * @param {number}         card.number - Number to check
 */
const isFourOfKind = (cards, { number }) => {
  const { matches } = numberMatches(cards, number);

  return matches.length === 4;
};

/**
 * Check if hand is any possible FOUR OF A KIND
 * @param {Array<ObjCard>} cards
 */
const isAnyFourOfKind = (cards) =>
  cards.some((card) => isFourOfKind(cards, card));

/**
 * Searchs for any possible FOUR OF A KIND and returns its card
 * @param {Array<ObjCard>} cards
 */
const findFourOfKind = (cards) =>
  cards.find((card) => isFourOfKind(cards, card));

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

  const [card1, card2, card3, card4] = cards;

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
  else if (isAnyTwoPair(cards)) {
    const [pair1, pair2] = findTwoPair(cards);

    hand.points = 5;
    hand.description = `Two Pair: (${pair1} & ${pair2})`;
  }

  // For THREE OF A KIND
  else if (isAnyThreeOfKind(cards)) {
    const { number } = findThreeOfKind(cards);

    hand.points = 10;
    hand.description = `Three of a kind (${number})`;
  }

  // For STRAIGHT
  else if (isAnyStraight(cards)) {
    const straightMatch = findStraight(cards);
    const parsedStraightMatch = straightMatch.replace('-', ' - ');
    const flushSuit = cards[0].figure;

    if (straightMatch === '10-A') {
      hand.points = allSameFigure(cards) ? 100 : 15;
      hand.description = allSameFigure(cards)
        ? `Royal Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    } else {
      hand.points = allSameFigure(cards) ? 75 : 15;
      hand.description = allSameFigure(cards)
        ? `Straight Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    }
  }

  // For FLUSH
  else if (allSameFigure(cards)) {
    hand.points = 20;
    hand.description = `Flush (${cards[0].figure})`;
  }

  // For FULL HOUSE
  else if (isAnyFullHouse(cards)) {
    const { pair, threeOfKind } = findFullHouse(cards);

    hand.points = 25;
    hand.description = `Full House (Pair - ${pair} & Three of Kind - ${threeOfKind})`;
  }

  // For FOUR OF A KIND
  else if (isAnyFourOfKind(cards)) {
    const { number } = findFourOfKind(cards);

    hand.points = 50;
    hand.description = `Four of a kind (${number})`;
  }

  //For HIGH CARD
  else {
    const { matches: aces } = numberMatches(cards, 'A');
    const thereOneAce = aces.length === 1;

    hand.points = thereOneAce ? 1 : 0;
    hand.description = thereOneAce ? 'High Card (A)' : 'Nothing';
  }

  return hand;
}
