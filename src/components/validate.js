// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.popup__form_profile');
const formInput = formElement.querySelector('.popup__input');

// Слушатель события input
formInput.addEventListener('input', function (evt) {
  // Выведем в консоль значение свойства validity.valid поля ввода,
  // на котором слушаем событие input
  console.log(evt.target.validity.valid);
});
