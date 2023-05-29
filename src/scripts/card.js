export class Card {
  constructor(cardData, elementTemplate, handleCardClick) {
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
    heart.addEventListener('click', (evt) => {
      this._toggleLike(evt);
    });

    trash.addEventListener('click', (evt)  => {
      this._deleteCard(evt);
    });

    image.addEventListener('click', (evt) => {
      this._handleCardClick(this._data);
    });
  }

  _toggleLike(evt) {
    evt.target.classList.toggle('elements__heart_checked');
  }

  _deleteCard(evt) {
    evt.target.closest('.elements__item').remove();
  }
}
