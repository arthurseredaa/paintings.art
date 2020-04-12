/* 
  list of drag and drop events:
  * - ивенты которые отмечены звездочкой нужны для перетаскивания обьектов внутри страницы или из страницы на декстоп 
  drag *
  dragend *
  dragenter - когда перетаскиваемый обьект над droparea
  dragexit *
  dragleave - обьект за пределами droparea
  dragover - обьект висит над droparea
  dragstart *
  drop - когда пользователь отпустил кнопку мыши и файл упал в droparea
*/
import {postData} from './services/requests';
const dragndrop = () => {
  const fileInputs = document.querySelectorAll('[name="upload"]');

  ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(events) {
    events.preventDefault();
    events.stopPropagation();
  }

  function highlight(elem) {
    // elem.closest(".file_upload").style.border = "5px solid black";
    elem.closest(".file_upload").style.background = "#b388ff";
    elem.closest(".file_upload").style.borderRadius = "25px";
  }

  function unhighlight(elem) {
    elem.closest(".file_upload").style.border = "none";
    elem.closest(".file_upload").style.borderRadius = "25px";
    elem.closest(".file_upload").style.background = "rgba(77,10,73, .2)";
  }

  ["dragenter", "dragover"].forEach(eventName => {
    fileInputs.forEach(input => {
      input.addEventListener(
        eventName,
        () => {
          highlight(input);
        },
        false
      );
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener('dragleave', () => {
      input.closest('.file_upload').style.background = "#eded";
    });
  });

  fileInputs.forEach(input => {
    input.addEventListener("drop", e => {
      input.files = e.dataTransfer.files;
      //*- асинхронная отправка файла с инпута
      if(input.getAttribute('id') == "asyncInput") {
        console.log(input.files[0].name);
        let formData = new FormData();
        formData.append("portrait", input.files[0], 'portrait image');
        postData('./assets/server.php', formData)
          .then(res => {
            console.log(res);
            document.querySelector("#fileName").textContent = `Вы отправили: ${fileName}`;
          })
          .catch(e => console.log(e));
      }
      unhighlight(input);

      let dots,
        arr = input.files[0].name.split(".");

      arr[0].length <= 11 ? (dots = ".") : (dots = "...");
      const fileName = arr[0].substring(0, 6) + dots + arr[1];
      document.querySelector("#fileName").textContent = `Вы загрузили: ${fileName}`;
    });
  });
};

export default dragndrop;
