/** Central figure of each card */
const $cardsCentralSuit = document.querySelectorAll('.card__figure');

/** Card containers */
const $tableCards = document.querySelectorAll('.card');

const GAME_BUTTONS = Object.freeze({
  start: document.getElementById('start-button'),
  change: document.getElementById('change-button'),
  stay: document.getElementById('stay-button'),
  nextHand: document.getElementById('next-hand-button'),
  playAgain: document.getElementById('play-again-button'),
});

const figures = ['♥', '♦', '♣', '♠'];
const numbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, '10', 'J', 'Q', 'K'];

/** @type {number} Counter of remaining cards */
let remainingCardsCounter = null;

/** @type {number} Counter of hands player */
let playerHandsCounter = null;

/**
 * Sets new value for counter of remaining cards
 * @param  {Function} callback Callback for update counter of remaining cards
 *
 * @example
 * // Increments the value in 1
 * setRemainingCards((value) => value + 1);
 * @example
 * // Decrements the value in value of myNum
 * const myNum = 2;
 * setRemainingCards((value) => value - myNum);
 * @example
 * // Sets the value to 3
 * setRemainingCards((value) => 3);
 */
const setRemainingCards = (callback) => {
  remainingCardsCounter = callback(remainingCardsCounter);
};

/**
 * Gets the current value of counter of remaining cards
 * @return {number} Current value of counter of remaining cards
 */
const getRemainingCards = () => remainingCardsCounter;

/********/
/**
 * Sets new value for counter of player hands
 * @param  {Function} callback Callback for update counter of player hands
 *
 * @example
 * // Increments the value in 1
 * setRemainingCards((value) => value + 1);
 * @example
 * // Decrements the value in value of myNum
 * const myNum = 2;
 * setRemainingCards((value) => value - myNum);
 * @example
 * // Sets the value to 3
 * setRemainingCards(() => 3);
 */
const setPlayerHands = (callback) => {
  playerHandsCounter = callback(playerHandsCounter);
};

/**
 * Gets the current value of counter of player hands
 * @return {number} Current value of counter of remaining cards
 */
const getPlayerHands = () => playerHandsCounter;

/**
 * @type {Array<String>}
 */
const gameCards = [];

/**
 * Card Object
 * @typedef  {Object} ObjCard
 * @property {String} id
 * @property {String} number
 * @property {String} figure
 */

/**
 * Array of cards for each hand
 * @type {Array<ObjCard>}
 */
const generatedObjCards = [];

/**
 * @param {Array} array
 */
const cleanArray = (array) => array.splice(0, array.length);

/**
 * @param {string} card - Card to remove
 */
function removeCard(card) {
  const cardPosition = gameCards.indexOf(card);
  gameCards.splice(cardPosition, 1);
}

const getRandomCard = () =>
  gameCards[Math.floor(Math.random() * gameCards.length)];

/**
 * Parsed Card
 * @typedef  {Object} ParsedCard
 * @property {string} number
 * @property {string} figure
 * @property {string} card
 */

/**
 * Parse data of string card
 * @param {string} card
 *
 * @return {ParsedCard}
 */
const parseCard = (card) => {
  const number = card.startsWith('10') ? card.slice(0, 2) : card.charAt(0);
  const figure = card.startsWith('10') ? card.charAt(2) : card.charAt(1);

  return { number, figure, card };
};

/**
 * Set the info of each card
 * @param {String}  cardId     - Card's Id
 * @param {Boolean} isToChange - Especify if the card must be changed
 *
 * @returns {ObjCard} Returns the card as an object
 */
function setCardNumAndFig(cardId, isToChange) {
  const { number, figure, card } = parseCard(getRandomCard());
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardObj = {
    id: cardId,
    number,
    figure,
    cardInfo: `${number}\n${figure}`,
  };

  isToChange
    ? (generatedObjCards[cardIndex] = cardObj)
    : generatedObjCards.push(cardObj);

  $tableCards[cardIndex].style.color = figure.match(/^♥|♦$/) ? '#f00' : '#000';

  $cardsCentralSuit[cardIndex].textContent = figure;
  removeCard(card);

  return cardObj;
}

/**
 * Toggles class "card--selected"
 * @param  {Event}       options
 * @param  {EventTarget} options.target
 */
const toggleSelectedCard = ({ target }) => {
  if (target.matches('.card > *'))
    target.parentNode.classList.toggle('card--selected');
};

/** Remove class "section__current-hand" */
function clearCurrentHandClass() {
  const $currentHand = document.querySelector(
    'p.points-details__hand--current'
  );

  $currentHand?.classList.remove('points-details__hand--current');
}

// Generating all game cards
((gameCards) => {
  const getRandomNumber = () =>
    numbers[Math.floor(Math.random() * numbers.length)];

  const getRandomFigure = () =>
    figures[Math.floor(Math.random() * figures.length)];

  const generateRandomCard = () => {
    let card = `${getRandomNumber()}${getRandomFigure()}`;

    /** Validation for get unique cards */
    while (gameCards.includes(card))
      card = `${getRandomNumber()}${getRandomFigure()}`;

    return card;
  };

  // Generating all cards
  for (let i = 0; i < 52; i++) gameCards.push(generateRandomCard());
})(gameCards);
