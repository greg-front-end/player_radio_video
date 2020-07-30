// Подключение файлов JS
import { videoPlayerInit } from './videoPlayer.js';
import { radioPlayerInit } from './radioPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

// Получаем элементы из html. Кнопки.
const playerBtn = document.querySelectorAll('.player-btn')
const playerBlock = document.querySelectorAll('.player-block')
const temp = document.querySelector('.temp')

// Функция дективацию кнопок(табов)
const deactivationPlayer = () => {
  temp.style.display = 'none';
  playerBtn.forEach(item => item.classList.remove('active'));
  playerBlock.forEach(item => item.classList.remove('active'));

  // Вызов методов которые останавливают воспроизведение при смене таба
  musicPlayerInit.stop();
  videoPlayerInit.stop();
  radioPlayerInit.stop();
}
// Обработчик событий => Метод благодаря которым активируются кнопки
playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
  deactivationPlayer();
  btn.classList.add('active');
  playerBlock[i].classList.add('active');
}));



// Вызываем функции которые подключили через импорт
videoPlayerInit();
radioPlayerInit();
musicPlayerInit();