import { GAME_BUTTONS } from './game/game-buttons';
import { setPlayerHandsCounter } from './game/game-hands';
import { startGame } from './game/start-game';

GAME_BUTTONS.start.addEventListener('click', startGame, { once: true });
setPlayerHandsCounter(1);
