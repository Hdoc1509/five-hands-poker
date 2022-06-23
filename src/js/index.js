import { GAME_BUTTONS } from './game-buttons.js';
import { setPlayerHandsCounter } from './game-hands.js';
import { startGame } from './start-game.js';

GAME_BUTTONS.start.addEventListener('click', startGame);
setPlayerHandsCounter(() => 1);
