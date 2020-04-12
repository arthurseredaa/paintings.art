const burger = (menuSelector, burgerSelector) => {
  const menu = document.querySelector(menuSelector),
        burgerBtn = document.querySelector(burgerSelector);

  // menu.style.display = "none";
        
  burgerBtn.onclick = () => {
    menu.classList.toggle('active-burger');
  }

  window.addEventListener('resize', () => {
    if(window.screen.availWidth > 992) {
      menu.classList.remove('active-burger');
      menu.style.display = "none";
    }
  });
};

export default burger;