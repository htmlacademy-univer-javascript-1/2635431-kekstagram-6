// 1. Проверка длины строки
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}
// Cтрока короче 20 символов
checkStringLength('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStringLength('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStringLength('проверяемая строка', 10); // false

// 2. Проверка на палиндром
function isPalindrome(string) {
  const normalized = string.replaceAll(' ', '').toLowerCase();
  let reversed = '';

  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }

  return normalized === reversed;
}
// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс');  // false

// 3. Извлечение цифр из строки (доп. задание)
function extractDigits(value) {
  const string = value.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (!Number.isNaN(parseInt(char, 10))) {
      result += char;
    }
  }

  if (result === '') {
    return NaN;
  }

  return parseInt(result, 10);
}
extractDigits('2023 год');            // 2023
extractDigits('ECMAScript 2022');     // 2022
extractDigits('1 кефир, 0.5 батона'); // 105
extractDigits('агент 007');           // 7
extractDigits('а я томат');           // NaN
extractDigits(2023); // 2023
extractDigits(-1);   // 1
extractDigits(1.5);  // 15
