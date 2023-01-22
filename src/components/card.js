import {showGalleryPopup} from "./modal";
import {showPopup, closePopup} from "./utils";
import {initialCards} from "./data";
import {disableSubmitButton} from "./validate";
import {sendCardLikeRevokeToServer, sendCardLikeToServer, sendNewCardToServer} from "./api";

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
export function getCard(cardAddImageUrl, cardAddName, likesCounter, cardId, isLiked) {
  const cardElement = cardTemplate.cloneNode(true);
  const currentCard = cardElement.querySelector(".element");
  const cardName = cardElement.querySelector(".element__caption");
  const cardImage = cardElement.querySelector(".element__image");
  const cardLikeButton = cardElement.querySelector(".element__like-button");
  const cardRemoveButton = cardElement.querySelector(
    ".element__trash-bin-button"
  );
  const cardLikesCounter = cardElement.querySelector(".element__like-counter");
  currentCard.dataset.cardId = cardId;
  cardImage.src = cardAddImageUrl;
  cardImage.alt = cardAddName;
  cardName.textContent = cardAddName;
  cardLikesCounter.textContent = likesCounter;
  if (isLiked) {
    cardLikeButton.classList.add("element__like-button_active");
  }
  cardImage.addEventListener("click", showGalleryPopup);
  cardLikeButton.addEventListener("click", toggleLikeButton);
  cardRemoveButton.addEventListener("click", removeCard);
  return cardElement;
}


export function createCard(cardAddImageUrl, cardAddName, likesCounter, cardId, isLiked) {
  const cardElement = getCard(cardAddImageUrl, cardAddName, likesCounter, cardId, isLiked)
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
  sendNewCardToServer (cardAddCurrentName, cardAddCurrentImageUrl);
  evt.target.reset();
  closePopup(newCardAddPopup);
}

cardAddForm.addEventListener("submit", handleNewCardSubmission);


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
// TODO: Think on how this check can be improved,
//   because right now it relies on the name and if someone
//   has the same name, the cards would be shown as liked
export function checkIfLikedAlreadyByMe(likes, me) {
  return likes.some(item => item.name === me);
}

function toggleLikeButton(evt) {
  const currentCard = evt.target.closest(".element");
  const cardId = currentCard.dataset.cardId;
  console.log(evt.target.classList);
  if (evt.target.classList.contains("element__like-button_active")) {
    evt.target.classList.toggle("element__like-button_active");
    sendCardLikeRevokeToServer(evt, cardId);
  } else {
    evt.target.classList.toggle("element__like-button_active");
    sendCardLikeToServer(evt, cardId);
  }

}

export function updateLikesCounter(evt, likesNumber) {
  const currentCard = evt.target.closest(".element__like-wrapper");
  const currentCardLikesCounter = currentCard.querySelector(".element__like-counter");
  currentCardLikesCounter.textContent = likesNumber;
}
