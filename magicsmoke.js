const smokeEffect = document.getElementById('smoke-effect');

function getRandomColor() {
  // let's generate a random color close to #2b2b45
  const red = 43 + Math.random() * 5; // random red component between 43 and 48
  const green = 43 + Math.random() * 5; // random green component between 43 and 48
  const blue = 69 + Math.random() * 5; // random blue component between 69 and 74
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function createRandomStar() {
  const star = document.createElement('div');
  star.className = 'smoke-star';
  const randomSize = Math.random() * 6 + 2; // random size
  star.style.width = `${randomSize}px`;
  star.style.height = `${randomSize}px`;
  const randomOpacity = Math.random() * 0.5 + 0.2; // random opacity
  star.style.opacity = randomOpacity;

  // 1% of elements brighter
  if (Math.random() < 0.01) {
    const brightFactor = 0.7 + Math.random() * 0.3; // adjust the brightness here
    star.style.backgroundColor = `rgba(255, 255, 255, ${brightFactor})`;
  } else {
  // colorize 15% of the elements - something close to the #2b2b45
    if (Math.random() < 0.15) {
      star.style.backgroundColor = getRandomColor();
    }
  }
  return star;
}

window.addEventListener('mousemove', (e) => {
  const container = document.querySelector('.circular-widget');
  const containerRect = container.getBoundingClientRect();
  const x = e.clientX - containerRect.left;
  const y = e.clientY - containerRect.top;

  for (let i = 0; i < 7; i++) { // generate "smoke" with stars particles
    const smokeParticle = createRandomStar();
    const randomX = x + Math.random() * 100 - 50; // random x position
    const randomY = y + Math.random() * 50 - 25; // random y position
    smokeParticle.style.top = `${randomY}px`;
    smokeParticle.style.left = `${randomX}px`;
    smokeEffect.appendChild(smokeParticle);

    setTimeout(() => {
      smokeParticle.style.transition = 'opacity 0.5s ease';
      smokeParticle.style.opacity = 0;
    }, 10000); // 10 secs visible, then fade-out

    setTimeout(() => {
      smokeParticle.remove();
    }, 10500); // 10500 - 10000 = 0.5s fade-out
  }
});
