import { PopupWithForm } from "./PopupWithForm.js";

export class Card {
  constructor(cardData, templateSelector, api, handleCardClick) {
    const elementTemplate = document.querySelector(templateSelector).content;
    this._elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    this._data = cardData;
    this._api = api;
    const image = this._elementItem.querySelector('.elements__image');
    const title = this._elementItem.querySelector('.elements__title');
    const heart = this._elementItem.querySelector('.elements__heart');
    const heartCount = this._elementItem.querySelector('.elements__heart-count')
    const trash = this._elementItem.querySelector('.elements__trash');

    this._handleCardClick = handleCardClick;

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    if(cardData.myLike) {
      heart.classList.add('elements__heart_checked')
    }
    heartCount.textContent = cardData.likeCount;

    if(!cardData.isOwner()) {
      trash.classList.add('elements__trash_invisible');
    }

    this._addEventListners(heart, trash, image);
  }

  get element() {
    return this._elementItem;
  }

  _addEventListners(heart, trash, image) {
    heart.addEventListener('click', Card._toggleLike);
    trash.addEventListener('click', (evt) => {
      this._deleteCard(evt);
    });

    image.addEventListener('click', (evt) => {
      this._handleCardClick(this._data);
    });
  }

  static _toggleLike(evt) {
    evt.target.classList.toggle('elements__heart_checked');
  }

  _deleteCard(evt) {
    const checkForm = new PopupWithForm('#photo-delete-form-popup', (data) => {
      this._api.deleteCard(this._data._id)
      .then(() => {
        evt.target.closest('.elements__item').remove();
      })
      .catch((err) => {console.log(err)})
    });

    checkForm.setEventListeners();
    checkForm.open();
  }
}
