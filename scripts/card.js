export {CardData, CardGalary, Card, CardEdit}
import {Section} from './section.js'

class CardData {
  constructor(name, link) {
    this.name = name;
    this.link = link;
  }
}

class CardGalary extends Section {
  constructor(initialCards) {
    super({items:initialCards, renderer: (cardData) => {return (new Card(cardData,  this._elementTemplate)).element}}, '.elements')
    this._addPhotoButton = document.querySelector('.profile__add-photo');
    //this._galary = document.querySelector('.elements');
    //this._cardAddForm = new CardEdit()
    this._cardAddForm = new PopupWithForm('#photo-form-popup', (data) => {
      this.addItem(new CardData(data.name, data.link));
    });
    this._cardAddForm.setEventListeners();
    this._elementTemplate = document.querySelector('#element_template').content;

    /*initialCards.forEach(x => {
      this.addPhoto(x);
    })*/

    this._addEventListeners();
  }

  /*addPhoto(cardData) {
    this._galary.prepend( (new Card(cardData,  this._elementTemplate)).element);
  }*/

  _addEventListeners()
  {
    this._addPhotoButton.addEventListener('click', (evt) => this._openAddForm(evt));
  }

  _openAddForm(evt) {
    this._cardAddForm.open(new CardData('', ''));
  }
}

class Card {
  constructor(cardData, elementTemplate) {
    this._elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    this._data = cardData;
    const image = this._elementItem.querySelector('.elements__image');
    const title = this._elementItem.querySelector('.elements__title');
    const heart = this._elementItem.querySelector('.elements__heart');
    const trash = this._elementItem.querySelector('.elements__trash');

    this._presentor = new PopupWithImage();

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    this._addEventListners(heart, trash, image);
  }

  get element() {
    return this._elementItem;
  }

  _addEventListners(heart, trash, image) {
    heart.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    trash.addEventListener('click', (evt)  => {
      this._deleteCard(evt);
    });

    image.addEventListener('click', (evt) => {
      this._handleImageClick(evt);
    });
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__heart_checked');
  }

  _deleteCard(evt) {
    evt.target.closest('.elements__item').remove();
  }

  _handleImageClick(evt) {
    this._presentor.open(this._data);
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
    this._galary.addItem(new CardData(this._name.value, this._link.value));
    closePopup(this._popup);
  }
}

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