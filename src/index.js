import { initCarousel } from './js/carousel';
import { generateCarousel } from './js/search';
import generateKeyboard from './js/keyboard';
import '../node_modules/owl.carousel2/dist/assets/owl.theme.default.min.css';

window.onload = () => {
  initCarousel();
  generateCarousel('Dream');
  generateKeyboard();
};
