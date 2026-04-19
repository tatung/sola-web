(function () {
  function setupSlider(slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.research-slide'));
    if (slides.length <= 1) {
      return;
    }

    var current = slides.findIndex(function (el) {
      return el.classList.contains('is-active');
    });

    if (current < 0) {
      current = 0;
      slides[0].classList.add('is-active');
      slides[0].setAttribute('aria-hidden', 'false');
    }

    var dotsContainer = slider.querySelector('.research-slider__dots');
    var dots = [];

    if (dotsContainer) {
      slides.forEach(function (slide, index) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'research-slider__dot';
        dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
        dot.setAttribute('role', 'tab');
        dot.addEventListener('click', function () {
          setActive(index);
        });
        dotsContainer.appendChild(dot);
        dots.push(dot);
      });
    }

    function setActive(index) {
      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');

        if (dots[i]) {
          dots[i].classList.toggle('is-active', active);
          dots[i].setAttribute('aria-selected', active ? 'true' : 'false');
        }
      });
      current = index;
    }

    function next() {
      setActive((current + 1) % slides.length);
    }

    function prev() {
      setActive((current - 1 + slides.length) % slides.length);
    }

    var nextButton = slider.querySelector('[data-slider-next]');
    var prevButton = slider.querySelector('[data-slider-prev]');

    if (nextButton) {
      nextButton.addEventListener('click', next);
    }

    if (prevButton) {
      prevButton.addEventListener('click', prev);
    }

    setActive(current);

    var intervalMs = parseInt(slider.getAttribute('data-autoplay-ms') || '4500', 10);
    var timer = setInterval(next, intervalMs);

    slider.addEventListener('mouseenter', function () {
      clearInterval(timer);
    });

    slider.addEventListener('mouseleave', function () {
      clearInterval(timer);
      timer = setInterval(next, intervalMs);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var sliders = document.querySelectorAll('.research-slider');
    sliders.forEach(setupSlider);
  });
})();
