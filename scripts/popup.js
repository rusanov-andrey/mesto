function addPopupCloseFunction() {
  const popupArray = Array.from(document.querySelectorAll('.popup'));

  popupArray.forEach(popup => {
    popup.addEventListener('click', (evt) => {
      closePopup();
    })
  })

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape')
      closePopup();
  })
}

function catchClick(element)
{
  element.addEventListener('click', (evt) => {
    evt.stopPropagation();
  })
}

function configureCloseFunction()
{
  addPopupCloseFunction()

  const image = document.querySelector('.popup__photo-image');
  catchClick(image)

  const formArray = Array.from(document.querySelectorAll('.popup__form'));
  formArray.forEach(form => catchClick(form));

}

configureCloseFunction();