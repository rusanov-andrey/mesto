import { PopupWithConfirmation } from "./PopupWithConfirmation.js";
import { CardData } from "./CardData.js";

export class Card {
  constructor(cardData, templateSelector, api, handleCardClick, deleteCardFunction) {
    const elementTemplate = document.querySelector(templateSelector).content;
    this._elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    this._data = cardData;
    this._api = api;
    const image = this._elementItem.querySelector('.elements__image');
    const title = this._elementItem.querySelector('.elements__title');
    const heart = this._elementItem.querySelector('.elements__heart');
    this._heartCount = this._elementItem.querySelector('.elements__heart-count')
    const trash = this._elementItem.querySelector('.elements__trash');

    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCardFunction;

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    if(cardData.myLike) {
      heart.classList.add('elements__heart_checked')
    }

    this._updateHeartCount();
    
    if(!cardData.isOwner()) {
      trash.classList.add('elements__trash_invisible');
    }

    this._addEventListners(heart, trash, image);
  }

  get element() {
    return this._elementItem;
  }

  _addEventListners(heart, trash, image) {
    heart.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });
    trash.addEventListener('click', (evt) => {
      this._deleteCard(evt, this._data._id);
    });

    image.addEventListener('click', (evt) => {
      this._handleCardClick(this._data);
    });
  }

  _toggleLike(evt) {
    if(this._data.myLike) {
      this._api.unlikeCard(this._data._id)
      .then((json) => {
        this._data = CardData.fromJSON(json, this._api.profileId);
        evt.target.classList.remove('elements__heart_checked');    
        this._updateHeartCount();
      })
      .catch(err => console.log(err));
    }
    else {
      this._api.likeCard(this._data._id)
      .then((json) => {
        this._data = CardData.fromJSON(json, this._api.profileId);
        evt.target.classList.add('elements__heart_checked');    
        this._updateHeartCount();
      })
      .catch(err => console.log(err));
    }
  }

  _updateHeartCount() {
    this._heartCount.textContent = this._data.likeCount;
  }
}
