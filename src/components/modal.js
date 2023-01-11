/* -------- Global Constants -------- */
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
const profileFormElement = document.querySelector(".popup__form_profile");

/* -------- Show Gallery Image Popup -------- */
export function showGalleryPopup(evt) {
  const cardImageUrl = evt.target.src;
  const cardImageCaption = document.querySelector(".popup__caption");
  cardImageCaption.textContent = evt.target.alt;
  const galleryPopupImage = document.querySelector(".popup__image");
  galleryPopupImage.src = cardImageUrl;
  galleryPopup.classList.add("popup_opened");
}
galleryPopupCloseButton.addEventListener("click", () => {
  closePopup(galleryPopup);
});

/* -------- Show and Close Popup -------- */
export function showPopup(item) {
  item.classList.add("popup_opened");
  addPopupCloserControls();
}

export function closePopup(item) {
  item.classList.remove("popup_opened");
}

function closePopupOnClicksOutsideOfModal() {
  const popup = document.querySelectorAll(".popup");
  popup.forEach((item) => {
    item.addEventListener("mousedown", (event) => {
      if (!event.target.closest(".popup__container")) {
        const openedPopup = document.querySelector('.popup_opened');
        openedPopup.classList.remove('popup_opened');
      }
    })
  })}

function closePopupsOnEsc() {
  document.addEventListener("keydown", (event) => {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup !== null && event.key === 'Escape') {
      openedPopup.classList.remove('popup_opened');
    }
  });
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
export function formProfileEditSubmitHandler(evt) {
  evt.preventDefault();
  profileUsername.textContent = profileEditFormUsernameInput.value;
  profileStatus.textContent = profileEditFormStatusInput.value;
  closePopup(profileEditPopup);
}

profileFormElement.addEventListener("submit", formProfileEditSubmitHandler);



