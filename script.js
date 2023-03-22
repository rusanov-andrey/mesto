let editButton = document.querySelector('.profile__edit');
let popupForm = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');


editButton.addEventListener('click', function () {
  let inputFieldList = document.querySelectorAll('.popup__input');
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');

  inputFieldList[0].value = profileTitle.textContent;
  inputFieldList[1].value = profileSubtitle.textContent;

  popupForm.classList.toggle('popup_opened');
});

closeButton.addEventListener('click', function () {
  popupForm.classList.toggle('popup_opened');
})

popupForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let inputFieldList = document.querySelectorAll('.popup__input');
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');

  profileTitle.textContent = inputFieldList[0].value;
  profileSubtitle.textContent = inputFieldList[1].value;

  popupForm.classList.toggle('popup_opened');

})