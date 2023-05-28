export {UserInfo}
import {PopupWithForm} from './forms.js'

class ProfileData {
  constructor(name, about) {
    this.name = name;
    this.about = about;
  }
}

class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._editButton = document.querySelector('.profile__edit');

    this._profileEditForm = new PopupWithForm('#profile-form-popup', (data) => {
      this.setUserInfo(new ProfileData(data.name, data.about));
    });

    this._profileEditForm.setEventListeners();

    this._setEditListeners();
  }

  setUserInfo(profileData) {
    this._name.textContent = profileData.name;
    this._about.textContent = profileData.about;
  }

  getUserInfo() {
    return new ProfileData(this._name.textContent, this._about.textContent);
  }

  _setEditListeners() {
    this._editButton.addEventListener('click', (evt) => this._open(evt));
  }

  _open(evt) {
    this._profileEditForm.open(this.getUserInfo(), this);
  }
}

