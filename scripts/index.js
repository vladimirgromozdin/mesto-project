// Оживляем попап «Редактировать профиль»

// Обозначаем переменные, в которых будут нужные нам элементы попапа «Редактировать профиль»
let profileEditPopup = document.querySelector('.profileedit-popup');

let profileEditButton = document.querySelector('.profile__editname-button');

let profileEditPopupCloseIcon = document.querySelector('.profileedit-popup__close-button');

// Функция добавления класса, когда попап нужно открыть
function showProfileEditPopup() {
  profileEditPopup.classList.add('profileedit-popup_opened');
}

// Открываем попап при клике на кнопку редактирования профиля
profileEditButton.addEventListener('click', showProfileEditPopup);

// Функция удаления класса, когда попап нужно закрыть
function closeProfileEditPopup() {
  profileEditPopup.classList.remove('profileedit-popup_opened');
}

// Закрываем попап при клике на крестик
profileEditPopupCloseIcon.addEventListener('click', closeProfileEditPopup);
