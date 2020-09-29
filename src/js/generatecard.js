import Card from './card';
import { addItem } from './carousel';

const generateCards = (d) => {
  const cards = [];
  d.forEach((el) => {
    cards.push(new Card(el.Title, el.Poster, el.Year, el.imdbID));
  });
  return cards;
};

const renderCard = (data) => {
  document.querySelector('.flower-loader').classList.add('hidden');
  generateCards(data).forEach((el) => {
    const k = el.generateCard(data);
    addItem(k);
  });
};

const addRating = (id, rating) => {
  const l = document.querySelector(`#${id}`);
  const cc = l.querySelector('.film-rating');
  cc.innerHTML = rating;
};

export { renderCard, generateCards, addRating };
