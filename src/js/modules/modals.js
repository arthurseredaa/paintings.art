const modals = () => {
  let clickedBtn = false;
  function bindSelector(triggerSelector, modalSelector, closeSelector, hideTrigger = false,closeByOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();

    trigger.forEach(elem => {

      elem.addEventListener("click", (e) => {
        if (e.target) {
          e.preventDefault();
        }
        if(hideTrigger) {
          elem.style.display = "none";
        }
        windows.forEach(elem => {
          elem.style.display = "none";
          elem.classList.add('animated', 'fadeIn');
        });
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
        document.querySelector('.fixed-gift').style.marginRight = `${scroll}px`;
        clickedBtn = true;
      });
    });

    close.addEventListener("click", () => {
      windows.forEach(elem => {
        elem.style.display = "none";
      });
      modal.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";
      document.querySelector('.fixed-gift').style.marginRight = "0px";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal && closeByOverlay) {
        windows.forEach(elem => {
          elem.style.display = "none";
        });
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = "0px";
        document.querySelector('.fixed-gift').style.marginRight = "0px";
      }
    });
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.height = '50px';
    div.style.width = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
  }

  function showModalByTime(selector, ms) {
    setTimeout(() => {
      let display,
          scroll = calcScroll();

      document.querySelectorAll('[data-modal]').forEach(elem => {
        //проверка на то, открыто ли какое-то модальное окно
        if(getComputedStyle(elem).display !== 'none') {
          //используем переменную чтобы юзать ее булево значение(в этом случае будет true)
          display = 'block';
        }
      }); 
        //тоесть если другая модалка открыта, то display = true, а у условие !display = false поэтому оно не исполнится 
        if(!display) {
          document.querySelector(selector).style.display = 'block';
          document.querySelector(selector).classList.add('animated', 'fadeIn');
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${scroll}px`;
          document.querySelector('.fixed-gift').style.marginRight = `${scroll}px`;
        } 
    }, ms);
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      if(!clickedBtn && (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)) {
        document.querySelector(selector).click();
      }
    });
  }

  bindSelector('.button-design', '.popup-design', '.popup-design .popup-close');
  bindSelector('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindSelector('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  showModalByTime('.popup-consultation', 5000);
};

export default modals;
