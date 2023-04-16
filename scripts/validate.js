function showInputError(input, errorClass) {
  const error_id = "${input.id}-error";
  const errorElement = document.querySelector(error_id);
  errorElement.classList.add(errorClass);
}
function hideInputError(input, errorClass) {
  const error_id = "${input.id}-error";
  const errorElement = document.querySelector(error_id);
  errorElement.classList.add(errorClass);
}


function enableFormValidation(options) {
  const currentForm = options.form;
  const inputArray = Array.from(currentForm.querySelectorAll('.popup__input'));
  const submitButton = currentForm.querySelector('.popup__submit');

  inputArray.forEach(input => {

  })
}

function enableValidation(options) {
  const formArray = Array.from(document.querySelectorAll('.form'));

  formArray.forEach(form => {
    const opt = Object.assign( {}, options);
    opt.form = form;
    enableFormValidation(opt);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorClass: 'popup__error_visible'
})