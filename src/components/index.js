// Webpack Dependencies
import "../styles/index.css";
import {initialCards} from "./data.js";
import {createCard} from "./card.js";
import {closePopup, showPopup} from "./modal.js";

/** Constants, Query Selectors & Event Listeners */
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const profileEditButton = document.querySelector(".profile__editname-button");
const profileEditPopup = document.querySelector(".popup_content_profile");
const profileEditPopupCloseButton = document.querySelector(
  ".popup__close-button_content_profile"
);
const newCardAddButton = document.querySelector(".profile__add-new-button");
const newCardAddPopup = document.querySelector(".popup_content_new-card");
const newCardAddPopupCloseButton = document.querySelector(
  ".popup__close-button_content_new-card"
);
const profileEditFormUsernameInput = document.querySelector("#username-input");
const profileEditFormStatusInput = document.querySelector("#status-input");
const profileFormElement = document.querySelector(".popup__form_profile");
const cardAddForm = document.querySelector(".popup__form_card");
const cardList = document.querySelector(".elements__wrapper");
const cardAddImageUrlInput = document.querySelector("#place-image-link-input");
const cardAddNameInput = document.querySelector("#place-name-input");

// Profile Edit Form Submissions
profileFormElement.addEventListener("submit", formProfileEditSubmitHandler);

// New Card Added Form Submissions
cardAddForm.addEventListener("submit", cardAddSubmitHandler);

// Profile Edit Interactions
profileEditButton.addEventListener("click", () => {
  profileEditFormUsernameInput.value = profileUsername.textContent;
  profileEditFormStatusInput.value = profileStatus.textContent;
  showPopup(profileEditPopup);
});

profileEditPopupCloseButton.addEventListener("click", () =>
  closePopup(profileEditPopup)
);

// New Card Addition Interactions
newCardAddButton.addEventListener("click", () => {
  showPopup(newCardAddPopup);
});

newCardAddPopupCloseButton.addEventListener("click", () => {
  closePopup(newCardAddPopup);
});


/** Functions */
// Create Initial Cards
initialCards.forEach(function (item) {
  let cardAddImageUrl = item.link;
  let cardAddName = item.name;
  createCard(cardAddImageUrl, cardAddName);
});

// Handle Profile Edit Form Submissions
function formProfileEditSubmitHandler(evt) {
  evt.preventDefault();
  profileUsername.textContent = profileEditFormUsernameInput.value;
  profileStatus.textContent = profileEditFormStatusInput.value;
  closePopup(profileEditPopup);
}

// Handle Card Add Submissions
function cardAddSubmitHandler(evt) {
  evt.preventDefault();
  const cardAddCurrentImageUrl = cardAddImageUrlInput.value;
  const cardAddCurrentName = cardAddNameInput.value;
  createCard(cardAddCurrentImageUrl, cardAddCurrentName);
  closePopup(newCardAddPopup);
}


// Валидируем формы на стороне JS

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.classList.add('popup__input-error_active');
  errorElement.textContent = errorMessage;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  // if pattern is mismatched, show custom error
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    // if input can't be validated, show default error message
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

// Checking of there are invalid inputs
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// Toggles submit button off if there is an invalid input
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__submit-button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__submit-button_inactive');
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit-button');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
// TODO: Pass enableValidation settings to the function as an object
// TODO: Fix the issue with profile form button not being active by default even when the name and description are there
enableValidation();
