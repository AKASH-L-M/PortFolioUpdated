window.Portfolio = window.Portfolio || {};

class Carousel {
  constructor(key) {
    this.key = key;
    this.track = document.getElementById(`${key}Track`);
    this.counter = document.getElementById(`${key}Counter`);
    this.dots = document.getElementById(`${key}Dots`);
    this.thumbs = document.getElementById(`${key}Thumbs`);
    this.slides = this.track ? [...this.track.querySelectorAll('.carousel-slide')] : [];
    this.current = 0;
    this.timer = null;
  }

  init() {
    if (!this.track || !this.slides.length) return false;
    this.buildDots();
    this.buildThumbnails();
    this.render();
    return true;
  }

  buildDots() {
    if (!this.dots) return;
    this.dots.replaceChildren(...this.slides.map((_, index) => {
      const button = document.createElement('button');
      button.className = 'carousel-dot';
      button.type = 'button';
      button.setAttribute('aria-label', `Go to slide ${index + 1}`);
      button.addEventListener('click', () => this.goTo(index));
      return button;
    }));
  }

  buildThumbnails() {
    if (!this.thumbs) return;
    this.thumbs.replaceChildren(...this.slides.map((slide, index) => {
      const button = document.createElement('button');
      const source = slide.querySelector('img')?.getAttribute('src') ?? '';
      button.className = 'carousel-thumb';
      button.type = 'button';
      button.setAttribute('aria-label', `Preview slide ${index + 1}`);
      const image = document.createElement('img');
      image.src = source;
      image.alt = '';
      image.loading = 'lazy';
      button.append(image);
      button.addEventListener('click', () => this.goTo(index));
      return button;
    }));
  }

  render() {
    this.track.style.transform = `translateX(-${this.current * 100}%)`;
    if (this.counter) this.counter.textContent = `${this.current + 1} / ${this.slides.length}`;
    this.updateActiveItems(this.dots, '.carousel-dot');
    this.updateActiveItems(this.thumbs, '.carousel-thumb', true);
  }

  updateActiveItems(container, selector, scroll = false) {
    if (!container) return;
    container.querySelectorAll(selector).forEach((item, index) => {
      const active = index === this.current;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
      if (active && scroll) {
        const targetLeft = item.offsetLeft
          - (container.clientWidth - item.clientWidth) / 2;

        container.scrollTo({
          left: Math.max(0, targetLeft),
          behavior: 'smooth',
        });
      }
    });
  }

  goTo(index) {
    this.current = (index + this.slides.length) % this.slides.length;
    this.render();
  }

  move(direction) {
    this.goTo(this.current + direction);
  }

  startAutoplay(delay) {
    if (!delay) return;
    this.timer = window.setInterval(() => this.move(1), delay);
  }
}

function initCarousels(keys, autoplay = {}) {
  const carousels = new Map();
  keys.forEach((key) => {
    const carousel = new Carousel(key);
    if (carousel.init()) {
      carousel.startAutoplay(autoplay[key]);
      carousels.set(key, carousel);
    }
  });

  document.addEventListener('click', (event) => {
    const control = event.target.closest('[data-carousel][data-direction]');
    if (!control) return;
    carousels.get(control.dataset.carousel)?.move(Number(control.dataset.direction));
  });
}

function initNameCarousel(delay = 850) {
  const track = document.getElementById('nameTrack');
  const slides = track ? track.querySelectorAll('.name-carousel-slide') : [];
  if (!slides.length) return;

  let current = 0;
  window.setInterval(() => {
    current = (current + 1) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
  }, delay);
}

window.Portfolio.Carousel = Carousel;
window.Portfolio.initCarousels = initCarousels;
window.Portfolio.initNameCarousel = initNameCarousel;

