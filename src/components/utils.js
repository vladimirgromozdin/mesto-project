import {removeEscapeListener} from "./modal";
import {addPopupCloserControls} from "./modal";

const removalConfirmationPopup = document.querySelector(".popup_content_remove-card-confirmation");

export function showPopup(item, cardId) {
  item.classList.add("popup_opened");
  addPopupCloserControls();
  const removalConfirmationPopupOpen = removalConfirmationPopup.className.includes("popup_opened");
  if (removalConfirmationPopupOpen) {
    assignCardIdToRemovalConfirmationPopup(cardId);
  }
}

export function assignCardIdToRemovalConfirmationPopup(cardId) {
  removalConfirmationPopup.dataset.id = cardId;
}

export function closePopup(item) {
  item.classList.remove("popup_opened");
  removeEscapeListener();
}
