import { qs } from './utils/dom.js';

const $dialogOpenBtn = qs('.dialog-open-button');
const $dialogCloseBtn = qs('.dialog-rules__close');
const $body = document.body;

/** @type {HTMLDialogElement} */
const $dialogRules = qs('.dialog-rules');

const hideRules = () => {
  $dialogRules.close();
  $body.classList.remove('no-scroll');
  $dialogOpenBtn.classList.remove('hidden');
};

const showRules = () => {
  $dialogRules.showModal();
  $body.classList.add('no-scroll');
  $dialogOpenBtn.classList.add('hidden');
  $dialogCloseBtn.addEventListener('click', hideRules);
};

$dialogOpenBtn.addEventListener('click', showRules);
