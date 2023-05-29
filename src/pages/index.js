import './index.css'

import { initialCards } from '../scripts/initial-cards.js';
import { CardGalary } from '../scripts/CardGalary';
import {UserInfo} from '../scripts/UserInfo.js';
import { ValidatorFactory } from '../scripts/ValidatorFactory';

const galary = new CardGalary(initialCards);
galary.render();

const userInfo = new UserInfo({nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

const factory = new ValidatorFactory({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorMessageClass: 'popup__error_visible'
});

factory.createValidators();
