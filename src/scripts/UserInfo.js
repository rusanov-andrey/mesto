import { ProfileData } from "./ProfileData.js";

export class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  setUserInfo(profileData) {
    this._name.textContent = profileData.name;
    this._about.textContent = profileData.about;
  }

  getUserInfo() {
    return new ProfileData(this._name.textContent, this._about.textContent);
  }
}

