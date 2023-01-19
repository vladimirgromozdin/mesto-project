import {showGalleryPopup} from "./modal";
import {showPopup, closePopup} from "./utils";
import {initialCards} from "./data";
import {disableSubmitButton} from "./validate";

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
const cardTemplate = document.querySelector("#new-card-template").content;

/* -------- Creating New Cards -------- */
export function getCard(cardAddImageUrl, cardAddName) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardName = cardElement.querySelector(".element__caption");
  const cardImage = cardElement.querySelector(".element__image");
  const cardLikeButton = cardElement.querySelector(".element__like-button");
  const cardRemoveButton = cardElement.querySelector(
    ".element__trash-bin-button"
  );
  cardImage.src = cardAddImageUrl;
  cardImage.alt = cardAddName;
  cardName.textContent = cardAddName;
  cardImage.addEventListener("click", showGalleryPopup);
  cardLikeButton.addEventListener("click", toggleLikeButton);
  cardRemoveButton.addEventListener("click", removeCard);
  return cardElement;
}


export function createCard(cardAddImageUrl, cardAddName) {
  const cardElement = getCard(cardAddImageUrl, cardAddName)
  cardList.prepend(cardElement);
}

function handleNewCardSubmission(evt) {
  evt.preventDefault();
  const cardAddCurrentImageUrl = cardAddImageUrlInput.value;
  const cardAddCurrentName = cardAddNameInput.value;
  createCard(cardAddCurrentImageUrl, cardAddCurrentName);
  disableSubmitButton(evt.submitter, {
    inactiveButtonClass: 'popup__submit-button_inactive',
    },)
  evt.target.reset();
  closePopup(newCardAddPopup);
}

cardAddForm.addEventListener("submit", handleNewCardSubmission);

/* -------- Loading Initial Cars on The Page -------- */
// initialCards.forEach(function (item) {
//   const cardAddImageUrl = item.link;
//   const cardAddName = item.name;
//   createCard(cardAddImageUrl, cardAddName);
// });

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

/* -------- Liking Cards -------- */
function toggleLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}
