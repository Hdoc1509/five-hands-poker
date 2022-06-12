/**

  TODO: apply changes of class names inside modal

 */

const dialogOpenBtn = document.querySelector('.dialog-open-button');
const dialogRules = document.querySelector('.dialog-rules');
const dialogCloseBtn = document.querySelector('.dialog-rules__close');

dialogOpenBtn.addEventListener('click', showRules);

function showRules() {
  dialogRules.showModal();
  dialogOpenBtn.classList.add('hidden');
  dialogCloseBtn.addEventListener('click', hideRules);
}

function hideRules() {
  dialogRules.close();
  dialogOpenBtn.classList.remove('hidden');
}
