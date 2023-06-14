export {Popup}

class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._options = {
      popupSelector: '.popup',
      popupClass: 'popup',
      popupCloseClass: 'popup__close',
      popupOpenedClass: 'popup_opened'
    };

    this._readKeyboard = this._handleEscClose.bind(this);
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
