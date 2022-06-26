import { qs } from './utils/dom.js';
import { Button } from './components/Button.js';

const $fragment = document.createDocumentFragment();

(() => {
  console.log('Loading components');

  // Loading buttons
  const $buttonsContainer = qs('section.buttons');

  $fragment.appendChild(Button('start', { hidden: false, text: 'start' }));
  $fragment.appendChild(Button('change', { text: 'change' }));
  $fragment.appendChild(Button('stay', { text: 'stay' }));
  $fragment.appendChild(Button('next-hand', { text: 'next hand' }));
  $fragment.appendChild(Button('play-again', { text: 'play again' }));
  $buttonsContainer.appendChild($fragment);
})();
