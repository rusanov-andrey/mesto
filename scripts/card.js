export {CardData, CardGalary, CardView, CardEdit, CardPresentation}
import {openPopup, closePopup} from './popup.js'

class CardData {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

class CardGalary {
  constructor(initialCards) {
    this._addPhotoButton = document.querySelector('.profile__add-photo');
    this._galary = document.querySelector('.elements');
    this._cardAddForm = new CardEdit()

    initialCards.forEach(x => {
      this.addPhoto(x);
    })

    this._addEventListeners();
  }

  addPhoto(cardData) {
    this._galary.prepend( (new CardView(cardData)).element);
  }

  _addEventListeners()
  {
    this._addPhotoButton.addEventListener('click', (evt) => this._openAddForm(evt));
  }

  _openAddForm(evt) {
    this._cardAddForm.open(this);
  }
}

const elementTemplate = document.querySelector('#element_template').content;

class CardView {
  constructor(cardData) {
    this._elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    const image = this._elementItem.querySelector('.elements__image');
    const title = this._elementItem.querySelector('.elements__title');
    const heart = this._elementItem.querySelector('.elements__heart');
    const trash = this._elementItem.querySelector('.elements__trash');

    this._presentor = new CardPresentation();

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    heart.addEventListener('click', function (evt) {
      evt.target.classList.toggle('elements__heart_checked');
    });

    trash.addEventListener('click', function (evt) {
      evt.target.closest('.elements__item').remove();
    });

    image.addEventListener('click', (evt) => {
      this._presentor.open(new CardData(cardData.name, cardData.link));
    });
  }

  get element() {
    return this._elementItem;
  }

  _open(evt) {

  }
}

class CardEdit {
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
    this._galary.addPhoto(new CardData(this._name.value, this._link.value));
    closePopup(this._popup);
  }
}

class CardPresentation {
  constructor() {
    this._popup = document.querySelector('#photo-view-popup');
    this._image = this._popup.querySelector('.popup__photo-image');
    this._title = this._popup.querySelector('.popup__photo-title');
  }

  open(cardData) {
    this._image.src = cardData.link;
    this._image.alt = cardData.name;
    this._title.textContent = cardData.name;

    openPopup(this._popup);
  }
}