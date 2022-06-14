/** Number and figure in the corners of each card */
const cardsInfo = document.querySelectorAll('.card__info');

/** Central figure of each card */
const cardDisplay = document.querySelectorAll('.card__figure');

/** Card containers */
const cardsToChange = document.querySelectorAll('.card');

const remainingCardsContainer = document.getElementById(
  'remaining-cards-container'
);

const figures = ['♥', '♦', '♣', '♠'];

const numbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, '10', 'J', 'Q', 'K'];

/**
 * Array for unique generated cards
 * @type {Array<String>}
 */
const generatedCards = [];

/**
 * Card Object
 * @typedef {Object} ObjCard
 * @property {String} id Card's id
 * @property {String | Number} number Card's number
 * @property {String} figure Card's figure
 */

/**
 * Array of cards for each hand
 * @type {Array<ObjCard>}
 */
const generatedObjCards = [];

const playerHands = [];

// Generating all cards
for (let i = 0; i < 52; i++) generatedCards.push(generateRandomCard());

/**
 * Get a random element from an array
 * @param {Array} array Array from get an element
 * @returns {Number | String | Array | Object} Element
 */
function arrayRandElement(array) {
  if (Array.isArray(array)) {
    let index = Math.floor(Math.random() * array.length);
    let randElement = array[index];
    return randElement;
  } else {
    console.error(
      "Uncaught TypeError: especting an 'array' parameter on 'arrayRandElement'"
    );
  }
}

/**
 * Clean all elements of an array
 * @param {Array} array
 */
function cleanArray(array) {
  array.splice(0, array.length);
}

/**
 * @param  {string} card Card to remove
 */
function removeCard(card) {
  const cardPosition = generatedCards.indexOf(card);
  generatedCards.splice(cardPosition, 1);
}

/**
 * Generate random unique cards
 * @returns {String}
 */
function generateRandomCard() {
  let number = arrayRandElement(numbers),
    figure = arrayRandElement(figures);
  let card = `${number}${figure}`;

  /** Validation for get unique cards */
  while (generatedCards.includes(card)) {
    number = arrayRandElement(numbers);
    figure = arrayRandElement(figures);
    card = `${number}${figure}`;
  }

  return card;
}

const getRandomCard = () =>
  generatedCards[Math.floor(Math.random() * generatedCards.length)];

/**
 * Parse data of string card
 * @param  {string} card
 * @return {{number: string|number, figure: string, rawCard: string}}
 */
const parseCard = (card) => {
  let figure = '';
  let number = null;

  if (card.startsWith('10')) {
    number = Number(card.slice(0, 2));
    figure = card.charAt(2);
  } else if (card.match(/^J|Q|K|A/) !== null) {
    number = card.charAt(0);
    figure = card.charAt(1);
  } else {
    number = Number(card.charAt(0));
    figure = card.charAt(1);
  }

  return { number, figure, rawCard: card };
};

/**
 * Set the info of each card
 * @param {String} cardId Card's Id
 * @param {Boolean} isToChange Especify if the card must be changed
 * @returns {ObjCard} Returns the card as an object
 */
function setCardNumAndFig(cardId, isToChange) {
  const { number, figure, rawCard: card } = parseCard(getRandomCard());
  const cardIndex = Number(cardId.charAt(4)) - 1;
  const cardObj = {
    id: cardId,
    number,
    figure,
    cardInfo: `${number}\n${figure}`,
  };

  isToChange
    ? (generatedObjCards[Number(cardId.slice(-1)) - 1] = cardObj)
    : generatedObjCards.push(cardObj);

  cardsToChange[cardIndex].style.color = figure.match(/^♥|♦$/)
    ? '#f00'
    : '#000';
  cardDisplay[cardIndex].textContent = figure;
  removeCard(card);

  return cardObj;
}

/** Toggles class "card--selected" */
function toggleClassSelectedCard() {
  this.classList.toggle('card--selected');
}

/** Remove class "section__current-hand" */
function clearCurrentHandClass() {
  const currentHand = document.querySelector('p.points-details__hand--current');

  currentHand?.classList.remove('points-details__hand--current');
}
