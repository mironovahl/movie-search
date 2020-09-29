import { renderCard, addRating } from './generatecard';
import { error, showTranslate } from './label';
import { cleanCarousel } from './carousel';

const BUTTON = document.querySelector('.search-form__button');
const KEYBOARD = document.querySelector('.keyboard-button');
const CLEAN = document.querySelector('.clean-textarea');
const carus = jQuery('.owl-carousel');
let pages = 1;

async function getMovieRating(item) {
  try {
    const url = `https://www.omdbapi.com/?i=${item.imdbID}&apikey=665a97e2`;
    const res = await fetch(url);
    const rating = await res.json();
    if (!rating.Ratings[0]) {
      return 'no rating';
    }
    return rating.Ratings[0].Value;
  } catch (err) {
    const data = 'no rating';
    error(`Rating request error for "${item.Title}"`);
    return data;
  }
}

async function getinfoMovie(search, page) {
  try {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=665a97e2`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return error('Request error');
  }
}

const generateCarousel = (search, page) => {
  getinfoMovie(`${search}`, page).then((item) => {
    try {
      if (item.Response === 'True' && pages === 1) {
        cleanCarousel();
      }
      renderCard(item.Search);
      return item.Search;
    } catch (err) {
      return error(`No result for "${search}"`);
    }
  })
    .then((item) => {
      try {
        item.map((itemm) => {
          getMovieRating(itemm)
            .then((rating) => {
              addRating(itemm.imdbID, rating);
            });
          return 1;
        });
      } catch (err) {
        throw new Error('Error');
      }
      return 1;
    })
    .catch((err) => err);
};

async function translate(word) {
  try {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200504T160628Z.1458717be668da5f.4a4d138f65e8523c88a5c9e49bfb0e7cdb7a3fc8&text=${word}&lang=ru-en`;
    const res = await fetch(url);
    const trans = await res.json();
    return trans.text[0];
  } catch (err) {
    throw new Error('Error1');
  }
}

const searchFilm = () => {
  pages = 1;
  document.querySelector('.flower-loader').classList.remove('hidden');
  if (document.querySelectorAll('.error')) {
    document.querySelectorAll('.error').forEach((el) => el.remove());
  }
  if (document.querySelector('.translate')) document.querySelector('.translate').remove();
  const search = document.querySelector('.search-form__input').value;
  if (/[А-яёЁ]/.test(search)) {
    translate(search).then((item) => {
      showTranslate(item);
      generateCarousel(item, pages);
    });
  } else {
    generateCarousel(search, pages);
  }
};

KEYBOARD.addEventListener('click', () => {
  if (document.querySelector('.keyboard').classList.contains('hidden')) {
    document.querySelector('.keyboard').classList.remove('hidden');
  } else {
    document.querySelector('.keyboard').classList.add('hidden');
  }
});

BUTTON.addEventListener('click', (event) => {
  event.preventDefault();
  searchFilm();
});

CLEAN.onclick = () => {
  document.querySelector('.search-form__input').value = '';
};

carus.on('translated.owl.carousel', () => {
  if (document.querySelector('.owl-dots').lastChild.classList.contains('active')) {
    pages += 1;
    let search = document.querySelector('.search-form__input').value;
    if (search === '') search = 'Dream';
    if (document.querySelectorAll('.error')) {
      document.querySelectorAll('.error').forEach((el) => el.remove());
    }
    if (document.querySelector('.translate')) document.querySelector('.translate').remove();
    if (/[А-яёЁ]/.test(search)) {
      translate(search).then((item) => {
        showTranslate(item);
        generateCarousel(item, pages);
      });
    } else {
      generateCarousel(search, pages);
    }
  }
});

export { generateCarousel, searchFilm, getinfoMovie };
