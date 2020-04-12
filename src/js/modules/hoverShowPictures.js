const showPictures = (blocksSelector) => {
  const blocks = document.querySelectorAll(blocksSelector);

  blocks.forEach(elem => {
    elem.classList.add('animated');
    elem.onmouseover = () => {
      showImg(elem);
    };
    elem.onmouseout = () => {
      hideImg(elem);
    };
  });

  function showImg(block) {
    const img = block.querySelector('img');
    img.src = img.src.slice(0, -4) + '-1.png';
    block.querySelectorAll('p:not(.sizes-hit)').forEach(elem => {
      elem.style.display = "none";
    });
  }

  function hideImg(block) {
    const img = block.querySelector('img');
    img.src = img.src.slice(0, -6) + '.png';
    block.querySelectorAll('p:not(.sizes-hit)').forEach(elem => {
      elem.style.display = "block";
    });
  }
};

export default showPictures;