import './index.css'

import { Api } from '../scripts/Api.js';
import { FormValidator } from '../scripts/FormValidator.js';
import { validatorOptions } from '../utils/constants.js';
import { CardData } from '../scripts/CardData.js';
import { ProfileData } from '../scripts/ProfileData';
import { UserInfo } from '../scripts/UserInfo';
import { Card } from '../scripts/Card';
import { PopupWithForm } from '../scripts/PopupWithForm.js'
import { Section } from '../scripts/Section';
import { PopupWithImage } from '../scripts/PopupWithImage.js'
import { PopupWithConfirmation } from '../scripts/PopupWithConfirmation.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    Authorization: 'dad7bd08-9118-4abf-8ed0-6a6d22dfcdd6',
    'Content-Type': 'application/json'
  }
});


const userInfoOptions = {
  nameSelector: '.profile__title', 
  aboutSelector: '.profile__subtitle', 
  avatarSelector: '.profile__avatar'
};

const data = await Promise.all([
  api.getProfile(),
  api.getCards()
])
.then(([profile, initialCards]) => {
  api.setProfileId(profile._id);
  const cards = initialCards.map(item => {
    return CardData.fromJSON(item, api.profileId);
  })
  return {initialCards: cards, userInfo: profile}
});

const {initialCards} = data;
const {userInfo} = data;
const userInfoViewer = new UserInfo(userInfoOptions);
userInfoViewer.setUserInfo(ProfileData.fromJSON(userInfo));



const deleteCardFunction = (evt, _id) => {
  const checkForm = new PopupWithConfirmation('#photo-delete-form-popup', () => {
    api.deleteCard(_id)
    .then(() => {
      evt.target.closest('.elements__item').remove();
      checkForm.close();
    })
    .catch((err) => {console.log(err)})
  });

  checkForm.setEventListeners();
  checkForm.open();
}

const cardPresentor = new PopupWithImage('#photo-view-popup');
cardPresentor.setEventListeners();

const section = new Section({
  items: initialCards,
  renderer: (cardData) => {
    return (new Card(cardData, '#element_template', api, (cardData) => {
      cardPresentor.open(cardData);
    },
    deleteCardFunction
    )).element
  }
}, '.elements');

const addPhotoButton = document.querySelector('.profile__add-photo');
const cardAddForm = new PopupWithForm('#photo-form-popup', (data) => {
  api.addCard(data)
  .then(cardDataJson => {
    section.renderItem(CardData.fromJSON(cardDataJson, api.profileId));
    cardAddForm.close();
    return true;
  })
  .catch(err => console.log(err));
});
cardAddForm.setEventListeners();

addPhotoButton.addEventListener('click', (evt) => {
  cardAddForm.open(new CardData('', ''));
});
section.render();



const profileEditButton = document.querySelector('.profile__edit');
const avatar = document.querySelector('.profile__avatar');

const profileEditForm = new PopupWithForm('#profile-form-popup', (data) => {
  const profileData = ProfileData.fromJSON(data);
  api.updateProfileData(profileData.toJSON())
  .then(updatedProfileJson => {
    userInfoViewer.setUserInfo(ProfileData.fromJSON(updatedProfileJson));
    profileEditForm.close();
    return true;
  })
  .catch(err => console.log(err));
});

const avatarEditForm = new PopupWithForm('#avatar-form-popup', (data) => {
  const profileData = ProfileData.fromJSON(data);
  api.updateProfileAvatar(profileData.toJSON())
  .then(updatedProfileJson => {
    userInfoViewer.setUserInfo(ProfileData.fromJSON(updatedProfileJson));
    avatarEditForm.close();
    return true;
  })
  .catch(err => console.log(err));
});

profileEditForm.setEventListeners();
avatarEditForm.setEventListeners();

profileEditButton.addEventListener('click', (evt) => {
  profileEditForm.open(userInfoViewer.getUserInfo().toJSON());
});
avatar.addEventListener('click', (evt) => {
  avatarEditForm.open(userInfoViewer.getUserInfo().toJSON());
});


new FormValidator(validatorOptions, avatarEditForm.form);
new FormValidator(validatorOptions, profileEditForm.form);
new FormValidator(validatorOptions, cardAddForm.form);