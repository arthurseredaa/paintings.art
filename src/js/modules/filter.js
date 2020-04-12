const filter = () => {

  const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        btnAll = menu.querySelector('.all'),
        btnLovers = menu.querySelector('.lovers'),
        btnChef = menu.querySelector('.chef'),
        btnGirl = menu.querySelector('.girl'),
        btnGuy = menu.querySelector('.guy'),
        btnGrandmother = menu.querySelector('.grandmother'),
        btnGranddad = menu.querySelector('.granddad'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        markAll = wrapper.querySelectorAll('.all'),
        markGirl = wrapper.querySelectorAll('.girl'),
        markLovers = wrapper.querySelectorAll('.lovers'),
        markChef = wrapper.querySelectorAll('.chef'),
        markGuy = wrapper.querySelectorAll('.guy'),
        no = document.querySelector('.portfolio-no');  
  
  const typeFilter = (markType) => {
    markAll.forEach(elem => {
      elem.style.display = "none";
      elem.classList.remove('animated', 'fadeOut');
    });
    no.style.display = "none";
    no.classList.remove('animated', 'fadeIn');
    if(markType) {
      markType.forEach(elem => {
        elem.style.display = "block";
        elem.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = "block";
      no.classList.add('animated', 'fadeIn');
    }
  };

  let btnArr = [btnAll, btnLovers, btnChef, btnGirl, btnGuy, btnGranddad, btnGrandmother];    

  const bindFilter = (elems) => {
    elems.forEach(elem => {
      let cssClass = elem.getAttribute('class').split(" "),
          trueSelector = `.${cssClass[0]}`;
      elem.onclick = () => {
        if(wrapper.querySelectorAll(trueSelector).length === 0) {
          typeFilter();
        } else {
          typeFilter(wrapper.querySelectorAll(trueSelector));
        }
      };
    });
  };
  bindFilter(btnArr);

  //Переключение класа active
  menu.addEventListener('click', function(e) {
    let target = e.target;
    if(target && target.tagName == "LI") {
      /* 
        если кликнули на LI
        то забрать у всех li клас active
      */
      items.forEach(elem => elem.classList.remove('active'));
      // НО добавить этот клас li на который кликнули
      target.classList.add('active');
    }
  });
};

export  default filter;