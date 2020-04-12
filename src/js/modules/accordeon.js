const accordeon = (accordeonBlock, accordeonHeading) => {
  let blocks = document.querySelectorAll(accordeonBlock),
      heads = document.querySelectorAll(accordeonHeading);

  blocks.forEach(elem => {
    elem.classList.remove('showAccordeonBlock');
    elem.classList.add('hideAccordeonBlock');
    // elem.style.display = "none";
  });

  heads.forEach(elem => {
    elem.style.color = "#333";
  });

  heads.forEach((head, index) => {
    head.onclick = () => {
      blocks.forEach((elem, blockIndex) => {
        if(index === blockIndex) {
          blocks[blockIndex].classList.toggle('showAccordeonBlock');
          head.classList.add('activeAccordeonHeading', 'active-style');
        }
        if(index !== blockIndex) {
          blocks[blockIndex].classList.remove('showAccordeonBlock');
        }
      });
    }
  });
};
export default accordeon;