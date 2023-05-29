// Get all slider containers
const sliderContainers = document.querySelectorAll('.slider-container');


// Iterate through each slider container
sliderContainers.forEach(container => {
  const slider = container.querySelector('.card-container');
  const leftButton = container.querySelector('.left-button');
  const rightButton = container.querySelector('.right-button');
  
  let counter=0;
  leftButton.addEventListener('click', () => {
    slider.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
    counter--;
    if (counter > 0) {
      rightButton.style.display = "block";
    } else{
      leftButton.style.display = "none";      
    }
    animateCard(slider)
  });

  rightButton.addEventListener('click', () => {
    slider.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
    counter++;
    if (counter < 3) {
      leftButton.style.display = "block";
    } else if (counter == 3) {
      rightButton.style.display = "none";
    }
    animateCard(slider)
  });
});

// Function to play the card animation
function animateCard(slider) {
    const cards = slider.querySelectorAll('.card');
    cards.forEach(card => {
      card.classList.add('animate');
      card.addEventListener('animationend', () => {
        card.classList.remove('animate');
      }, { once: true });
    });
  }

// Reset slider position to start
function resetSliderPosition(slider) {
  slider.scrollLeft = 0;
}

// Reset slider positions for all containers
sliderContainers.forEach(container => {
  const slider = container.querySelector('.cards-slider');
  resetSliderPosition(slider);
});