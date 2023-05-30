export class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    const elementTemplate = document.querySelector(templateSelector).content;
    this._elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    this._data = cardData;
    const image = this._elementItem.querySelector('.elements__image');
    const title = this._elementItem.querySelector('.elements__title');
    const heart = this._elementItem.querySelector('.elements__heart');
    const trash = this._elementItem.querySelector('.elements__trash');

    this._handleCardClick = handleCardClick;

    image.src = cardData.link;
    image.alt = cardData.name;
    title.textContent = cardData.name;

    this._addEventListners(heart, trash, image);
  }

  get element() {
    return this._elementItem;
  }

  _addEventListners(heart, trash, image) {
    heart.addEventListener('click', Card._toggleLike);
    trash.addEventListener('click', Card._deleteCard);

    image.addEventListener('click', (evt) => {
      this._handleCardClick(this._data);
    });
  }

  static _toggleLike(evt) {
    evt.target.classList.toggle('elements__heart_checked');
  }

  static _deleteCard(evt) {
    evt.target.closest('.elements__item').remove();
  }
}
