import {showPopup, closePopup} from "./utils.js";

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
  showPopup(galleryPopup);
}
galleryPopupCloseButton.addEventListener("click", () => {
  closePopup(galleryPopup);
});

/* -------- Show and Close Popup -------- */


function trackClicksOnOverlay(event) {
  if (!event.target.closest(".popup__container")) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupOnClicksOutsideOfModal() {
  popups.forEach((item) => {
    item.addEventListener("mousedown", trackClicksOnOverlay);
  })}

function closePopupsOnEsc() {
  document.addEventListener("keydown", trackEscapeClicks);
}

function trackEscapeClicks(event) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup !== null && event.key === 'Escape') {
    closePopup(openedPopup);
  }
}

export function removeEscapeClicks () {
  document.removeEventListener("keydown", trackEscapeClicks);
}


export function addPopupCloserControls() {
  closePopupOnClicksOutsideOfModal();
  closePopupsOnEsc()
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
  closePopup(profileEditPopup);
}

profileFormElement.addEventListener("submit", handleProfileFormSubmit);



