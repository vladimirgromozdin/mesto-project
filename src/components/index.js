// Webpack Dependencies
import "../styles/index.css";
import {enableValidation} from "./validate";
import {closePopupOnClicksOutsideOfModal} from "./modal";
import {getUserInfo, loadInitialCards} from "./api";
import {checkIfLikedAlreadyByMe, checkOwner, createCard} from "./card";

/* -------- Constants -------- */
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const profileAvatar = document.querySelector(".profile__avatar");

/* -------- Let Page Content Get Ready -------- */
Promise.all([getUserInfo(), loadInitialCards()])
  .then(([user, cards]) => {
    profileUsername.textContent = user.name;
    profileStatus.textContent = user.about;
    profileAvatar.src = user.avatar;
    const myId = user._id;
    cards.forEach(function (card) {
      const cardAddImageUrl = card.link;
      const cardAddName = card.name;
      const likesCounter = card.likes.length;
      const cardId = card._id;
      const isOwned = checkOwner(card, myId)
      const isLiked = checkIfLikedAlreadyByMe(card.likes, user._id);
      createCard(isOwned, cardAddImageUrl, cardAddName, likesCounter, cardId, isLiked);
    });
  })
  .catch((err) => {
    console.log(err);
  });

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
