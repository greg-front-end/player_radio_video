export const radioPlayerInit = () => {
  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');

  // создаем аудио поток
  const audio = new Audio();
  audio.type = 'audio/aac';

  //Блокируем кнопку плей
  radioStop.disabled = true;

  // Функция для смены иконки
  const chageIconPlay = () => {
    if(audio.paused) {
      radio.classList.remove('play')
      radioStop.classList.add('fa-play')
      radioStop.classList.remove('fa-stop')
    } else {
      radio.classList.add('play')
      radioStop.classList.add('fa-stop')
      radioStop.classList.remove('fa-play')
    }
  };

  // Событие для перебора в масиве || Далее удаляем класс у эллементов .radio-item
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }

  // обрабтчик событий 
  radioNavigation.addEventListener('change', event => {
    // Target Вызывает событие
    const target = event.target;

    // Получаем родителя переменной .radio-item
    const parrent = target.closest('.radio-item')
    selectItem(parrent);

    // получаем 
    const title = parrent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    // Переменная для картинки
    const urlImg = parrent.querySelector('.radio-img').src;
    
    //Указываем путь к изображению на пластинке
    radioCoverImg.src = urlImg;

    // разблакируем кнопку стоп
    radioStop.disabled = false;

    //Указываем путь к радиостанции
    //console.log(target.dataset.radioStantion);
    audio.src = target.dataset.radioStantion;
    
    audio.play();
    chageIconPlay();
  });

  // обработчик события для паузы или запуска радиовещания
  radioStop.addEventListener('click', () => {
    if(audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    chageIconPlay();
  });

  //radioVolume.addEventListener('input', () => {
    



  //  audio.volume = radioVolume.value / 100;
  //});

  //radioVolume.value = audioItem.volume * 100;

};