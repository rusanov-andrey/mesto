import {Popup} from './Popup.js'

export class PopupWithConfirmation extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__submit');
    this._data = {};
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const buttonTitle = this._submitButton.textContent;
      this._submitButton.textContent = 'Удаление...';
      this._submit();
      //this.close();
      this._submitButton.textContent = buttonTitle;
    });
  }

  open() {
    const openEvent = new Event('open', {bubbles: true});
    this._form.dispatchEvent(openEvent);

    super.open();
  }
}
