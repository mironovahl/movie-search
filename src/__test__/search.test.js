async function getinfoMovie(search, page) {
  try {
    const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=665a97e2`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    return 'Request error';
  }
}

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
    return data;
  }
}

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

describe('getinfoMovie', () => {
  test('return data', () => {
    getinfoMovie('Dream', 1).then((item) => {
      expect(
        item,
        '{"Search":[{"Title":"Requiem for a Dream","Year":"2000","imdbID":"tt0180093","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BOTdiNzJlOWUtNWMwNS00NmFlLWI0YTEtZmI3YjIzZWUyY2Y3XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"},{"Title":"A Nightmare on Elm Street 3: Dream Warriors","Year":"1987","imdbID":"tt0093629","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjFkYTEwNjAtYWU1YS00NTMyLTkwYmUtZjEyMjZjMDg5Njc5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Dream House","Year":"2011","imdbID":"tt1462041","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTM5MzUxMDc5Ml5BMl5BanBnXkFtZTcwMTMwMjIwNg@@._V1_SX300.jpg"},{"Title":"Goal! The Dream Begins","Year":"2005","imdbID":"tt0380389","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMjAxNDk2Njk1OV5BMl5BanBnXkFtZTcwOTE5MzIzMQ@@._V1_SX300.jpg"},{"Title":"Cassandra\'s Dream","Year":"2007","imdbID":"tt0795493","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTI1NDg1NTY2N15BMl5BanBnXkFtZTcwNDY2MTU1MQ@@._V1_SX300.jpg"},{"Title":"A Nightmare on Elm Street 4: The Dream Master","Year":"1988","imdbID":"tt0095742","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BN2IwODlmN2ItOGU5NC00ZTBhLWJhZjItMTdkOTI1NTU4YzdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Arizona Dream","Year":"1993","imdbID":"tt0106307","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BNjViZTgwMGUtNTJkNS00Mjg1LTkwZWQtNTg1YWEyOWFhY2I0XkEyXkFqcGdeQXVyNDQ2MTMzODA@._V1_SX300.jpg"},{"Title":"A Nightmare on Elm Street: The Dream Child","Year":"1989","imdbID":"tt0097981","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZmMzNzc1ZTItMDJiOS00Y2UxLWEzZmEtMzBiNGNkYzNiNDBkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"},{"Title":"Goal II: Living the Dream","Year":"2007","imdbID":"tt0473360","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTIxNzI5NjAxNl5BMl5BanBnXkFtZTcwNzI2NTQ0MQ@@._V1_SX300.jpg"},{"Title":"A Midsummer Night\'s Dream","Year":"1999","imdbID":"tt0140379","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BZjI5YzcxZmUtMWUzOC00MGJmLWFjODgtYTlhNTViNjFmYzE5XkEyXkFqcGdeQXVyMTY2MzYyNzA@._V1_SX300.jpg"}],"totalResults":"3277","Response":"True"}',
      );
    });
  });
  test('return error', () => {
    getinfoMovie('pqoepojjfd', 1).then((item) => {
      expect(
        item,
        'Request error',
      );
    });
  });
});

describe('getMovieRating', () => {
  test('return rating', () => {
    getMovieRating('tt0180093').then((item) => {
      expect(
        item,
        '8.3/10',
      );
    });
  });
  test('return error', () => {
    getMovieRating('pqoepojjfd').then((item) => {
      expect(
        item,
        'no rating',
      );
    });
  });
});

describe('translate', () => {
  test('return translate', () => {
    translate('мечта').then((item) => {
      expect(
        item,
        'dream',
      );
    });
  });
});
