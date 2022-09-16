// Заполняем поля ввода формы «Редактировать профиль» данными со страницы

// Ищем данные на странице и наполняем ими переменные
let profileUsername = document.querySelector(".profile__username").textContent;
console.log(profileUsername);

let profileStatus = document.querySelector(".profile__status").textContent;
console.log(profileStatus);

// Ищем инпуты в форме и наполняем их значения контентом со страницы
let profileEditFormUsernameInput = document.querySelector('#username');
console.log(profileEditFormUsernameInput);

let profileEditFormStatusInput = document.querySelector('#status');
console.log(profileEditFormUsernameInput);

function profileEditFormInputsValues () {
  profileEditFormUsernameInput.value = profileUsername;
  profileEditFormStatusInput.value = profileStatus;
}

profileEditFormInputsValues();

// Оживляем попап «Редактировать профиль»

// Объявляем переменные
let profileEditPopup = document.querySelector('.profileedit-popup');

let profileEditButton = document.querySelector('.profile__editname-button');

let profileEditPopupCloseIcon = document.querySelector(
  '.profileedit-popup__close-button'
);

// Добавляем класс при открытии
function showProfileEditPopup() {
  profileEditPopup.classList.add("profileedit-popup_opened");
}

// Открываем попап при клике на иконку
profileEditButton.addEventListener("click", showProfileEditPopup);

// Удаляем класс при закрытии
function closeProfileEditPopup() {
  profileEditPopup.classList.remove("profileedit-popup_opened");
}

// Закрываем попап при клике на крестик
profileEditPopupCloseIcon.addEventListener("click", closeProfileEditPopup);

