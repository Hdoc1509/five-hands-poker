import { GAME_BUTTONS } from './game/game-buttons.js';
import { setPlayerHandsCounter } from './game/game-hands.js';
import { startGame } from './game/start-game.js';

GAME_BUTTONS.start.addEventListener('click', startGame, { once: true });
setPlayerHandsCounter(() => 1);
