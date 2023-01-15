import {addPopupCloserControls} from "./modal";
import {removeEscapeClicks} from "./modal";

export function showPopup(item) {
  item.classList.add("popup_opened");
  addPopupCloserControls();
}

export function closePopup(item) {
  item.classList.remove("popup_opened");
  removeEscapeClicks();
}
