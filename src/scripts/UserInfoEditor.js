import {PopupWithForm} from './PopupWithForm.js'
import { ProfileData } from './ProfileData.js';

export class UserInfoEditor {
  constructor(userInfo, api) {
    this._userInfo = userInfo;
    this._editButton = document.querySelector('.profile__edit');

    this._profileEditForm = new PopupWithForm('#profile-form-popup', (data) => {
      const profileData = new ProfileData(data.name, data.about, data.avatarLink);
      api.updateProfileData(profileData.toJSON())
      .then(updatedProfileJson => {
        this._userInfo.setUserInfo((new ProfileData()).fromJSON(updatedProfileJson));
      });
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

