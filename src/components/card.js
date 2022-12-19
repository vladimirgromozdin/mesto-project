import {showGalleryPopup} from "./modal";

const cardAddNameInput = document.querySelector("#place-name");
const cardList = document.querySelector(".elements__wrapper");
const cardAddImageUrlInput = document.querySelector("#place-image-link");


// Create New Cards
export function createCard(cardAddImageUrl, cardAddName) {
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
export function toggleLikeButton(evt) {
  evt.target.classList.toggle("element__like-button_active");
}

//Remove Cards
export function removeCard(evt) {
  evt.target.closest(".element").remove();
}
