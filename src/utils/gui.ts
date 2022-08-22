export const hideElements = (...elements: Array<HTMLElement>) =>
  elements.forEach((element) => element.classList.add('hidden'));

export const showElements = (...elements: Array<HTMLElement>) =>
  elements.forEach((element) => element.classList.remove('hidden'));
