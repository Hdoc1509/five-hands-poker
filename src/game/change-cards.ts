import {
  getRemainingCardsCounter,
  setRemainingCardsCounter,
} from "./remaining-cards";
import { renderCard, setCardData } from "./card-data";
import { GAME_BUTTONS } from "./game-buttons";
import { changeCardsQuantityError, noCardSelectedError } from "./errors";
import { toggleSelectedCard } from "./card-utils";
import { qsa } from "../utils/dom";
import { setObjCards } from "./game-cards";
import { hideElements } from "../utils/gui";

export const changeSelectedCards = () => {
  const $selectedCards = qsa(".card--selected");
  const quantity = $selectedCards.length;

  if (quantity > getRemainingCardsCounter()) changeCardsQuantityError();
  else if (quantity === 0) noCardSelectedError();
  else {
    // Changing cards
    for (let i = 0; i < quantity; i++) {
      const newCardId = $selectedCards[i].id;
      const newCardIndex = Number(newCardId.charAt(4)) - 1;
      const newCard = setCardData(newCardId);

      setObjCards((cards) =>
        cards.map((card, index) => (index === newCardIndex ? newCard : card))
      );
      renderCard(newCard);
    }

    setRemainingCardsCounter((value) => value - quantity);
  }

  $selectedCards.forEach(($card) => $card.classList.remove("card--selected"));

  if (getRemainingCardsCounter() === 0) {
    hideElements(GAME_BUTTONS.CHANGE);
    GAME_BUTTONS.CHANGE.removeEventListener("click", changeSelectedCards);

    // Listener for cards
    document.removeEventListener("click", toggleSelectedCard);
  }
};
