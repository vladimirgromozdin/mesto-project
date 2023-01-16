// Webpack Dependencies
import "../styles/index.css";
import {enableValidation} from "./validate";
import {closePopupOnClicksOutsideOfModal} from "./modal";
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

closePopupOnClicksOutsideOfModal();
