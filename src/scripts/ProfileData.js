import { fromJSON } from "postcss";

export class ProfileData {
  constructor(name, about, avatarLink) {
    this.name = name;
    this.about = about;
    this.avatarLink = avatarLink;
  }

  toJSON() {
    return {
      name: this.name,
      about: this.about,
      avatar: this.avatarLink,
    }
  }

  fromJSON(data) {
    this.name = data.name;
    this.about = data.about;
    this.avatarLink = data.avatar;

    return this;
  }

}
