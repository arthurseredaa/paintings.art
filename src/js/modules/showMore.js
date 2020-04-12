import {getData} from './services/requests';

const showMore = (trigger, wrapper) => {
  let btn = document.querySelector(trigger);

  btn.addEventListener('click', (event) => {
    event.target.remove();
    let spinner = document.createElement('div');
    spinner.classList.add('lds-dual-ring');
    document.querySelector('#styles .row').appendChild(spinner);

    getData('assets/db.json')
      .then(result => {
        spinner.remove();
        createCards(result.styles);
      })
      .catch((e) => {
        spinner.remove();
        let errorBlock = document.createElement('div');
        errorBlock.classList.add('errorBlock');
        errorBlock.innerHTML = `Упс!Возникла ошибка при отправке запроса на сервер<br /> ${e}, статус: ${e.statusText}`;
        document.querySelector('#styles .row').appendChild(errorBlock);
      });
  });

  function createCards(response) {
    response.forEach(({src, title, link}) => {
      let card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
        <div class=styles-block>
          <img src=${src} alt="style">
          <h4>${title}</h4>
          <a href="${link}">Подробнее</a>
        </div>
      `;
      document.querySelector(wrapper).appendChild(card);
    });
  }
};

export default showMore;