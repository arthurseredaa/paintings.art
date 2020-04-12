// import checkNumsInput from './checkNumsInput';
// checkNumsInput('input[name="user_phone"]');
import {postData} from './services/requests';

const forms = () => {

  const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        uploadInput = document.querySelectorAll('[name="upload"]');

  const path = {
    consultation: "./assets/server.php",
    designer: "./assets/consultation.php"
  };

  let message = {
    loading: "Отправка данных...",
    success: "Спасибо! Мы скоро свяжемся с вами!",
    failure: "Произошла ошибка =(",
    successImg: './assets/img/tick.svg',
    failureImg: './assets/img/close.svg'
  };
  

  form.forEach(elem => {
    elem.addEventListener('submit', (e) => {
      e.preventDefault();
      //Создаем блок который будет сообщать статус
      let statusMessage = document.createElement('div'),
          statusImg = document.createElement('img');
      statusMessage.classList.add('status');
      statusImg.setAttribute("width", "30");

      elem.parentNode.appendChild(statusImg);
      elem.parentNode.appendChild(statusMessage);

      elem.classList.add('animated', 'fadeOut');
      setTimeout(() => {
        elem.style.display = "none";
      }, 500);

      
      let spinner = document.createElement('div');
      spinner.classList.add('lds-dual-ring', 'animated', 'fadeIn');
      statusMessage.appendChild(spinner);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(elem);
      let api;
      elem.closest('.popup-design') || elem.classList.contains('calc-form') ? api = path.designer : api = path.consultation;

      postData(api, formData)
        .then(result => {
          console.log(result);
          statusImg.setAttribute("src", message.successImg);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusImg.setAttribute("src", message.failureImg);
          statusMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
            statusImg.remove();
            elem.display = "block";
            elem.classList.remove('fadeOutUp');
            elem.style.display = "block";
            elem.classList.add('fadeInUp');
          }, 10000);
        });
    });
  });

  const clearInputs = () => {
    input.forEach(elem => {
      elem.value = "";
    });
    uploadInput.forEach(elem => {
      elem.value = "";
    });
  }
  
  uploadInput.forEach(elem => {
    elem.addEventListener('input', () => { 
      let dots,
          arr = elem.files[0].name.split('.');

      arr[0].length <= 11 ? dots = "." : dots = "...";
      const fileName = arr[0].substring(0, 6) + dots + arr[1];
      // FIX: треба або створювати блок або щось робити з інпутом
      document.querySelector('#fileName').textContent = `Вы загрузили: ${fileName}`;
    });
  });
};

export default forms;