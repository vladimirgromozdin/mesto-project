/** Constants, Query Selectors & Event Listeners */
const profileUsername =
  document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const profileEditButton = document.querySelector(".profile__editname-button");
const profileEditPopup = document.querySelector(".profileedit-popup");
const profileEditPopupCloseIcon = document.querySelector(
  ".profileedit-popup__close-button"
);
const profileEditFormUsernameInput = document.querySelector("#username");
profileEditFormUsernameInput.value = profileUsername.textContent;
const profileEditFormStatusInput = document.querySelector("#status");
profileEditFormStatusInput.value = profileStatus.textContent;
const formElement = document.querySelector(".form-profile-edit");

profileEditButton.addEventListener("click", showProfileEditPopup);
profileEditPopupCloseIcon.addEventListener("click", closeProfileEditPopup);
formElement.addEventListener("submit", formSubmitHandler);

/** Functions */
function showProfileEditPopup() {
  profileEditPopup.classList.add("profileedit-popup_opened");
}

function closeProfileEditPopup() {
  profileEditPopup.classList.remove("profileedit-popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  const profileEditFormUsernameInputValue = profileEditFormUsernameInput.value;
  const profileEditFormStatusInputValue = profileEditFormStatusInput.value;

  profileUsername.textContent = profileEditFormUsernameInputValue;
  profileStatus.textContent = profileEditFormStatusInputValue;

  closeProfileEditPopup()
}


