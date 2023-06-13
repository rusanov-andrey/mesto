import { fromJSON } from "postcss";

export class CardData {
  constructor(name, link, owner) {
    this.name = name;
    this.link = link;
    this._owner = owner;
  }

  isOwner() {
    return this._owner;
  }

  toJSON() {
    return {
      name: this.name,
      link: this.link,
    }
  }
  fromJSON(json, profileId) {
    this._id = json._id;
    this.name = json.name;
    this.link = json.link;
    this._owner = (json.owner._id === profileId);
    this.likeCount = json.likes.length;

    return this;
  }
}

