import { Section } from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'
import { CardData } from './CardData.js';
import { Card } from './Card.js';


export class CardGalary extends Section {
  constructor(initialCards, api) {
    super({
      items: initialCards,
      renderer: (cardData) => {
        return (new Card(cardData, '#element_template', api, (cardData) => {
          this._presentor.open(cardData);
        })).element
      }
    }, '.elements');
    this._presentor = new PopupWithImage('#photo-view-popup');
    this._presentor.setEventListeners();

    this._addPhotoButton = document.querySelector('.profile__add-photo');
    this._cardAddForm = new PopupWithForm('#photo-form-popup', async (data) => {
      const result = await api.addCard(data)
      .then(cardDataJson => {
        this.renderItem(CardData.fromJSON(cardDataJson, api.profileId));
        return true;
      })
      .catch(err => console.log(err));
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

