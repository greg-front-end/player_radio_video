import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
  const audio = document.querySelector('.audio');
  const audioImg = document.querySelector('.audio-img');
  const audioHeader = document.querySelector('.audio-header');
  const audioPlayer = document.querySelector('.audio-player');
  const audioNavigation = document.querySelector('.audio-navigation');
  const audioButtonPlay = document.querySelector('.audio-button__play');
  const audioProgress = document.querySelector('.audio-progress');
  const audioProgressTiming = document.querySelector('.audio-progress__timing');
  const audioTimePassed = document.querySelector('.audio-time__passed');
  const audioTimeTotal = document.querySelector('.audio-time__total');
  const audioVolume = document.querySelector('.video-volume');
  const volumeMute = document.querySelector('.volume-mute');
  const volumeFull = document.querySelector('.volume-full');

  // Подключение файлов из папки audio
  const playList = ['hello', 'flow', 'speed'];

  // Переменная песни которая воспроизводится
  let trackIndex = 0;

  // Функция запука или переключения поейлиста
  const loadTrack = () => {
    
    const isPlayed = audioPlayer.paused;
    const track = playList[trackIndex];

    audioImg.src = `./audio/${track}.jpg`;
    audioHeader.textContent = track.toUpperCase();
    audioPlayer.src = `./audio/${track}.mp3`;

    if(isPlayed) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
  };

  // функция переключения песен
  const prevtTrack = () => {
    if( trackIndex !== 0) {
      trackIndex--;
    } else {
      trackIndex = playList.length - 1;
    }
     loadTrack();
  };
  const nextTrack = () => {
    if( trackIndex === playList.length - 1) {
      trackIndex = 0;
    } else {
      trackIndex++;
    }
     loadTrack();
  };

  // функция которая возвращает значение минуту или секунду с 0
  



  //Событие которое запускает либо переключает песни
  audioNavigation.addEventListener('click', event => {
    const target = event.target;

    //  Условие для переключения кнопок "пауза и плей"
    if(target.classList.contains('audio-button__play')) {
      audio.classList.toggle('play');
      audioButtonPlay.classList.toggle('fa-play');
      audioButtonPlay.classList.toggle('fa-pause');


      // Условие для запуска или паузы плейлиста
      if(audioPlayer.paused) {
        audioPlayer.play();
      } else {
        audioPlayer.pause();
      }

      // Событие для обьявление названия трека при нажатии на плей
      const track = playList[trackIndex];
      audioHeader.textContent = track.toUpperCase();
    }

    // Условие для переключения трека "След. или Пред."
    if(target.classList.contains('audio-button__prev')) {
      prevtTrack();
    }
    if(target.classList.contains('audio-button__next')) {
      nextTrack();
    }

  });

  // Событие автопереключения трека по завершению
  audioPlayer.addEventListener('ended', () => {
    nextTrack();
    audioPlayer.play();
  });

  // Переключение времени трека
  audioPlayer.addEventListener('timeupdate', () => {
    const duration = audioPlayer.duration;
    const currentTime = audioPlayer.currentTime;
    const progress = (currentTime / duration) * 100;

    // Шкала прогресса трека
    audioProgressTiming.style.width = progress + '%';

    // переменные минут и секунд
    const minutePassed = Math.floor(currentTime / 60) || '0';
    const secondsPassed = Math.floor(currentTime % 60) || '0';
    // переменные секунд
    const minuteTotal = Math.floor(duration / 60) || '0';
    const secondsTotal = Math.floor(duration % 60) || '0';

    audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
    audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
  });

  // Переключение по шкале прогресса песни
  audioProgress.addEventListener('click', e => {
    const x = event.offsetX;
    const allWidth = audioProgress.clientWidth;
    const progress = (x / allWidth) * audioPlayer.duration; 
    audioPlayer.currentTime = progress;
  });
};