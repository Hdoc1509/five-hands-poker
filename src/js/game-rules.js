/**

  TODO: apply changes of class names inside modal

 */

const dialogOpenBtn = document.getElementById('dialog-open-button'),
  dialogContainer = document.getElementById('dialog-game-rules'),
  dialogCloseButton = document.getElementById('dialog-close-button');

dialogOpenBtn.addEventListener('click', showRules);

function showRules() {
  dialogContainer.showModal();
  dialogOpenBtn.style.display = 'none';
  dialogCloseButton.addEventListener('click', hideRules);
}

function hideRules() {
  dialogContainer.close();
  dialogOpenBtn.style.display = 'inline-block';
}
