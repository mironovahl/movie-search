export default class Card {
  constructor(name, image, date, id) {
    this.name = name;
    if (image === 'N/A') {
      this.image = './img/no-poster.jpg';
    } else {
      this.image = image;
    }
    this.date = date;
    this.id = id;
  }

  generateCard() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'card';
    div.id = `${this.id}`;
    template += `<a class='film-name' href="https://www.imdb.com/title/${this.id}/videogallery/" target="_blank"><h2>${this.name}</h2></a>`;
    template += `<img class="image" src=${this.image} alt=poster ${this.date}>`;
    template += '<div class="card_text">';
    template += `<span class="film-date">${this.date}</span>`;
    template += '<span class="film-rating"></span>';
    template += '</div>';
    div.innerHTML = template;
    return div;
  }
}
