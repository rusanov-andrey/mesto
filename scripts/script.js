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

let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__profile-form');
let popupCloseButton = document.querySelector('.popup__close');
let addPhotoButton = document.querySelector('.profile__add-photo');

let photo = document.querySelector('.photo');
let photoCloseButton = document.querySelector('.photo__close');
let photoImage = document.querySelector('.photo__image');
let photoTitle = document.querySelector('.photo__title');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

//let profileNameInput = document.querySelector('#param1');
//let profileAboutInput = document.querySelector('#param2');

let elements = document.querySelector('.elements');
let elementTemplate = document.querySelector('#element_template').content;

init();

editButton.addEventListener('click', function () {
  openForm('Редактировать профиль', 'Имя', profileTitle.textContent, 'О себе', profileSubtitle.textContent, 'Сохранить', updateProfile);
});

addPhotoButton.addEventListener('click', function () {
  openForm('Новое место', 'Название', '', 'Ссылка на картинку', '', 'Создать', addPhoto);
});

popupCloseButton.addEventListener('click', closePopup);


popupForm.addEventListener('submit', function (event) {

  event.preventDefault();
  saveFormData();
  closePopup();
});

photoCloseButton.addEventListener('click', function(evt) {
  closePhoto();
});



function insertPhotoAtBegin(name, link)
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

  elements.prepend(elementItem);
}
function init()
{
  for( let card of initialCards)
  {
    insertPhotoAtBegin(card.name, card.link);
  }
}

let formCallback = NaN;
function openForm(title, placeholder_1, value_1, placeholder_2, value_2, buttonTitle, callback)
{
  let formTitle = popup.querySelector('.popup__title');
  let formParam1 = popup.querySelector('#param1');
  let formParam2 = popup.querySelector('#param2');
  let formButton = popup.querySelector('.popup__submit');

  formTitle.textContent = title || '';
  formParam1.placeholder = placeholder_1 || '';
  formParam1.value = value_1 || '';
  formParam2.placeholder = placeholder_2 || '';
  formParam2.value = value_2 || '';
  formButton.textContent = buttonTitle || 'Закрыть';

  formCallback = callback || NaN;

  popup.classList.add('popup_opened');
}
function saveFormData()
{
  if( formCallback)
  {
    let formParam1 = popup.querySelector('#param1');
    let formParam2 = popup.querySelector('#param2');

    formCallback(formParam1.value, formParam2.value);
  }
}
function updateProfile(name, about)
{
  profileTitle.textContent = name;
  profileSubtitle.textContent = about;
}
function addPhoto(name, photoUrl)
{
  insertPhotoAtBegin(name, photoUrl);
}

let popupHover;
function closePopup() {
  formCallback = NaN;
  popupHover = document.querySelector('.popup:hover');
  popupHover.style.opacity = '0';
  setTimeout(() => {  popupHover.style = ""; popup.classList.remove('popup_opened');}, 500);
}

function openPhoto(title, link)
{
  photoTitle.textContent = title;
  photoImage.src = link;

  photo.classList.add('photo_opened');
}
let photoHover;
function closePhoto()
{
  photoHover = document.querySelector('.photo:hover');
  photoHover.style.opacity = '0';
  setTimeout(() => {  photoHover.style = ""; photo.classList.remove('photo_opened');}, 500);
}