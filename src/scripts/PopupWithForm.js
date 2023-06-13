export {PopupWithForm} 
import {Popup} from './Popup.js'

class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._data = {};
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
    this._data = data;
    Array.from(this._form.elements)
    .filter(input => {
      return (input.type !== "button") && (input.type !== "submit")
    })
    .forEach(input => {
      input.value = data[input.name];
    })

    const openEvent = new Event('open', {bubbles: true});
    this._form.dispatchEvent(openEvent);

    super.open();
  }
  close() {
    super.close();

    this._form.reset();
  }

  _getInputValues() {
    const result = Object.create(this._data || {});
    Array.from(this._form.elements)
    .filter(input => {
      return (input.type !== "button") && (input.type !== "submit")
    })
    .forEach(input => {
      result[input.name] = input.value;
    })

    return result;
  }
}
