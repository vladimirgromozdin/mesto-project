// Webpack Dependencies
import '../styles/index.css';
import {initialCards} from './data.js';

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
const galleryPopup = document.querySelector(".popup_content_fullimage");
const galleryPopupCloseButton = document.querySelector(
  ".popup__close-button_content_fullimage"
);
const profileEditFormUsernameInput = document.querySelector("#username");
const profileEditFormStatusInput = document.querySelector("#status");
const profileFormElement = document.querySelector(".popup__form_profile");
const cardAddNameInput = document.querySelector("#place-name");
const cardAddImageUrlInput = document.querySelector("#place-image-link");
const cardAddForm = document.querySelector(".popup__form_card");
const cardList = document.querySelector(".elements__wrapper");

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

// Gallery View Interactions
galleryPopupCloseButton.addEventListener("click", () => {
  closePopup(galleryPopup);
});

/** Functions */
// Create Initial Cards
initialCards.forEach(function (item) {
  let cardAddImageUrl = item.link;
  let cardAddName = item.name;
  createCard(cardAddImageUrl, cardAddName);
});

// Show & Close Popup
function showPopup(item) {
  item.classList.add("popup_opened");
}

function closePopup(item) {
  item.classList.remove("popup_opened");
}

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
  let cardAddCurrentImageUrl = cardAddImageUrlInput.value;
  let cardAddCurrentName = cardAddNameInput.value;
  createCard(cardAddCurrentImageUrl, cardAddCurrentName);
  closePopup(newCardAddPopup);
}

// Create New Cards
function createCard(cardAddImageUrl, cardAddName) {
  const cardTemplate = document.querySelector("#new-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  let cardName = cardElement.querySelector(".element__caption");
  let cardImage = cardElement.querySelector(".element__image");
  let cardLikeButton = cardElement.querySelector(".element__like-button");
  let cardRemoveButton = cardElement.querySelector(
    ".element__trash-bin-button"
  );
  cardImage.src = cardAddImageUrl;
  cardImage.alt = cardAddName;
  cardName.textContent = cardAddName;
  cardImage.addEventListener("click", showGalleryPopup);
  cardLikeButton.addEventListener("click", toggleLikeButton);
  cardRemoveButton.addEventListener("click", removeCard);
  cardList.prepend(cardElement);
  cardAddNameInput.value = "";
  cardAddImageUrlInput.value = "";
}

// Toggle Like Buttons
function toggleLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

//Remove Cards
function removeCard(evt) {
  evt.target.closest(".element").remove();
}

// Show Full Image
function showGalleryPopup(evt) {
  let cardImageUrl = evt.target.src;
  const cardImageCaption = document.querySelector(".popup__caption");
  const cardFullscreenName = evt.target.alt;
  cardImageCaption.textContent = cardFullscreenName;
  const galleryPopupImage = document.querySelector(".popup__image");
  galleryPopupImage.src = cardImageUrl;
  galleryPopup.classList.add("popup_opened");
}
