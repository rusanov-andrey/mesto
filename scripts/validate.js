function showInputError(input, errorMessageClass) {
  const error_id = `#${input.id}-error`;
  console.log(`error-id: ${error_id}`);
  const errorElement = document.querySelector(error_id);
  errorElement.classList.add(errorMessageClass);
  errorElement.textContent = input.validationMessage;
}
function hideInputError(input, errorClass) {
  const error_id = `#${input.id}-error`;
  const errorElement = document.querySelector(error_id);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = ' ';
}

function updateButtonState(button, inputArray) {
  const disabled = inputArray.some(x => !x.validity.valid);
  if(disabled)
    button.disabled = true;
  else
    button.disabled = false;
}


function enableFormValidation(options) {
  const currentForm = options.form;
  const inputArray = Array.from(currentForm.querySelectorAll('.popup__input'));
  const submitButton = currentForm.querySelector('.popup__submit');

  inputArray.forEach(input => {
    input.addEventListener('input', function (evt) {
      if(input.validity.valid)
      {
        hideInputError(input, options.errorMessageClass);
        return;
      }

      showInputError(input, options.errorMessageClass);
    })
  })

  currentForm.addEventListener('input', function (evt) {
    updateButtonState(submitButton, inputArray);
  })
}

function enableValidation(options) {
  const formArray = Array.from(document.querySelectorAll('.popup__form'));

  formArray.forEach(form => {
    const opt = Object.assign( {}, options);
    opt.form = form;
    enableFormValidation(opt);
    console.log(opt);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorMessageClass: 'popup__error_visible'
});
