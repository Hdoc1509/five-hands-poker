import { gid } from '../utils/dom.js';

/**
 * @typedef  {Object}            GameButtons
 * @property {HTMLButtonElement} start
 * @property {HTMLButtonElement} change
 * @property {HTMLButtonElement} stay
 * @property {HTMLButtonElement} nextHand
 * @property {HTMLButtonElement} playAgain
 */

/**
 * Game buttons
 * @type {GameButtons}
 */
export const GAME_BUTTONS = Object.freeze({
  start: gid('start-button'),
  change: gid('change-button'),
  stay: gid('stay-button'),
  nextHand: gid('next-hand-button'),
  playAgain: gid('play-again-button'),
});
