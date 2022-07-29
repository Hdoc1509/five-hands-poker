import { gid } from '../utils/dom';

export const GAME_BUTTONS = Object.freeze({
  start: gid('start-button') as HTMLButtonElement,
  change: gid('change-button') as HTMLButtonElement,
  stay: gid('stay-button') as HTMLButtonElement,
  nextHand: gid('next-hand-button') as HTMLButtonElement,
  playAgain: gid('play-again-button') as HTMLButtonElement,
});
