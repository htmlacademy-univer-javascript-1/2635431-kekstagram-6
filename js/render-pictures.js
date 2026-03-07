const picturesContainer = document.querySelector('.pictures');
const template = document.querySelector('#picture');

const renderPictures = (pictures) => {
  // Удаляем старые миниатюры (кроме секции загрузки)
  picturesContainer.querySelectorAll('.picture').forEach((el) => el.remove());

  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const element = template.content.querySelector('.picture').cloneNode(true);
    element.querySelector('.picture__img').src = picture.url;
    element.querySelector('.picture__img').alt = picture.description;
    element.querySelector('.picture__comments').textContent = picture.comments.length;
    element.querySelector('.picture__likes').textContent = picture.likes;
    element.dataset.id = picture.id;
    fragment.appendChild(element);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
