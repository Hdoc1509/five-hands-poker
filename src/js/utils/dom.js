const d = document;

/**
 * Returns a reference to the first object with the specified value of the ID attribute.
 * @param  {String} id String that specifies the ID value.
 */
export const gid = (id) => d.getElementById(id);

/**
 * Returns the first element that is a descendant of node that matches selectors.
 * @param  {String} selector A valid css selector
 * @param  {Document|Element|DocumentFragment} parent   Parent Node
 */
export const qs = (selector, parent = d) => parent.querySelector(selector);

/**
 * Returns all element descendants of node that match selectors.
 * @param  {String} selector A valid css selector
 * @param  {Document|Element|DocumentFragment} parent   Parent Node
 */
export const qsa = (selector, parent = d) => [
  ...parent.querySelectorAll(selector),
];
