import {closePopup, showGalleryPopup, showPopup} from "./modal";
import {initialCards} from "./data";
import {toggleLikeButton} from "./utils";

/* -------- Global Constants -------- */
const cardList = document.querySelector(".elements__wrapper");
const cardAddForm = document.querySelector(".popup__form_card");
const cardAddImageUrlInput = document.querySelector("#place-image-link-input");
const cardAddNameInput = document.querySelector("#place-name-input");
const newCardAddButton = document.querySelector(".profile__add-new-button");
const newCardAddPopup = document.querySelector(".popup_content_new-card");
const newCardAddPopupCloseButton = document.querySelector(
  ".popup__close-button_content_new-card"
);

/* -------- Creating New Cards -------- */
export function createCard(cardAddImageUrl, cardAddName) {
  const cardTemplate = document.querySelector("#new-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardForm = document.querySelector(".popup__form_card");
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
  cardForm.reset();
}

function cardAddSubmitHandler(evt) {
  evt.preventDefault();
  const cardAddCurrentImageUrl = cardAddImageUrlInput.value;
  const cardAddCurrentName = cardAddNameInput.value;
  createCard(cardAddCurrentImageUrl, cardAddCurrentName);
  closePopup(newCardAddPopup);
}

cardAddForm.addEventListener("submit", cardAddSubmitHandler);

/* -------- Loading Initial Cars on The Page -------- */
initialCards.forEach(function (item) {
  let cardAddImageUrl = item.link;
  let cardAddName = item.name;
  createCard(cardAddImageUrl, cardAddName);
});

newCardAddButton.addEventListener("click", () => {
  showPopup(newCardAddPopup);
});

newCardAddPopupCloseButton.addEventListener("click", () => {
  closePopup(newCardAddPopup);
});

/* -------- Removing Cards -------- */
export function removeCard(evt) {
  evt.target.closest(".element").remove();
}
