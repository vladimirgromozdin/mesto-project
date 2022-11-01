/** Constants, Query Selectors & Event Listeners */

// Profile Edit
const profileUsername = document.querySelector(".profile__username");
const profileStatus = document.querySelector(".profile__status");
const profileEditButton = document.querySelector(".profile__editname-button");
const profileEditPopup = document.querySelector(".profileedit-popup");
const profileEditPopupCloseIcon = document.querySelector(
  ".profileedit-popup__close-button"
);
const profileEditFormUsernameInput = document.querySelector("#username");
const profileEditFormStatusInput = document.querySelector("#status");
const profileFormElement = document.querySelector(".form-profile-edit");

profileEditFormUsernameInput.value = profileUsername.textContent; // Set Username Placeholder
profileEditFormStatusInput.value = profileStatus.textContent; // Set Status Placeholder

profileEditButton.addEventListener("click", showProfileEditPopup);
profileEditPopupCloseIcon.addEventListener("click", closeProfileEditPopup);
profileFormElement.addEventListener("submit", formProfileEditSubmitHandler);


// Adding New Cards
const addCardPopup = document.querySelector(".addnewcard-popup");
const addCardButton = document.querySelector(".profile__add-new-button");
const addCardPopupCloseIcon = document.querySelector(
  ".addnewcard-popup__close-button"
);
const cardAddNameInput = document.querySelector("#place-name");
const cardAddImageURLInput = document.querySelector("#place-image-link");
const cardAddForm = document.querySelector(".form-addnewcard");
const cardList = document.querySelector(".elements__wrapper");

addCardButton.addEventListener("click", showAddCardPopup);
addCardPopupCloseIcon.addEventListener("click", closeAddCardPopup);
cardAddForm.addEventListener("submit", cardAddSubmitHandler);

/** Functions */
function showProfileEditPopup() {
  profileEditPopup.classList.add("profileedit-popup_opened"); // Show Profile Edit Popup
}

function closeProfileEditPopup() {
  profileEditPopup.classList.remove("profileedit-popup_opened");  // Close Profile Edit Popup
}

function showAddCardPopup() {
  addCardPopup.classList.add("addnewcard-popup_opened"); // Show Add Card Popup
  // const addCardNamePlaceholder = document.querySelector(
  //   ".form-addnewcard__input"
  // );
}

function closeAddCardPopup() {
  addCardPopup.classList.remove("addnewcard-popup_opened"); // Close Add Card Popup
}

// Handle Profile Edit Submissions
function formProfileEditSubmitHandler(evt) {
  evt.preventDefault();

  const profileEditFormUsernameInputValue = profileEditFormUsernameInput.value;
  const profileEditFormStatusInputValue = profileEditFormStatusInput.value;

  profileUsername.textContent = profileEditFormUsernameInputValue;
  profileStatus.textContent = profileEditFormStatusInputValue;

  closeProfileEditPopup();
}

// Handle Card Add Submissions
function cardAddSubmitHandler(evt) {
  evt.preventDefault();

  const cardTemplate = document.querySelector("#new-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardAddName = cardAddNameInput.value;
  const cardAddImageURL = cardAddImageURLInput.value;
  let cardImage = cardElement.querySelector(".element__image");
  cardImage.src = cardAddImageURL;
  cardImage.alt = cardAddName;
  cardElement.querySelector(".element__caption").textContent = cardAddName;
  cardList.prepend(cardElement);

  cardAddNameInput.value = "";
  cardAddImageURLInput.value = "";

  const likeButton = document.querySelector(".element__like-button");
  likeButton.addEventListener("click", toggleLikeButton); // Tracking Like Button Clicks

  const removeButton = document.querySelector(".element__trash-bin-button");
  removeButton.addEventListener("click", removeCard); // Tracking Remove Button Clicks

  closeAddCardPopup();
}

// Create Initial Cards
initialCards.forEach(function (item) {
  const cardTemplate = document.querySelector("#new-card-template").content;
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".element__image").src = item.link;
  cardElement.querySelector(".element__image").alt = item.name;
  cardElement.querySelector(".element__caption").textContent = item.name;
  cardList.prepend(cardElement);
});

const likeButtons = document.querySelectorAll(".element__like-button");

// Like Buttons Toggle
function toggleLikeButton(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle("element__like-button_active");
}

// Like Buttons Tracking
likeButtons.forEach(function (item) {
  const likeButton = item.querySelector(".element__like-button");
  item.addEventListener("click", toggleLikeButton);
});

//Removing Cards
function removeCard(evt) {
  evt.target.closest(".element").remove();
}

const removeButtons = document.querySelectorAll(".element__trash-bin-button ");

removeButtons.forEach(function (item) {
  item.addEventListener("click", removeCard);
});
