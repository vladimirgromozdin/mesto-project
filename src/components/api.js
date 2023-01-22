/* -------- Imports -------- */
import {checkIfLikedAlreadyByMe, checkOwner, createCard, displayLike, updateLikesCounter} from "./card";

/* -------- API Config -------- */
const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-18',
  headers: {
    authorization: 'f14db4e9-636d-4f4a-a139-30505d4235b0',
    'Content-Type': 'application/json'
  }
}

/* -------- Constants -------- */
const profileAvatar = document.querySelector(".profile__avatar");
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");

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
    .then(user => {
      profileUsername.textContent = user.name;
      profileStatus.textContent = user.about;
      profileAvatar.src = user.avatar;
    })
    .catch((err) => {
      console.log(err);
    });
}

/* -------- Load Initial Cards for Server -------- */
// TODO: Look into sorting the cards object so the most recent ones are shown on top of the page
export function loadInitialCards () {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При получении массива карточек сервер вернул: ${res.status}`);
    })
    .then(cards => {
      cards.forEach(function (card) {
        const cardAddImageUrl = card.link;
        const cardAddName = card.name;
        const likesCounter = card.likes.length;
        const cardId = card._id;
        const isOwned = checkOwner(card, profileUsername.textContent)
        const isLiked = checkIfLikedAlreadyByMe(card.likes, profileUsername.textContent);
        createCard(cardAddImageUrl, cardAddName, likesCounter, cardId, isOwned, isLiked);
    });
    })
    .catch((err) => {
      console.log(err);
    });
}

/* -------- Upload Profile Edits to Server -------- */
export function sendUserInfo (profileName, profileStatus) {
  return fetch (`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileStatus,
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`При отправке данных пользователя сервер вернул: ${res.status}`);
    })
}

/* -------- Upload New Card to Server -------- */
export function sendNewCardToServer (cardName, cardLink) {
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
}

/* -------- Remove Cards from Server -------- */
// TODO: Update the removeCard function to combine
//  both local and remote card removal (local then server)
export function removeCardFromServer(cardId) {
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
      console.log(newCard);
      updateLikesCounter(evt, newCard.likes.length)
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
      console.log(newCard);
      updateLikesCounter(evt, newCard.likes.length)
    })
}
