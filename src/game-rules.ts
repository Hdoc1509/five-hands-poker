import { qs } from './utils/dom';

const $dialogOpenBtn = qs('.dialog-open-button') as HTMLButtonElement;
const $dialogCloseBtn = qs('.dialog-rules__close') as HTMLButtonElement;
const $body = document.body;

const $dialogRules = qs('.dialog-rules') as HTMLDialogElement;

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
