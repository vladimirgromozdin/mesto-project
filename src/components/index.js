// Webpack Dependencies
import "../styles/index.css";
import {popupCloserControls} from "./modal";
import {enableValidation} from "./validate";
import {createCard} from "./card";

/* -------- Enable Form Validation -------- */
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});
