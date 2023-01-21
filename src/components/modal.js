import {showPopup, closePopup} from "./utils.js";
import {sendUserInfo} from "./api";

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
const profileEditFormUsernameInput = document.querySelector("#username-input");
const profileEditFormStatusInput = document.querySelector("#status-input");
const profileFormElement = document.forms['profileForm'];
const cardImageCaption = document.querySelector(".popup__caption");
const galleryPopupImage = document.querySelector(".popup__image");

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
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileUsername.textContent = profileEditFormUsernameInput.value;
  profileStatus.textContent = profileEditFormStatusInput.value;
  const profileName = profileEditFormUsernameInput.value;
  const profileDescription = profileEditFormStatusInput.value;
  sendUserInfo(profileName, profileDescription);
  closePopup(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);



