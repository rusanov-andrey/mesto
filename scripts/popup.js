class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._options = {
      popupSelector: '.popup',
      popupClass: 'popup',
      popupCloseClass: 'popup__close',
      popupOpenedClass: 'popup_opened'
    };

    this._readKeyboard = (evt) => {this._handleEscClose(evt);};
  }

  open() {
    document.addEventListener('keydown', this._readKeyboard);
    this._popup.classList.add('popup_opened');
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._readKeyboard)
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains(this._options.popupClass) || evt.target.classList.contains(this._options.popupCloseClass)) {
        this.close();
      }
    })
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }    
  }
}


/*let popupOpenedClass = '';

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
})*/
