export {UserInfo}

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
      this.updateProfile(new ProfileData(data.name, data.about));
    });

    this._profileEditForm.setEventListeners();

    this._setEditListeners();
  }

  updateProfile(profileData) {
    this._name.textContent = profileData.name;
    this._about.textContent = profileData.about;
  }

  _setEditListeners() {
    this._editButton.addEventListener('click', (evt) => this._open(evt));
  }

  _open(evt) {
    this._profileEditForm.open(new ProfileData(this._name.textContent, this._about.textContent), this);
  }
}

/*class ProfileEdit {
  constructor() {
    this._popup = document.querySelector('#profile-form-popup');
    this._form = this._popup.querySelector('.popup__form');
    this._name = this._popup.querySelector('#profile-form-name');
    this._about = this._popup.querySelector('#profile-form-about');
    this._submitButton = this._popup.querySelector('.popup__submit');

    this._setEventListeners();
  }

  open(profileData, view) {
    this._name.value = profileData.name;
    this._about.value = profileData.about;
    this._view = view;

    openPopup(this._popup);
  }

  _setEventListeners() {
    this._popup.addEventListener('submit', (evt) => this._submit(evt));
  }

  _submit(evt) {
    evt.preventDefault();
    this._view.updateProfile(new ProfileData(this._name.value, this._about.value));
    closePopup(this._popup);
  }
}*/

