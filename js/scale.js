const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const initScale = () => {
  const smallerButton = document.querySelector('.scale__control--smaller');
  const biggerButton = document.querySelector('.scale__control--bigger');
  const scaleValue = document.querySelector('.scale__control--value');
  const preview = document.querySelector('.img-upload__preview img');

  const setScale = (value) => {
    scaleValue.value = `${value}%`;
    preview.style.transform = `scale(${value / 100})`;
  };

  setScale(SCALE_DEFAULT);

  smallerButton.addEventListener('click', () => {
    const current = parseInt(scaleValue.value, 10);
    const next = Math.max(current - SCALE_STEP, SCALE_MIN);
    setScale(next);
  });

  biggerButton.addEventListener('click', () => {
    const current = parseInt(scaleValue.value, 10);
    const next = Math.min(current + SCALE_STEP, SCALE_MAX);
    setScale(next);
  });

  const resetScale = () => setScale(SCALE_DEFAULT);
  return { resetScale };
};

export { initScale };
