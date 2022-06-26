/**
 * Game buttons Component
 * @param {String}  id                    - Button's id
 * @param {Object}  options
 * @param {Boolean} [options.hidden=true] - Specify if is hidden when is mounted
 * @param {String}  [options.text='']     - Text content of the button
 *
 * @return {HTMLButtonElement} Buttom element
 */
export const Button = (idPrefix = '', { hidden = true, text = '' } = {}) => {
  const $btn = document.createElement('button');
  const classes = ['buttons__action-button'];

  if (hidden) classes.push('hidden');

  $btn.id = `${idPrefix}-button`;
  $btn.textContent = text;
  $btn.classList.add(...classes);

  return $btn;
};
