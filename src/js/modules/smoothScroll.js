const scrolling = (toTopSelector) => {
  const topItem = document.querySelector(toTopSelector);

  window.addEventListener('scroll', () => {
    if(document.documentElement.scrollTop > 1650) {
      // topItem.style.display = "block";
      topItem.classList.add('animated', 'fadeIn');
      topItem.classList.remove('fadeOut');
    } else {
      topItem.classList.add('fadeOut');
      topItem.classList.remove('fadeIn');
      // setTimeout(() => {topItem.style.display = "none"}, 500);
    }
  });

  let links = document.querySelectorAll('[href^="#"]'),
      speed = 0.2;

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault;

      let widthTop = document.documentElement.scrollTop,
          hash = this.hash,
          to = document.querySelector(hash).getBoundingClientRect().top,
          start = null;

      requestAnimationFrame(step);

      function step(time) {
        if(start === null) {
          start = time;
        }

        let progress = time - start,
            r = (to < 0 ? Math.max(widthTop - progress/speed, widthTop + to) : Math.min(widthTop + progress/speed, widthTop + to));
        document.documentElement.scrollTo(0, r);
        if(r != widthTop + to) {
          requestAnimationFrame(step);
        }else {
          location.hash = hash;
        }
      }
    });
  });
};

export default scrolling;