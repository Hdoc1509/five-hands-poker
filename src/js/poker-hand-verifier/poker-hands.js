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
 * @property {String}        type        - Type of hand
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
    type: '',
  };

  // For PAIR
  if (isAnyPair(cards)) {
    const { number } = findPair(cards);

    hand.description = `Pair (${number})`;
    hand.type = 'pair';
  }

  // For TWO PAIR
  else if (isAnyTwoPair(cards)) {
    const [pair1, pair2] = findTwoPair(cards);

    hand.description = `Two Pair: (${pair1} & ${pair2})`;
    hand.type = 'two-pair';
  }

  // For THREE OF A KIND
  else if (isAnyThreeOfKind(cards)) {
    const { number } = findThreeOfKind(cards);

    hand.description = `Three of a kind (${number})`;
    hand.type = 'three-of-kind';
  }

  // For STRAIGHT
  else if (isAnyStraight(cards)) {
    const straightMatch = findStraight(cards);
    const parsedStraightMatch = straightMatch.replace('-', ' - ');
    const flushSuit = cards[0].suit;

    if (straightMatch === '10-A') {
      hand.description = allSameSuit(cards)
        ? `Royal Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
      hand.type = allSameSuit(cards) ? 'royal-flush' : 'straight';
    } else {
      hand.description = allSameSuit(cards)
        ? `Straight Flush (${flushSuit}): ${parsedStraightMatch}`
        : `Straight: ${parsedStraightMatch}`;
      hand.type = allSameSuit(cards) ? 'straight-flush' : 'straight';
    }
  }

  // For FLUSH
  else if (allSameSuit(cards) && allDifferentNumbers(cards)) {
    hand.description = `Flush (${cards[0].suit})`;
    hand.type = 'flush';
  }

  // For FULL HOUSE
  else if (isAnyFullHouse(cards)) {
    const { pair, threeOfKind } = findFullHouse(cards);

    hand.description = `Full House (Pair - ${pair} & Three of Kind - ${threeOfKind})`;
    hand.type = 'full-house';
  }

  // For FOUR OF A KIND
  else if (isAnyFourOfKind(cards)) {
    const { number } = findFourOfKind(cards);

    hand.description = `Four of a kind (${number})`;
    hand.type = 'four-of-kind';
  }

  //For HIGH CARD
  else {
    const { matches: aces } = numberMatches(cards, 'A');
    const thereOneAce = aces.length === 1;

    hand.description = thereOneAce ? 'High Card (A)' : 'Nothing';
    hand.type = thereOneAce ? 'high-card' : 'nothing';
  }

  return hand;
};
