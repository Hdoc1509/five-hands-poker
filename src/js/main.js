/** Number and figure in the corners of each card */
const cardsInfo = document.querySelectorAll('.card__info');

/** Central figure of each card */
const cardDisplay = document.querySelectorAll('.card__figure');

/** Card containers */
const cardsToChange = document.querySelectorAll('.card');

const figures = ['♥', '♦', '♣', '♠'];

const numbers = ['A', 2, 3, 4, 5, 6, 7, 8, 9, '10', 'J', 'Q', 'K'];

/**
 * @type {Array<String>}
 */
const gameCards = [];

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

/**
 * @param {Array} array
 */
const cleanArray = (array) => array.splice(0, array.length);

/**
 * @param  {string} card Card to remove
 */
function removeCard(card) {
  const cardPosition = gameCards.indexOf(card);
  gameCards.splice(cardPosition, 1);
}

const getRandomCard = () =>
  gameCards[Math.floor(Math.random() * gameCards.length)];

/**
 * Parse data of string card
 * @param  {string} card
 * @return {{number: string, figure: string, rawCard: string}}
 */
const parseCard = (card) => {
  const number = card.startsWith('10') ? card.slice(0, 2) : card.charAt(0);
  const figure = card.startsWith('10') ? card.charAt(2) : card.charAt(1);

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
  const currentHand = document.querySelector('p.points-details__hand--current');

  currentHand?.classList.remove('points-details__hand--current');
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
