function readKeyboard(evt) {
  if(evt.key === 'Escape') {
    closePopup();
  
    evt.target.removeEventListener('keydown', readKeyboard)
  }
}


let currentPopup;
function openPopup(popup) {
  currentPopup = popup

  document.addEventListener('keydown', readKeyboard);

  popup.classList.add('popup_opened');
}

function closePopup() {
  currentPopup.classList.remove('popup_opened');
}


function addPopupCloseFunction() {
  const popupArray = Array.from(document.querySelectorAll('.popup'));

  popupArray.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      closePopup();
    })
  })
}

function catchClick(element)
{
  element.addEventListener('click', (evt) => {
    evt.stopPropagation();
  })
}

function configureCloseFunction(options)
{
  addPopupCloseFunction()

  const image = document.querySelector(options.imageSelector);
  catchClick(image)

  const formArray = Array.from(document.querySelectorAll(options.formSelector));
  formArray.forEach(form => catchClick(form));

}

configureCloseFunction({
  imageSelector: '.popup__photo-image',
  formSelector: '.popup__form'
});