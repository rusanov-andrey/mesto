import { initialCards } from '../scripts/initial-cards.js';
import { CardData, CardGalary } from '../scripts/card.js';
import {UserInfo} from '../scripts/profile.js';
import * as validation from '../scripts/validate.js';

const galary = new CardGalary(initialCards);
galary.render();

const userInfo = new UserInfo({nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });
