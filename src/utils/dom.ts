type ElementParent = Document | Element | DocumentFragment;

/**
 * Simplified name for document.getElementById()
 * @param id String that specifies the ID value.
 */
export const gid = (id: string) => document.getElementById(id);

/**
 * Simplified name for Element.querySelector()
 * @param selector A valid css selector
 * @param parent   Parent Node
 */
export const qs = (selector: string, parent: ElementParent = document) =>
  parent.querySelector(selector);

/**
 * Simplified name for Element.querySelectorAll()
 * @param selector A valid css selector
 * @param parent   Parent Node
 */
export const qsa = (selector: string, parent: ElementParent = document) =>
  Array.from(parent.querySelectorAll<HTMLElement>(selector));
