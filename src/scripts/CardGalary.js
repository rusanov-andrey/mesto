import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { CardData } from './CardData.js';
import { Card } from './Card.js';


export class CardGalary extends Section {
  constructor(initialCards) {
    super({
      items: initialCards,
      renderer: (cardData) => {
        return (new Card(cardData, '#element_template', (cardData) => {
          this._presentor.open(cardData);
        })).element
      }
    }, '.elements');
    this._presentor = new PopupWithImage('#photo-view-popup');
    this._presentor.setEventListeners();

    this._addPhotoButton = document.querySelector('.profile__add-photo');
    this._cardAddForm = new PopupWithForm('#photo-form-popup', (data) => {
      this.renderItem(new CardData(data.name, data.link));
    });
    this._cardAddForm.setEventListeners();

    this._addEventListeners();
  }

  _addEventListeners() {
    this._addPhotoButton.addEventListener('click', (evt) => this._openAddForm(evt));
  }

  _openAddForm(evt) {
    this._cardAddForm.open(new CardData('', ''));
  }
}

