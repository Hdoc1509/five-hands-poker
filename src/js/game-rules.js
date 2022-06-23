const $dialogOpenBtn = document.querySelector('.dialog-open-button');
const $dialogCloseBtn = document.querySelector('.dialog-rules__close');

/** @type {HTMLDialogElement} */
const $dialogRules = document.querySelector('.dialog-rules');

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
