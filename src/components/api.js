/* -------- Imports -------- */
import {checkIfLikedAlreadyByMe, checkOwner, createCard, revokeLikeFromCard} from "./card";
import {closePopup, renderLoading} from "./utils";
import {disableSubmitButton} from "./validate";
import {updateLikesCounter} from "./card";

/* -------- API Config -------- */
const config = {
  baseUrl: 'api.kolobkov.nomorepartiesco.ru',
  headers: {
    authorization: 'f14db4e9-636d-4f4a-a139-30505d4235b0',
    'Content-Type': 'application/json'
  }
}

/* -------- Constants -------- */
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const removalConfirmationPopup = document.querySelector(".popup_content_remove-card-confirmation");
const newCardAddPopup = document.querySelector(".popup_content_new-card");
const avatarUpdatePopup = document.querySelector(".popup_content_update-profile-image");
const profileAvatarIcon = document.querySelector(".profile__avatar");
const avatarLinkInput = document.querySelector('#avatar-image-link-input');
const profileEditPopup = document.querySelector(".popup_content_profile");
const profileEditFormUsernameInput = document.querySelector("#username-input");
const profileEditFormStatusInput = document.querySelector("#status-input");
const cardAddImageUrlInput = document.querySelector("#place-image-link-input");
const cardAddNameInput = document.querySelector("#place-name-input");
const saveButton = 'Сохранить';
const createButton = 'Создать'
const profileFormElement = document.forms['profileForm'];
const avatarFormElement = document.forms['newAvatarLink'];
const cardFormElement = document.forms['cardData'];

/* -------- Load Profile Info from Server -------- */
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При получении данных профиля сервер вернул: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}

/* -------- Load Initial Cards for Server -------- */
// TODO: Add Promise All
export function loadInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`При получении массива карточек сервер вернул: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}


/* -------- Upload Profile Edits to Server -------- */
export function sendUserInfoToServer (newName, newStatus) {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newStatus,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При отправке данных пользователя сервер вернул: ${res.status}`);
    })
    .then(() => {
      profileUsername.textContent = profileEditFormUsernameInput.value;
      profileStatus.textContent = profileEditFormStatusInput.value;
      closePopup(profileEditPopup)
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, profileFormElement, saveButton);
    })
}

/* -------- Upload New Avatar Link to Server -------- */
export function sendAvatarLinkToServer (link) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: link,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При отправке ссылки на новый аватар сервер вернул: ${res.status}`);
    })
    .then(() => {
      profileAvatarIcon.src = avatarLinkInput.value;
      closePopup(avatarUpdatePopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, avatarFormElement, saveButton);
    })
}

/* -------- Upload New Card to Server -------- */
export function sendNewCardToServer (cardName, cardLink, evt) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При отправке новой карточки сервер вернул: ${res.status}`);
    })
    .then((card) => {
      const cardAddCurrentImageUrl = card.link;
      const cardAddCurrentName = card.name;
      createCard(true, card.link, card.name, card.likes.length, card._id);
      disableSubmitButton(evt.submitter, {
        inactiveButtonClass: 'popup__submit-button_inactive',
      },)
      evt.target.reset();
      closePopup(newCardAddPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, cardFormElement, createButton);
    })
}

/* -------- Remove Cards from Server -------- */
export function removeCardFromServer(cardId, targetCard) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При удалении карточки ${cardId} сервер вернул: ${res.status}`);
    })
    .then(() => {
      targetCard.remove();
      closePopup(removalConfirmationPopup);
    })
    .catch((err) => {
      console.log(err);
    })
}

/* -------- Send Likes and Like Revokes to Server -------- */
export function sendCardLikeToServer (evt, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При отправке лайка карточке ${cardId}: ${res.status}`);
    })
    .then(newCard => {
      evt.target.classList.add("element__like-button_active");
      updateLikesCounter(evt, newCard.likes.length)
    })
    .catch((err) => {
      console.log(err);
    })
}

export function sendCardLikeRevokeToServer (evt, cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Пока снимали лайкк карточке ${cardId} сервер вернул ошибку: ${res.status}`);
    })
    .then(newCard => {
      evt.target.classList.remove("element__like-button_active");
      updateLikesCounter(evt, newCard.likes.length);
    })
    .catch((err) => {
      console.log(err);
    })
}
