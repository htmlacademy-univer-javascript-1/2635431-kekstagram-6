const MAX_HASHTAGS_COUNT = 5;
const HASHTAG_REGEX = /^#[a-zа-яёA-ZА-ЯЁ0-9]{1,19}$/i;

const initValidation = (form, pristine) => {
  const hashtagsInput = form.querySelector('.text__hashtags');
  const descriptionInput = form.querySelector('.text__description');

  const getHashtags = () =>
    hashtagsInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  const validateHashtagFormat = () => {
    const tags = getHashtags();
    if (tags.length === 0) {
      return true;
    }
    return tags.every((tag) => HASHTAG_REGEX.test(tag));
  };

  const validateHashtagCount = () => getHashtags().length <= MAX_HASHTAGS_COUNT;

  const validateHashtagUnique = () => {
    const tags = getHashtags();
    return tags.length === new Set(tags).size;
  };

  const validateDescription = () => descriptionInput.value.length <= 140;

  pristine.addValidator(
    hashtagsInput,
    validateHashtagFormat,
    'Неверный формат хэш-тега',
  );
  pristine.addValidator(
    hashtagsInput,
    validateHashtagCount,
    `Не более ${MAX_HASHTAGS_COUNT} хэш-тегов`,
  );
  pristine.addValidator(
    hashtagsInput,
    validateHashtagUnique,
    'Хэш-теги не должны повторяться',
  );
  pristine.addValidator(
    descriptionInput,
    validateDescription,
    'Комментарий не более 140 символов',
  );
};

export { initValidation };
