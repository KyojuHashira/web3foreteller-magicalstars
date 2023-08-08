// if you have any issues, welcome to https://github.com/KyojuHashira/traileffect/
const smokeEffect = document.getElementById('smoke-effect');

function getRandomGoldColor() {
  // let's generate a random color close to #deb940 with increased contrast and brightness
  const red = 222 + Math.random() * 10; // increase red for brightness
  const green = 185 + Math.random() * 10; // increase green for brightness
  const blue = 64 - Math.random() * 10; // reduce blue for contrast
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function getRandomColor() {
  // let's generate a random color close to #2b2b45
  const red = 43 + Math.random() * 2.5;
  const green = 43 + Math.random() * 2.5;
  const blue = 69 + Math.random() * 2.5;
  return `rgba(${red}, ${green}, ${blue}, 1)`;
}

function createRandomStar() {
  const star = document.createElement('div');
  star.className = 'smoke-star';
  const randomSize = Math.random() * 9 + 7; // random star size between 7 and 15 pixels
  star.style.width = `${randomSize}px`;
  star.style.height = `${randomSize}px`;
  const randomOpacity = Math.random() * 0.5 + 0.2; // random star opacity
  star.style.opacity = randomOpacity;

  // 1% chance for brighter and whiter particle
  if (Math.random() < 0.01) {
    const brightFactor = 0.7 + Math.random() * 0.3; // adjust the brightness here
    star.style.backgroundColor = `rgba(255, 255, 255, ${brightFactor})`;
  } else if (Math.random() < 0.005) { // set 0.5% chance for gold star
    star.style.backgroundColor = getRandomGoldColor();
    star.style.opacity = 1; // always high brightness for gold star
  } else {
    // colorize 15% of the elements (#2b2b45 stars)
    if (Math.random() < 0.15) {
      star.style.backgroundColor = getRandomColor();
    }
  }
  return star;
}

let lastCreationTime = performance.now();
const CREATION_INTERVAL = 100; // set interval (the higher the value, the fewer resources are required, and the less frequent the drawing of a random set of stars ranging from 3 to 5)

window.addEventListener('mousemove', (e) => {
  const container = document.querySelector('.circular-widget');
  const containerRect = container.getBoundingClientRect();
  const x = e.clientX - containerRect.left;
  const y = e.clientY - containerRect.top;

  const currentTime = performance.now();
  if (currentTime - lastCreationTime >= CREATION_INTERVAL) {
    const numberOfParticles = Math.floor(Math.random() * 3) + 3; // random stars amount between 3 and 5
    for (let i = 0; i < numberOfParticles; i++) {
      const smokeParticle = createRandomStar();
      const randomX = x + Math.random() * 60 - 30; // random star x position
      const randomY = y + Math.random() * 60 - 30; // random star y position
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
    lastCreationTime = currentTime;
  }
});
