type ParsedCard = {
  number: string;
  suit: string;
};

/** Parse data of string card */
export const parseCard = (card: string): ParsedCard => {
  const isTen = card.startsWith('10');
  const number = isTen ? card.slice(0, 2) : card.charAt(0);
  const suit = isTen ? card.charAt(2) : card.charAt(1);

  return { number, suit };
};

/** Toggles class "card--selected" */
export const toggleSelectedCard = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.matches('.card > *'))
    target.parentElement?.classList.toggle('card--selected');

  if (target.matches('.card')) target.classList.toggle('card--selected');
};
