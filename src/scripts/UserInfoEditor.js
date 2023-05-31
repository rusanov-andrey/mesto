import {PopupWithForm} from './PopupWithForm.js'
import { ProfileData } from './ProfileData.js';
import { UserInfo } from './UserInfo.js';

export class UserInfoEditor {
  constructor({nameSelector, aboutSelector}) {
    this._userInfo = new UserInfo({nameSelector, aboutSelector});
    this._editButton = document.querySelector('.profile__edit');

    this._profileEditForm = new PopupWithForm('#profile-form-popup', (data) => {
      this._userInfo.setUserInfo(new ProfileData(data.name, data.about));
    });

    this._profileEditForm.setEventListeners();

    this._setEditListeners();
  }

  _setEditListeners() {
    this._editButton.addEventListener('click', (evt) => this._open(evt));
  }

  _open(evt) {
    this._profileEditForm.open(this._userInfo.getUserInfo());
  }
}

