const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const caption = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentShownCount = bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const COMMENTS_PER_PAGE = 5;
let allComments = [];
let shownCount = 0;

const createCommentElement = ({ avatar, name, message }) => {
  const li = document.createElement('li');
  li.classList.add('social__comment');
  li.innerHTML = `
    <img class='social__picture' src='${avatar}' alt='${name}' width='35' height='35'>
    <p class='social__text'>${message}</p>
  `;
  return li;
};

const renderComments = () => {
  const nextComments = allComments.slice(
    shownCount,
    shownCount + COMMENTS_PER_PAGE,
  );
  nextComments.forEach((comment) => {
    commentsList.appendChild(createCommentElement(comment));
  });
  shownCount += nextComments.length;

  commentShownCount.textContent = `${shownCount} из ${allComments.length} комментариев`;

  if (shownCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  caption.textContent = picture.description;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;

  commentsList.innerHTML = '';
  allComments = picture.comments;
  shownCount = 0;
  commentsLoader.classList.remove('hidden');
  renderComments();
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};

const initBigPicture = () => {
  cancelButton.addEventListener('click', () => {
    closeBigPicture();
    document.removeEventListener('keydown', onDocumentKeydown);
  });

  commentsLoader.addEventListener('click', renderComments);

  document.querySelector('.pictures').addEventListener('click', (evt) => {
    const pictureLink = evt.target.closest('.picture');
    if (!pictureLink) {
      return;
    }
    evt.preventDefault();

    const id = Number(pictureLink.dataset.id);
    const picture =
      window.__kekstagramData &&
      window.__kekstagramData.find((p) => p.id === id);
    if (!picture) {
      return;
    }

    openBigPicture(picture);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export { initBigPicture };
