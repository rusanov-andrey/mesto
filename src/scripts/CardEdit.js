import { CardData } from './CardData.js';

export class CardEdit {
  constructor() {
    this._popup = document.querySelector('#photo-form-popup');
    this._form = this._popup.querySelector('.popup__form');
    this._name = this._popup.querySelector('#photo-form-name');
    this._link = this._popup.querySelector('#photo-form-link');
    this._submitButton = this._popup.querySelector('.popup__submit');

    this._setEventListeners();
  }

  open(galary) {
    this._name.value = '';
    this._link.value = '';
    this._galary = galary;

    openPopup(this._popup);
  }

  _setEventListeners() {
    this._popup.addEventListener('submit', (evt) => this._submit(evt));
  }

  _submit(evt) {
    evt.preventDefault();
    this._galary.addItem(new CardData(this._name.value, this._link.value));
    closePopup(this._popup);
  }
}
