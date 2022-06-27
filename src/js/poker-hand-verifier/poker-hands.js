import {
  allDifferentNumbers,
  allSameSuit,
  numberMatches,
} from './global-checks.js';
import { isAnyPair, findPair } from './pair.js';
import { isAnyTwoPair, findTwoPair } from './two-pair.js';
import { isAnyThreeOfKind, findThreeOfKind } from './three-of-kind.js';
import { isAnyStraight, findStraight } from './straight.js';
import { isAnyFullHouse, findFullHouse } from './full-house.js';
import { isAnyFourOfKind, findFourOfKind } from './four-of-kind.js';

/**
 * Hand Object
 * @typedef  {Object}        ObjHand
 * @property {Array<String>} cards       - Hand's cards
 * @property {String}        description - Hand's description
 * @property {Number}        points      - Hand's points
 */

/**
 * Card Object
 * @typedef  {Object} ObjCard
 * @property {String} id      - Card's id
 * @property {String} number  - Card's number
 * @property {String} suit    - Card's suit
 */

/**
 * Verificate hand
 * @param {Array<ObjCard>} cards
 *
 * @returns {ObjHand} Returns hand information as an object
 */
export const verificateHand = (cards) => {
  if (cards.length !== 5)
    throw new Error('Array of cards must have 5 elements');

  const hand = {
    cards: cards.map(({ number, suit }) => `${number}${suit}`),
    description: '',
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
    const flushSuit = cards[0].suit;

    if (straightMatch === '10-A') {
      hand.points = allSameSuit(cards) ? 100 : 15;
      hand.description = allSameSuit(cards)
        ? `Royal Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    } else {
      hand.points = allSameSuit(cards) ? 75 : 15;
      hand.description = allSameSuit(cards)
        ? `Straight Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
    }
  }

  // For FLUSH
  else if (allSameSuit(cards) && allDifferentNumbers(cards)) {
    hand.points = 20;
    hand.description = `Flush (${cards[0].suit})`;
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
};
