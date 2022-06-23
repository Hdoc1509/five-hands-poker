import { qs } from './utils/dom.js';

const $dialogOpenBtn = qs('.dialog-open-button');
const $dialogCloseBtn = qs('.dialog-rules__close');

/** @type {HTMLDialogElement} */
const $dialogRules = qs('.dialog-rules');

const hideRules = () => {
  $dialogRules.close();
  $dialogOpenBtn.classList.remove('hidden');
};

const showRules = () => {
  $dialogRules.showModal();
  $dialogOpenBtn.classList.add('hidden');
  $dialogCloseBtn.addEventListener('click', hideRules);
};

$dialogOpenBtn.addEventListener('click', showRules);
