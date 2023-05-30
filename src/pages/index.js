import './index.css'

import { initialCards } from '../utils/initial-cards.js';
import { CardGalary } from '../scripts/CardGalary';
import {UserInfoEditor} from '../scripts/UserInfoEditor.js';
import { ValidatorFactory } from '../scripts/ValidatorFactory';
import { validatorOptions } from '../utils/constants.js';

const galary = new CardGalary(initialCards);
galary.render();

const userInfo = new UserInfoEditor({nameSelector: '.profile__title', aboutSelector: '.profile__subtitle' });

const factory = new ValidatorFactory(validatorOptions);

factory.createValidators();
