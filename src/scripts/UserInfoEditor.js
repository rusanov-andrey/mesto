import {PopupWithForm} from './PopupWithForm.js'
import { ProfileData } from './ProfileData.js';

export class UserInfoEditor {
  constructor(userInfo, api) {
    this._userInfo = userInfo;
    this._editButton = document.querySelector('.profile__edit');
    this._avatar = document.querySelector('.profile__avatar');

    this._profileEditForm = new PopupWithForm('#profile-form-popup', (data) => {
      const profileData = ProfileData.fromJSON(data);
      api.updateProfileData(profileData.toJSON())
      .then(updatedProfileJson => {
        this._userInfo.setUserInfo(ProfileData.fromJSON(updatedProfileJson));
      })
      .catch(err => console.log(err));
    });

    this._avatarEditForm = new PopupWithForm('#avatar-form-popup', (data) => {
      const profileData = ProfileData.fromJSON(data);
      api.updateProfileAvatar(profileData.toJSON())
      .then(updatedProfileJson => {
        this._userInfo.setUserInfo(ProfileData.fromJSON(updatedProfileJson));
      })
      .catch(err => console.log(err));
    });

    this._profileEditForm.setEventListeners();
    this._avatarEditForm.setEventListeners();

    this._setEditListeners();
  }

  _setEditListeners() {
    this._editButton.addEventListener('click', (evt) => this._open_profile_form(evt));
    this._avatar.addEventListener('click', (evt) => this._open_avatar_form(evt));
  }

  _open_profile_form(evt) {
    this._profileEditForm.open(this._userInfo.getUserInfo().toJSON());
  }

  _open_avatar_form(evt) {
    this._avatarEditForm.open(this._userInfo.getUserInfo().toJSON());
  }
}

