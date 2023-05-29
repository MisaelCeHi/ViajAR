// Get all slider containers
const sliderContainers = document.querySelectorAll('.slider-container');

// Iterate through each slider container
sliderContainers.forEach(container => {
  const slider = container.querySelector('.card-container');
  const leftButton = container.querySelector('.left-button');
  const rightButton = container.querySelector('.right-button');

  leftButton.addEventListener('click', () => {
    slider.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
    animateCard(slider)
  });

  rightButton.addEventListener('click', () => {
    slider.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
    animateCard(slider)
  });
});

function animateCard(slider) {
    const cards = slider.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('animate');
      card.addEventListener('animationend', () => {
        card.classList.remove('animate');
      }, { once: true });
    });
  }