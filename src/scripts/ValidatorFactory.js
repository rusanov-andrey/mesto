import { FormValidator } from "./FormValidator.js";

export class ValidatorFactory {
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

