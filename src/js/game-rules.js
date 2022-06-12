/**

  TODO: apply changes of class names inside modal

 */

const dialogOpenBtn = document.querySelector('.dialog-open-button'),
  dialogContainer = document.querySelector('.dialog-rules'),
  dialogCloseButton = document.querySelector('.dialog-rules__close');

dialogOpenBtn.addEventListener('click', showRules);

function showRules() {
  dialogContainer.showModal();
  dialogOpenBtn.classList.add('hidden');
  dialogCloseButton.addEventListener('click', hideRules);
}

function hideRules() {
  dialogContainer.close();
  dialogOpenBtn.classList.remove('hidden');
}
