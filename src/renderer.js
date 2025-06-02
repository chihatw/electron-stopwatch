let timer;
let isRunning = false;
let elapsedTime = 0;

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');

function updateDisplay() {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes % 60
  ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  display.textContent = formattedTime;
}

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      elapsedTime += 100;
      updateDisplay();
    }, 100);
  }
});

stopButton.addEventListener('click', () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
});

resetButton.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
});
