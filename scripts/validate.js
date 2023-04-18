function showInputError(input, errorMessageClass) {
  const error_id = `#${input.id}-error`;
  const errorElement = document.querySelector(error_id);
  errorElement.classList.add(errorMessageClass);
  errorElement.textContent = input.validationMessage;
}
function hideInputError(input, errorMessageClass) {
  const error_id = `#${input.id}-error`;
  const errorElement = document.querySelector(error_id);
  errorElement.classList.remove(errorMessageClass);
  errorElement.textContent = '';
}

function isInputError(inputArray) {
  return inputArray.some(x => !x.validity.valid);
}

function updateButtonState(button, inputArray) {
  const disabled = isInputError(inputArray);
  if(disabled)
    button.disabled = true;
  else
    button.disabled = false;
}

function updateErrorState(input, errorMessageClass) {
  if(input.validity.valid)
  {
    hideInputError(input, errorMessageClass);
    return;
  }

  showInputError(input, errorMessageClass);
}


function enableFormValidation(options) {
  const currentForm = options.form;
  const inputArray = Array.from(currentForm.querySelectorAll(options.inputSelector));
  const submitButton = currentForm.querySelector(options.submitButtonSelector);

  inputArray.forEach(input => {
    input.addEventListener('input', function (evt) {
      updateErrorState(input, options.errorMessageClass)
    })
  })

  currentForm.closest('.popup').addEventListener('transitionrun', (evt) => {
    updateButtonState(submitButton, inputArray);
    inputArray.forEach(input => {
      updateErrorState(input, options.errorMessageClass)})
    });

  currentForm.addEventListener('input', function (evt) {
    updateButtonState(submitButton, inputArray);
  })
}

function enableValidation(options) {
  const formArray = Array.from(document.querySelectorAll(options.formSelector));

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
  errorMessageClass: 'popup__error_visible'
});
