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
const profileEditFormUsernameInput = document.querySelector("#username");
const profileEditFormStatusInput = document.querySelector("#status");
const profileFormElement = document.querySelector(".popup__form_profile");
const cardAddForm = document.querySelector(".popup__form_card");
const cardList = document.querySelector(".elements__wrapper");
const cardAddImageUrlInput = document.querySelector("#place-image-link");
const cardAddNameInput = document.querySelector("#place-name");

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


