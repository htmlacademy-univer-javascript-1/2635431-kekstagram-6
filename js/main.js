import { getData } from './api.js';
import { renderPictures } from './render-pictures.js';
import { initBigPicture } from './big-picture.js';
import { initUpload } from './upload.js';

const filtersSection = document.querySelector('.img-filters');

const DEBOUNCE_DELAY = 500;
let allPictures = [];
let debounceTimer;

const debounce = (fn) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, DEBOUNCE_DELAY);
};

const getRandomUniqueItems = (arr, count) => {
  const copy = [...arr];
  const result = [];
  while (result.length < count && copy.length > 0) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
};

const applyFilter = (filterId) => {
  document.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.classList.remove('img-filters__button--active');
  });
  document.querySelector(`#${filterId}`).classList.add('img-filters__button--active');

  let filtered;
  if (filterId === 'filter-default') {
    filtered = allPictures;
  } else if (filterId === 'filter-random') {
    filtered = getRandomUniqueItems(allPictures, 10);
  } else if (filterId === 'filter-discussed') {
    filtered = [...allPictures].sort((a, b) => b.comments.length - a.comments.length);
  }
  renderPictures(filtered);
};

const initFilters = () => {
  filtersSection.classList.remove('img-filters--inactive');
  document.querySelectorAll('.img-filters__button').forEach((btn) => {
    btn.addEventListener('click', () => {
      debounce(() => applyFilter(btn.id));
    });
  });
};

const showDataError = (message) => {
  const div = document.createElement('div');
  div.style.cssText = `
    position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
    background: #ff4444; color: #fff; padding: 16px 24px;
    border-radius: 8px; font-size: 16px; z-index: 1000;
  `;
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
};

initUpload();
initBigPicture();

getData()
  .then((pictures) => {
    allPictures = pictures;
    window.__kekstagramData = pictures;
    renderPictures(pictures);
    initFilters();
  })
  .catch(() => {
    showDataError('Не удалось загрузить фотографии. Попробуйте обновить страницу.');
  });
