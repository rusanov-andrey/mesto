const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const profileEditButton = document.querySelector('.profile__edit');

const profileFormPopup = document.querySelector('#profile-form-popup');
const profileForm = profileFormPopup.querySelector('.popup__profile-form');
const profileFormCloseButton = profileFormPopup.querySelector('.popup__close');
const profileFormName = profileForm.querySelector('#profile-form-name');
const profileFormAbout = profileForm.querySelector('#profile-form-about');
const profileFormButton = profileForm.querySelector('.popup__submit');

const addPhotoButton = document.querySelector('.profile__add-photo');

const photoFormPopup = document.querySelector('#photo-form-popup');
const photoForm = photoFormPopup.querySelector('.popup__profile-form');
const photoFormCloseButton = photoFormPopup.querySelector('.popup__close');
const photoFormName = photoForm.querySelector('#photo-form-name');
const photoFormLink = photoForm.querySelector('#photo-form-link');
const photoFormButton = photoForm.querySelector('.popup__submit');

const photoViewPopuo = document.querySelector('#photo-view-popup');
const photoViewCloseButton = photoViewPopuo.querySelector('.popup__photo-close');
const photoViewImage = photoViewPopuo.querySelector('.popup__photo-image');
const photoViewTitle = photoViewPopuo.querySelector('.popup__photo-title');

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element_template').content;

const animationDuration = 500;

init();

profileEditButton.addEventListener('click', function () {
  openPopup(profileFormPopup);
  profileFormName.value = profileTitle.textContent;
  profileFormAbout.value = profileSubtitle.textContent;
});

addPhotoButton.addEventListener('click', function () {
  photoFormName.value = photoFormLink.value = '';
  openPopup(photoFormPopup);
});

profileFormCloseButton.addEventListener('click', closePopup);
photoFormCloseButton.addEventListener('click', closePopup);

profileFormPopup.addEventListener('submit', function (event) {
  event.preventDefault();
  updateProfile();
  closePopup();
});
photoFormPopup.addEventListener('submit', function (event) {
  event.preventDefault();
  addPhoto();
  closePopup();
});

photoViewCloseButton.addEventListener('click', function(evt) {
  closePhoto();
});



function createCard(name, link)
{
  const elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
  const image = elementItem.querySelector('.elements__image');
  const title = elementItem.querySelector('.elements__title');
  const heart = elementItem.querySelector('.elements__heart');
  const trash = elementItem.querySelector('.elements__trash');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  heart.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__heart_checked');
  });

  trash.addEventListener('click', function (evt) {
    evt.target.closest('.elements__item').remove();
  });

  image.addEventListener('click', function (evt) {
    openPhoto(evt.target.alt, evt.target.src);
  });

  return elementItem;
}
function insertPhotoAtBegin(item) {
  elements.prepend(item);
}
function init()
{
  for( let card of initialCards)
  {
    const item = createCard(card.name, card.link);
    insertPhotoAtBegin(item);
  }
}

let popupId = NaN;
function openPopup(popup)
{
  popupId = popup.id;
  popup.classList.add('popup_opened');
  setTimeout(() => {  popup.style = "opacity: 1;";}, animationDuration);
}

let popupHover;
function closePopup() {
  formCallback = NaN;
  popupHover = document.querySelector(`#${popupId}:hover`);
  popupHover.style.opacity = '0';
  setTimeout(() => {  popupHover.style = ""; popupHover.classList.remove('popup_opened');}, animationDuration);
}


function updateProfile()
{
  profileTitle.textContent = profileFormName.value;
  profileSubtitle.textContent = profileFormAbout.value;
}
function addPhoto()
{
  const item = createCard(photoFormName.value, photoFormLink.value);
  insertPhotoAtBegin(item);
}

function openPhoto(title, link)
{
  photoViewTitle.textContent = title;
  photoViewImage.src = link;

  openPopup(photoViewPopuo);
}
let photoHover;
function closePhoto()
{
  photoHover = document.querySelector('#photo-view-popup:hover');
  photoHover.style.opacity = '0';
  setTimeout(() => {  photoHover.style = ""; photoHover.classList.remove('popup_opened');}, animationDuration);
}