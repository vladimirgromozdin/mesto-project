/** QUERY SELECTORS & EVENT HANDLERS */

const profileUsername =
  document.querySelector(".profile__username").textContent;

const profileStatus = document.querySelector(".profile__status").textContent;

const profileEditPopup = document.querySelector(".profileedit-popup");

const profileEditButton = document.querySelector(".profile__editname-button");

const profileEditPopupCloseIcon = document.querySelector(
  ".profileedit-popup__close-button"
);

const profileEditFormUsernameInput = document.querySelector("#username");
console.log(profileEditFormUsernameInput);

const profileEditFormStatusInput = document.querySelector("#status");
console.log(profileEditFormUsernameInput);



/** FUNCTIONS */

/**Adding default profileedit popup values */
function profileEditFormInputsValues() {
  profileEditFormUsernameInput.value = profileUsername;
  profileEditFormStatusInput.value = profileStatus;
}

profileEditFormInputsValues();


function showProfileEditPopup(profileEditPopup) {
  profileEditPopup.classList.add("profileedit-popup_opened");
}

// Открываем попап при клике на иконку
profileEditButton.addEventListener("click", showProfileEditPopup);

/**
 * Удаляем класс при закрытии
 */
function closeProfileEditPopup() {
  profileEditPopup.classList.remove("profileedit-popup_opened");
}

// Закрываем попап при клике на крестик
profileEditPopupCloseIcon.addEventListener("click", closeProfileEditPopup);

// Оживляем форму «Редактировать профиль» и передаём её значения на страницу
// Воспользуйтесь методом querySelector()
const formElement = document.querySelector(".form-profile-edit");

// Находим поля формы в DOM
const nameInput = document.querySelector("#username"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector("#status"); // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Вот тут возможно надо query selector применить
  let username = nameInput.value;
  let status = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileUsername =
    document.querySelector(".profile__username").textContent;

  let profileStatus = document.querySelector(".profile__status").textContent;

  // Вставьте новые значения с помощью textContent
  profileUsername.textContent = username;
  profileStatus.textContent = status;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
