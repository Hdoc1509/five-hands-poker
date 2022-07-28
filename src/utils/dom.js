const d = document;

/**
 * Simplified name for document.getElementById()
 * @param  {String} id String that specifies the ID value.
 */
export const gid = (id) => d.getElementById(id);

/**
 * Simplified name for Element.querySelector()
 * @param  {String} selector A valid css selector
 * @param  {Document|Element|DocumentFragment} parent   Parent Node
 */
export const qs = (selector, parent = d) => parent.querySelector(selector);

/**
 * Simplified name for Element.querySelectorAll()
 * @param  {String} selector A valid css selector
 * @param  {Document|Element|DocumentFragment} parent   Parent Node
 */
export const qsa = (selector, parent = d) => [
  ...parent.querySelectorAll(selector),
];
