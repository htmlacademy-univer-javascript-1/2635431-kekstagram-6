import { sendData } from './api.js';
import { initScale } from './scale.js';
import { initEffects } from './effects.js';
import { initValidation } from './validate.js';

const form = document.querySelector('.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileInput = document.querySelector('.img-upload__input');
const cancelButton = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const hashtagsInput = form.querySelector('.text__hashtags');
const descriptionInput = form.querySelector('.text__description');
const slider = document.querySelector('.effect-level__slider');

let scaleControls;
let effectControls;
let pristine;

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.cloneNode(true);
  document.body.appendChild(template);
  const successSection = document.querySelector('.success');

  const close = () => successSection.remove();

  successSection
    .querySelector('.success__button')
    .addEventListener('click', close);

  const onKey = (evt) => {
    if (evt.key === 'Escape') {
      close();
      document.removeEventListener('keydown', onKey);
    }
  };
  document.addEventListener('keydown', onKey);

  successSection.addEventListener('click', (evt) => {
    if (!evt.target.closest('.success__inner')) { close(); }
  });
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content.cloneNode(true);
  document.body.appendChild(template);
  const errorSection = document.querySelector('.error');

  const close = () => errorSection.remove();

  errorSection.querySelector('.error__button').addEventListener('click', close);

  const onKey = (evt) => {
    if (evt.key === 'Escape') {
      close();
      document.removeEventListener('keydown', onKey);
    }
  };
  document.addEventListener('keydown', onKey);

  errorSection.addEventListener('click', (evt) => {
    if (!evt.target.closest('.error__inner')) { close(); }
  });
};

const resetForm = () => {
  form.reset();
  if (scaleControls) {
    scaleControls.resetScale();
  }
  if (effectControls) {
    effectControls.resetEffects();
  }
  if (pristine) {
    pristine.reset();
  }
};

const closeUploadForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
  fileInput.value = '';
  document.removeEventListener('keydown', onEscKeydown);
};

function onEscKeydown(evt) {
  if (evt.key === 'Escape') {
    const focused = document.activeElement;
    if (focused === hashtagsInput || focused === descriptionInput) { return; }
    closeUploadForm();
  }
}

const openUploadForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeydown);
};

const initUpload = () => {
  scaleControls = initScale();
  effectControls = initEffects(slider);

  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error',
  });

  initValidation(form, pristine);

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) { return; }

    const url = URL.createObjectURL(file);
    document.querySelector('.img-upload__preview img').src = url;

    document.querySelectorAll('.effects__preview').forEach((el) => {
      el.style.backgroundImage = `url(${url})`;
    });

    openUploadForm();
  });

  cancelButton.addEventListener('click', closeUploadForm);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!pristine.validate()) {
      return;
    }

    submitButton.disabled = true;

    sendData(new FormData(form))
      .then(() => {
        closeUploadForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
};

export { initUpload };
