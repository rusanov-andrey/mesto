let popupOpenedClass = '';

function findOpenedPopup() {
  return document.querySelector(`.${popupOpenedClass}`)
}

function readKeyboard(evt) {
  if(evt.key === 'Escape') {
    closePopup(findOpenedPopup());
  }
}


function openPopup(popup) {
  document.addEventListener('keydown', readKeyboard);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', readKeyboard)
}


function addPopupCloseFunction(options) {
  const popupArray = Array.from(document.querySelectorAll(options.popupSelector));

  popupArray.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(options.popupClass) || evt.target.classList.contains(options.popupCloseClass)) {
        closePopup(popup);
      }
    })
  })
}


function configureCloseFunction(options)
{
  popupOpenedClass = options.popupOpenedClass;
  addPopupCloseFunction(options);
}

configureCloseFunction({
  popupSelector: '.popup',
  popupClass: 'popup',
  popupCloseClass: 'popup__close',
  popupOpenedClass: 'popup_opened'
})
