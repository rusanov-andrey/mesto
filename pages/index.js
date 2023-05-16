import {ProfileView} from '../scripts/profile.js';
import { initialCards } from '../scripts/initial-cards.js';
import { CardData, CardGalary } from '../scripts/card.js';
import * as validation from '../scripts/validate.js';

const profileView = new ProfileView();
const galary = new CardGalary(initialCards);