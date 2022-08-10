import { gid } from '../utils/dom';

export const GAME_BUTTONS = Object.freeze({
  START: gid('start-button') as HTMLButtonElement,
  CHANGE: gid('change-button') as HTMLButtonElement,
  STAY: gid('stay-button') as HTMLButtonElement,
  NEXT_HAND: gid('next-hand-button') as HTMLButtonElement,
  PLAY_AGAIN: gid('play-again-button') as HTMLButtonElement,
});
