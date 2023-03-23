let editButton = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__profile-form');
let closeButton = document.querySelector('.popup__close');

let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

let profileNameInput = document.querySelector('#profile-name');
let profileAboutInput = document.querySelector('#profile-about');


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