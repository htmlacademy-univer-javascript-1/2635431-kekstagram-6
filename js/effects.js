const EFFECTS = {
  none:   { filter: null },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia:  { filter: 'sepia',     min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert',    min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur',      min: 0, max: 3,  step: 0.1, unit: 'px' },
  heat:   { filter: 'brightness',min: 1, max: 3,  step: 0.1, unit: '' },
};

const initEffects = (slider) => {
  const preview = document.querySelector('.img-upload__preview img');
  const effectLevelValue = document.querySelector('.effect-level__value');
  const effectLevelContainer = document.querySelector('.img-upload__effect-level');
  const effectsRadios = document.querySelectorAll('.effects__radio');

  // Инициализируем noUiSlider
  noUiSlider.create(slider, {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  let currentEffect = 'none';

  const applyEffect = (value) => {
    const effect = EFFECTS[currentEffect];
    if (!effect || !effect.filter) {
      preview.style.filter = '';
      return;
    }
    preview.style.filter = `${effect.filter}(${value}${effect.unit})`;
    effectLevelValue.value = value;
  };

  const setEffect = (effectName) => {
    currentEffect = effectName;
    const effect = EFFECTS[effectName];

    preview.className = '';
    if (effectName !== 'none') {
      preview.classList.add(`effects__preview--${effectName}`);
    }

    if (!effect || !effect.filter) {
      effectLevelContainer.classList.add('hidden');
      preview.style.filter = '';
      return;
    }

    effectLevelContainer.classList.remove('hidden');

    slider.noUiSlider.updateOptions({
      range: { min: effect.min, max: effect.max },
      start: effect.max,
      step: effect.step,
    });

    applyEffect(effect.max);
  };

  slider.noUiSlider.on('update', (values) => {
    applyEffect(parseFloat(values[0]));
  });

  effectsRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      setEffect(radio.value);
    });
  });

  effectLevelContainer.classList.add('hidden');

  const resetEffects = () => {
    const noneRadio = document.querySelector('#effect-none');
    noneRadio.checked = true;
    setEffect('none');
  };

  return { resetEffects };
};

export { initEffects };
