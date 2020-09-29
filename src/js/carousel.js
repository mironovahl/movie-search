import 'owl.carousel2/dist/assets/owl.carousel.css';
import 'owl.carousel';

const carus = jQuery('.owl-carousel');
const initCarousel = () => carus.owlCarousel({
  items: 4,
  dotsEach: 1,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
  },
});

const addItem = (item) => {
  carus
    .trigger('add.owl.carousel', [item])
    .trigger('refresh.owl.carousel');
};

const cleanCarousel = () => {
  const cards = document.querySelectorAll('.card').length;
  for (let i = 0; i < cards; i += 1) {
    carus
      .trigger('remove.owl.carousel', 0);
  }
  carus
    .trigger('refresh.owl.carousel');
  return 1;
};

export { initCarousel, addItem, cleanCarousel };
