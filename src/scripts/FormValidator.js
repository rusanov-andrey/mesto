
export class FormValidator {
  constructor(options, form) {
    this._inputArray = Array.from(form.querySelectorAll(options.inputSelector));
    this._submitButton = form.querySelector(options.submitButtonSelector);
    this._options = options;
    this._form = form;

    this._addEventListners();
  }

  _addEventListners() {
    this._inputArray.forEach(input => {
      input.addEventListener('input', (evt) => {
        this._updateErrorState(input, this._options.errorMessageClass)
      })
    })

    this._form.addEventListener('open', (evt) => {
      this._updateButtonState();
    });
    
    this._form.addEventListener('reset', (evt) => {
      setTimeout(() => {
        this._updateButtonState();
        this._inputArray.forEach(input => {
          this._hideInputError(input, this._options.errorMessageClass)
        })
      },
        0)
    });

    this._form.addEventListener('input', (evt) => {
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

  _hasInvalidInput() {
    return this._inputArray.some(x => !x.validity.valid);
  }

  _updateButtonState() {
    /*const disabled = this._hasInvalidInput();
    if (disabled)
      this._submitButton.disabled = true;
    else
      this._submitButton.disabled = false;*/
    
    this._submitButton.disabled = this._hasInvalidInput();
  }

  _updateErrorState(input, errorMessageClass) {
    if (input.validity.valid) {
      this._hideInputError(input, errorMessageClass);
      return;
    }

    this._showInputError(input, errorMessageClass);
  }
}

