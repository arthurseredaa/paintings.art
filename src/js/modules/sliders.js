//slidesSelector - селектор слайдеров
//prevSelector - селектор кнопки назад, можно не прописывать селектор и оставить ""
//nextSelector - селектор кнопки вперед, также можно не прописывать селектор, а оставить ""
//direction - направление слайда(доступно vertical и horizontal)
//ms - интервал между сменой слайдов
const slider = (slidesSelector, prevSelector, nextSelector, direction, ms) => {
  let slideIndex = 1,
      sliderPaused = false;
  let items = document.querySelectorAll(slidesSelector);

  
  const showSlides = (n) => {
    // замыкаем слайдер
    if(n > items.length) {
      slideIndex = 1;
    }
    if(n < 1) {
      slideIndex = items.length;
    }
    //прячем все слайды
    items.forEach(item => {
      item.classList.add('animated');
      item.style.display = "none";
    });
    //показываем только нужный слайд
    items[slideIndex - 1].style.display = "block";
  }//showSlides

  showSlides(slideIndex);

  const moveSlides = (n) => {
    showSlides(slideIndex +=n)
  }

  const activateAnimation = () => {
    if(direction == "vertical") {
      sliderPaused = setInterval(() => {
        moveSlides(1);
        items[slideIndex - 1].classList.add('slideInUp');
      }, ms);
    } else {
      sliderPaused = setInterval(() => {
        moveSlides(1);
        items[slideIndex - 1].classList.remove('slideInLeft');
        items[slideIndex - 1].classList.add('slideInRight');
      }, ms);
    }
  }

  activateAnimation();

  const parentSlider = items[0].parentNode;

  parentSlider.addEventListener('mouseenter', () => {
    clearInterval(sliderPaused);
  });

  parentSlider.addEventListener('mouseleave', () => {
    activateAnimation();
  });

  try {
    const prev = document.querySelector(prevSelector),
          next = document.querySelector(nextSelector);
    prev.onclick = () => {
      moveSlides(-1);
      items[slideIndex - 1].classList.remove('slideInRight');
      items[slideIndex - 1].classList.add('slideInLeft');
    };

    next.onclick = () => {  
      moveSlides(1);
      items[slideIndex - 1].classList.remove('slideInLeft');
      items[slideIndex - 1].classList.add('slideInRight');
    };
  } catch(error){}

};

export default slider;