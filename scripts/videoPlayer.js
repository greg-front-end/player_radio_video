import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
  const videoNavigation = document.querySelector('video-navigation');
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed  = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotal  = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');
  const volumeMute = document.querySelector('.volume-mute');
  const volumeFull = document.querySelector('.volume-full');




  // Функция для переключения иконки паузы на иконку плей
  const toggleIcon = () => {
    if(videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }
  };
  // Функция запуска видео плеера
  const togglePlay = () => {
    if(videoPlayer.paused){
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  
  };

  // функция для остановки видео и сброса шкалы времени
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime  = 0;
  }

  // Событие на Переключение кнопки "Полная громкость" + Переключение кнопки "Без звука" на кнопку "Полный звук"
  const toggleFull = () => {
    if(videoPlayer.volume >= 0) {
      volumeMute.classList.add('fa-volume-down');
      volumeMute.classList.remove('fa-volume-off');
    } else  {
      volumeMute.classList.remove('fa-volume-down');
      volumeMute.classList.add('fa-volume-off');

    }
  };
  // Событие на  громкость звука "Выкл"/ "Вкл"  связанная с функцией "toggleFull"
  const videoFull = () => {
    if(videoPlayer.volume = videoVolume.value >= 0) {
      videoVolume.value = 100;
    } else {
      videoVolume.value = videoPlayer.volume <= 100;

    }
  };
  volumeFull.addEventListener('click', toggleFull);
  volumeFull.addEventListener('click', videoFull);



  // событие для запуска видео
  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);

  videoPlayer.addEventListener('play', toggleIcon);
  videoPlayer.addEventListener('pause', toggleIcon);
  
  // событие для кнопки стоп
  videoButtonStop.addEventListener('click', stopPlay);

  // Событие для запуска исчисления времени
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

   // 
    videoProgress.value = (currentTime / duration) * 100;
   // Переенная для округления и создания минут
    let minutePassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

   // Переенная для округления и создания секунд
    let minuteTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

   // Исчисление минут и секунд
    videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  // Обработчик события для шкалы прогресса видео и возможности переключения по шкале
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration) / 100;
  });
  
  // События для полноэкранного режима
  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen();
  });
  
  // Обработчик шкалы звука. Возможно плавного смещение по шкале и доб или удал иконки
  videoVolume.addEventListener('input', () => {
    
    if(videoPlayer.volume = videoVolume.value > 0) {
      volumeMute.classList.add('fa-volume-down');
      volumeMute.classList.remove('fa-volume-off');
    } else {
      volumeMute.classList.remove('fa-volume-down');
      volumeMute.classList.add('fa-volume-off');
    }

    videoPlayer.volume = videoVolume.value / 100;
  });

  // обработчик события для переключения шкалы звука и возврата на прежнее место
  let volumemute = videoVolume.value;
  volumeMute.onclick = function(){

    if(videoPlayer.volume !=0) {
      volumemute = videoPlayer.volume * 100;
      volumeMute.classList.toggle('fa-volume-down');
      volumeMute.classList.toggle('fa-volume-off');
      videoPlayer.volume = 0;
      videoVolume.value = 0;
      console.log('toggle-mute');
    } else {
      volumeMute.classList.toggle('fa-volume-off');
      volumeMute.classList.toggle('fa-volume-down');
      videoPlayer.volume = volumemute / 100;
      videoVolume.value = volumemute;
      console.log('toggle-on');
    }
    
  }


  videoVolume.value = videoPlayer.volume * 100;
  
};