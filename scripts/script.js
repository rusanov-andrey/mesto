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
let closeButton = document.querySelector('.popup__close');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let profileNameInput = document.querySelector('#profile-name');
let profileAboutInput = document.querySelector('#profile-about');

let elements = document.querySelector('.elements');
let elementTemplate = document.querySelector('#element_template').content;

init();


function init()
{
  for( let card of initialCards)
  {
    const elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
    const image = elementItem.querySelector('.elements__image');
    const title = elementItem.querySelector('.elements__title');
    image.src = card.link;
    title.textContent = card.name;

    elements.prepend(elementItem);
  }
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', function () {

  profileNameInput.value = profileTitle.textContent;
  profileAboutInput.value = profileSubtitle.textContent;

  popup.classList.add('popup_opened');
});


closeButton.addEventListener('click', closePopup)


popupForm.addEventListener('submit', function (event) {

  event.preventDefault();

  profileTitle.textContent = profileNameInput.value;
  profileSubtitle.textContent = profileAboutInput.value;

  closePopup();
})