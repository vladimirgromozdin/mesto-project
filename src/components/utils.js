import {removeEscapeListener} from "./modal";
import {addPopupCloserControls} from "./modal";

const removalConfirmationPopup = document.querySelector(".popup_content_remove-card-confirmation");
const avatarArea = document.querySelector('.profile__avatar-wrapper');
const avatarEditIcon = document.querySelector('.profile__edit-icon');

export function showPopup(item, cardId) {
  item.classList.add("popup_opened");
  addPopupCloserControls();
  const removalConfirmationPopupOpen = removalConfirmationPopup.className.includes("popup_opened");
  if (removalConfirmationPopupOpen) {
    assignCardIdToRemovalConfirmationPopup(cardId);
  }
}

export function assignCardIdToRemovalConfirmationPopup(cardId) {
  removalConfirmationPopup.dataset.id = cardId;
}

function showAvatarEditIcon() {
  avatarEditIcon.classList.add('profile__edit-icon_display_active');
}

function hideAvatarEditIcon() {
  avatarEditIcon.classList.remove('profile__edit-icon_display_active');
}

export function closePopup(item) {
  item.classList.remove("popup_opened");
  removeEscapeListener();
}

avatarArea.addEventListener('mouseover', () => showAvatarEditIcon());
avatarArea.addEventListener('mouseout', () => hideAvatarEditIcon());

export function renderLoading(isLoading, formEdited, submitText) {
  if (isLoading) {
    const currentForm = document.querySelector('.popup_opened');
    const currentFormSubmitButton = currentForm.querySelector('.popup__submit-button')
    currentFormSubmitButton.textContent = 'Сохранение...'
  } else {
    const currentFormSubmitButton = formEdited.querySelector('.popup__submit-button')
    currentFormSubmitButton.textContent = submitText;
  }
}
