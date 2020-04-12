import modals from './modules/modals';
import slider from './modules/sliders';
import forms from './modules/forms';
import mask from './modules/mask';
import showMore from './modules/showMore';
import calculator from './modules/calculator';
import filter from './modules/filter';
import showPicture from './modules/hoverShowPictures';
import accordeon from './modules/accordeon';
import burger from './modules/burger';
import scrolling from './modules/smoothScroll';
import dragndrop from './modules/dragndrop';

window.addEventListener('DOMContentLoaded', () => {
  "use strict";
  // TODO: зробити асинхронну відправку фотки в dragndrop.js
  modals();
  slider('.main-slider-item', '', '', 'vertical', 7000);
  slider('.feedback-slider-item', '.main-prev-btn', '.main-next-btn','horizontal', 10000);
  forms();
  // mask('[name=phone]');
  showMore('.button-styles', '#styles .row');
  calculator('#size', '#material', '#options', '.promocode', '.calc-price');
  filter();
  showPicture('.sizes-block');
  accordeon('.accordion-block', '.accordion-heading');
  burger('.burger-menu', '.burger');
  scrolling('.pageup');
  dragndrop();
});