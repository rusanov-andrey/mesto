import './index.css'

import { Api } from '../scripts/Api.js';
//import { initialCards } from '../utils/initial-cards.js';
import { CardGalary } from '../scripts/CardGalary';
import {UserInfoEditor} from '../scripts/UserInfoEditor.js';
import { ValidatorFactory } from '../scripts/ValidatorFactory';
import { validatorOptions } from '../utils/constants.js';
import { CardData } from '../scripts/CardData.js';
import { ProfileData } from '../scripts/ProfileData';
import { UserInfo } from '../scripts/UserInfo';
//import { Card } from '../scripts/Card';

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

const userInfoPromise = api.getProfile()
.then(res => {
  api.setProfileId(res._id);
  const profileData = new ProfileData(res.name, res.about, res.avatar);
  const userInfo = new UserInfo(userInfoOptions);
  userInfo.setUserInfo(profileData);
  return userInfo;
})
.catch(err => {
  console.log(err);
  const profileData = new ProfileData('--', '--', '');
  const userInfo = new UserInfo(userInfoOptions);
  userInfo.setUserInfo(profileData);
  return userInfo;
});

const initialCards = await api.getCards()
.then(async cardData => {
  const userInfo = await userInfoPromise;
  return cardData.map(item => {
    return (new CardData()).fromJSON(item, api.profileId);
  })
})
.catch(err => {
  console.log(err);
});

const galary = new CardGalary(initialCards, api);
galary.render();

const userInfoEditor = new UserInfoEditor(await userInfoPromise, api);

const factory = new ValidatorFactory(validatorOptions);

factory.createValidators();
