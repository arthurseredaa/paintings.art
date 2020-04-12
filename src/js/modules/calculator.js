const calculator = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size),
        materialBlock = document.querySelector(material),
        optionsBlock = document.querySelector(options),
        promoBlock = document.querySelector(promocode),
        resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFunc = () => {
    sum = ((+sizeBlock.value * +materialBlock.value) + (+optionsBlock.value)).toFixed(1); //добавил скобки для удобочитаемости.

    if(sizeBlock.value == "" || materialBlock.value == "") {
      resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
    } else if(promoBlock.value == "IWANTPOPART") {
      resultBlock.textContent = (sum * 0.7).toFixed(0);
    } else {
      resultBlock.textContent = sum;
    }
  };

  sizeBlock.addEventListener('change', calcFunc);
  materialBlock.addEventListener('change', calcFunc);
  optionsBlock.addEventListener('change', calcFunc);
  promoBlock.addEventListener('input', calcFunc);

}

export default calculator;