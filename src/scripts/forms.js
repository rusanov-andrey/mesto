export {PopupWithForm} 
import {Popup} from './popup.js'

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  open(data) {
    Array.from(this._form.elements).forEach(input => {
      input.value = data[input.name];
    })

    super.open();
  }
  close() {
    super.close();

    this._form.reset();
  }

  _getInputValues() {
    const result = {}
    Array.from(this._form.elements).forEach(input => {
      result[input.name] = input.value;
    })

    return result;
  }
}
