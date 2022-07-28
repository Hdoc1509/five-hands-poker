const suits = ['H', 'D', 'C', 'S'];
const numbers = [
  'A',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
];

const getRandomNumber = () =>
  numbers[Math.floor(Math.random() * numbers.length)];

const getRandomSuit = () => suits[Math.floor(Math.random() * suits.length)];

const getRandomCard = () => `${getRandomNumber()}${getRandomSuit()}`;

/**
 * Generates playing cards as an Array of strings
 * @param {number} [quantity] - Quantity of cards to generate
 *
 * @return {Array<string>} Array of cards
 */
export const generateCards = (quantity = 52) => {
  if (typeof quantity !== 'number')
    throw new TypeError('Expected a number as argument.');

  if (quantity > 52 || quantity < 1)
    throw new RangeError('Argument must be between 1 and 52.');

  /** @type {Set<string>} */
  const cards = new Set();

  const generateCard = () => {
    let card = getRandomCard();

    while (cards.has(card)) card = getRandomCard();

    return card;
  };

  for (let i = 0; i < quantity; i++) cards.add(generateCard());

  return Array.from(cards);
};
