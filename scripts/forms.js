class PopupWithForm extends Popup {
  constructor(selector, submit) {
    super(selector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submit(this._getInputValues());
      this.close();
    });
  }

  open(data) {
    Array.from(this._form.elements).forEach(input => {
      input.value = data[input.name];
    })

    super.open();
  }
  close() {
    super.close();

    this._form.reset();
  }

  _getInputValues() {
    const result = {}
    Array.from(this._form.elements).forEach(input => {
      result[input.name] = input.value;
    })

    return result;
  }
}

/*const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const profileEditButton = document.querySelector('.profile__edit');

const profileFormPopup = document.querySelector('#profile-form-popup');
const profileForm = profileFormPopup.querySelector('.popup__form');
const profileFormName = profileForm.querySelector('#profile-form-name');
const profileFormAbout = profileForm.querySelector('#profile-form-about');
const profileFormButton = profileForm.querySelector('.popup__submit');

const addPhotoButton = document.querySelector('.profile__add-photo');

const photoFormPopup = document.querySelector('#photo-form-popup');
const photoForm = photoFormPopup.querySelector('.popup__form');
const photoFormName = photoForm.querySelector('#photo-form-name');
const photoFormLink = photoForm.querySelector('#photo-form-link');
const photoFormButton = photoForm.querySelector('.popup__submit');

const photoViewPopup = document.querySelector('#photo-view-popup');
const photoViewImage = photoViewPopup.querySelector('.popup__photo-image');
const photoViewTitle = photoViewPopup.querySelector('.popup__photo-title');

const cardsContainer = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element_template').content;

const animationDuration = 500;

profileEditButton.addEventListener('click', openProfileForm);
//addPhotoButton.addEventListener('click', openAddPhotoForm);

profileFormPopup.addEventListener('submit', submitProfileForm);
//photoFormPopup.addEventListener('submit', submitAddPhotoForm);


function openProfileForm() {
  profileFormName.value = profileTitle.textContent;
  profileFormAbout.value = profileSubtitle.textContent;
  openPopup(profileFormPopup);
}
function openAddPhotoForm() {
  photoForm.reset();
  openPopup(photoFormPopup);
}


function updateProfile() {
  profileTitle.textContent = profileFormName.value;
  profileSubtitle.textContent = profileFormAbout.value;
}
/*function addPhoto() {
  const item = createCard(photoFormName.value, photoFormLink.value);
  insertPhotoAtBegin(cardsContainer, item);
}* /

function openPhoto(title, link) {
  photoViewTitle.textContent = title;
  photoViewImage.src = link;
  photoViewImage.alt = title;

  openPopup(photoViewPopup);
}


function submitProfileForm(event) {
  event.preventDefault();
  updateProfile();
  closePopup(profileFormPopup);
}
/*function submitAddPhotoForm(event) {
  event.preventDefault();
  addPhoto();
  closePopup(photoFormPopup);
};*/
