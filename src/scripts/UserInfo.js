import { ProfileData } from "./ProfileData.js";

export class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  setUserInfo(profileData) {
    this._name.textContent = profileData.name;
    this._about.textContent = profileData.about;
    this._avatar.src = profileData.avatarLink;
  }

  getUserInfo() {
    return new ProfileData(this._name.textContent, this._about.textContent, this._avatar.src);
  }
}

