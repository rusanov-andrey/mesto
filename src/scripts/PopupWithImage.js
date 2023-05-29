export {PopupWithImage}
import {Popup} from './Popup.js'

class PopupWithImage extends Popup {
  constructor() {
    super('#photo-view-popup');
    this._image = this._popup.querySelector('.popup__photo-image');
    this._title = this._popup.querySelector('.popup__photo-title');
  }

  open(cardData) {
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._title.textContent = cardData.name;

    super.open();
  }
}