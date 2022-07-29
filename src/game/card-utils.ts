type ParsedCard = {
  number: string;
  suit: string;
  card: string;
};

/** Parse data of string card */
export const parseCard = (card: string): ParsedCard => {
  const number = card.startsWith('10') ? card.slice(0, 2) : card.charAt(0);
  const suit = card.startsWith('10') ? card.charAt(2) : card.charAt(1);

  return { number, suit, card };
};

/** Toggles class "card--selected" */
export const toggleSelectedCard = (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.matches('.card > *'))
    target.parentElement?.classList.toggle('card--selected');

  if (target.matches('.card')) target.classList.toggle('card--selected');
};
