const galleryPopupCloseButton = document.querySelector(
  ".popup__close-button_content_fullimage"
);
const galleryPopup = document.querySelector(".popup_content_fullimage");

// Gallery View Interactions
galleryPopupCloseButton.addEventListener("click", () => {
  closePopup(galleryPopup);
});

// Show Popup
export function showPopup(item) {
  item.classList.add("popup_opened");
}

// Close Popup
export function closePopup(item) {
  item.classList.remove("popup_opened");
}

// Show Full Card Image
export function showGalleryPopup(evt) {
  const cardImageUrl = evt.target.src;
  const cardImageCaption = document.querySelector(".popup__caption");
  const cardFullscreenName = evt.target.alt;
  cardImageCaption.textContent = cardFullscreenName;
  const galleryPopupImage = document.querySelector(".popup__image");
  galleryPopupImage.src = cardImageUrl;
  galleryPopup.classList.add("popup_opened");
}
