
class FormValidator {
  constructor(options, form) {
    this._inputArray = Array.from(form.querySelectorAll(options.inputSelector));
    this._submitButton = form.querySelector(options.submitButtonSelector);

    this._addEventListners( options, form);
  }

  _addEventListners( options, form) {
    this._inputArray.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._updateErrorState(input, options.errorMessageClass)
      })
    })
  
    form.closest('.popup').addEventListener('transitionrun', (evt) => {
      this._updateButtonState();
      this._inputArray.forEach(input => {
        this._updateErrorState(input, options.errorMessageClass)})
      });
  
    form.addEventListener('input', (evt) => {
      this._updateButtonState();
    })
  }

  _showInputError(input, errorMessageClass) {
    const error_id = `#${input.id}-error`;
    const errorElement = document.querySelector(error_id);
    errorElement.classList.add(errorMessageClass);
    errorElement.textContent = input.validationMessage;
  }
  _hideInputError(input, errorMessageClass) {
    const error_id = `#${input.id}-error`;
    const errorElement = document.querySelector(error_id);
    errorElement.classList.remove(errorMessageClass);
    errorElement.textContent = '';
  }
  
  _isInputError() {
    return this._inputArray.some(x => !x.validity.valid);
  }
  
  _updateButtonState() {
    const disabled = this._isInputError();
    if(disabled)
      this._submitButton.disabled = true;
    else
      this._submitButton.disabled = false;
  }
  
  _updateErrorState(input, errorMessageClass) {
    if(input.validity.valid)
    {
      this._hideInputError(input, errorMessageClass);
      return;
    }
  
    this._showInputError(input, errorMessageClass);
  }
}


class ValidatorFactory {
  constructor(options) {
    this._options = options;
  }

  createValidators() {
    const formArray = Array.from(document.querySelectorAll(this._options.formSelector));
    this._validatorsList = [];

    formArray.forEach(form => {
      this._validatorsList.push( new FormValidator(this._options, form))
    })
  }
}

function enableValidation(options) {
  return new ValidatorFactory(options);
}

const factory = enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorMessageClass: 'popup__error_visible'
});

factory.createValidators();
