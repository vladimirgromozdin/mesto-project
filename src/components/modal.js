import {showPopup, closePopup, renderLoading} from "./utils.js";
import {sendUserInfo, removeCardFromServer, sendAvatarLinkToServer, sendUserInfoToServer} from "./api";


/* -------- Global Constants -------- */
const popups= document.querySelectorAll(".popup");
const galleryPopupCloseButton = document.querySelector(
  ".popup__close-button_content_fullimage"
);
const galleryPopup = document.querySelector(".popup_content_fullimage");
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const profileEditButton = document.querySelector(".profile__editname-button");
const profileEditPopup = document.querySelector(".popup_content_profile");
const profileEditPopupCloseButton = document.querySelector(
  ".popup__close-button_content_profile"
);
const removalConfirmationPopup = document.querySelector('.popup__container_modal_confirmation')
const removalPopupContent = document.querySelector('.popup_content_remove-card-confirmation');
const removalConfirmationPopupCloseButton = removalConfirmationPopup.querySelector('.popup__close-button');
const removalConfirmationYesButton = document.querySelector('.popup__confirmation-button');
const profileEditFormUsernameInput = document.querySelector("#username-input");
const profileEditFormStatusInput = document.querySelector("#status-input");
const profileAvatarWrapper = document.querySelector('.profile__avatar-wrapper');
const cardImageCaption = document.querySelector(".popup__caption");
const galleryPopupImage = document.querySelector(".popup__image");
const avatarUpdatePopup = document.querySelector(".popup_content_update-profile-image");
const avatarUpdatePopupCloseButton = document.querySelector('.popup__close-button_content_profile-image');
const avatarLinkInput = document.querySelector('#avatar-image-link-input');
const saveButton = 'Сохранить';
const createButton = 'Создать'
const profileFormElement = document.forms['profileForm'];
const avatarFormElement = document.forms['newAvatarLink'];
const cardFormElement = document.forms['cardData'];

/* -------- Show Removal Confirmation Popup -------- */
removalConfirmationPopupCloseButton.addEventListener('click', () => {
  const openedPopup = document.querySelector(".popup_opened");
  closePopup(openedPopup);
});

/* -------- Add Listener to the Removal Confirmation Button -------- */
removalConfirmationYesButton.addEventListener("click", () => {
  const cardId = removalPopupContent.closest('.popup_content_remove-card-confirmation').dataset.id;
  const targetCard = document.querySelector(`[data-card-id="${cardId}"]`);
  removeCardFromServer(cardId, targetCard)
})

/* -------- Add Listener to Avatar Icon -------- */
profileAvatarWrapper.addEventListener('click', () => showPopup(avatarUpdatePopup))

/* -------- Show Gallery Image Popup -------- */
export function showGalleryPopup(evt) {
  const cardImageUrl = evt.target.src;
  cardImageCaption.textContent = evt.target.alt;
  galleryPopupImage.src = cardImageUrl;
  galleryPopupImage.alt = evt.target.alt;
  showPopup(galleryPopup);
}
galleryPopupCloseButton.addEventListener("click", () => {
  closePopup(galleryPopup);
});

/* -------- Show and Close Popup -------- */


function trackClicksOnOverlay(event) {
  if (!event.target.closest(".popup__container")) {
    closePopup(event.target);
  }
}

export function closePopupOnClicksOutsideOfModal() {
  popups.forEach((item) => {
    item.addEventListener("mousedown", trackClicksOnOverlay);
  })}

function setEscapeListener() {
  document.addEventListener("keydown", trackEscapeClicks);
}

function trackEscapeClicks(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null) {
    closePopup(openedPopup);
  }
}
}

export function removeEscapeListener () {
  document.removeEventListener("keydown", trackEscapeClicks);
}


export function addPopupCloserControls() {
  setEscapeListener()
}


/* -------- Profile Edit Form -------- */
profileEditButton.addEventListener("click", () => {
  profileEditFormUsernameInput.value = profileUsername.textContent;
  profileEditFormStatusInput.value = profileStatus.textContent;
  showPopup(profileEditPopup);
});

profileEditPopupCloseButton.addEventListener("click", () =>
  closePopup(profileEditPopup)
);

avatarUpdatePopupCloseButton.addEventListener("click", () =>
  closePopup(avatarUpdatePopup)
);
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, profileFormElement, saveButton);
  const newName = profileEditFormUsernameInput.value;
  const newStatus = profileEditFormStatusInput.value;
  sendUserInfoToServer(newName, newStatus);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
avatarFormElement.addEventListener("submit", handleAvatarLinkSubmit);

export function handleAvatarLinkSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, avatarFormElement, saveButton);
  sendAvatarLinkToServer(avatarLinkInput.value, evt);
}
