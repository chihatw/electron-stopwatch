let timer;
let isRunning = false;
let elapsedTime = 0;
let lastStartTimestamp = null; // 計測再開時の絶対時刻

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const display = document.getElementById('display');
const modeLabel = document.getElementById('mode-label');
const toggleModeCheckbox = document.getElementById('toggle-mode');

let mode = 'working'; // 'working' or 'break'

function updateDisplay() {
  const seconds = Math.floor(elapsedTime / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const formattedTime = `${String(hours).padStart(2, '0')}:${String(
    minutes % 60
  ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  display.textContent = formattedTime;
}

function applyTheme() {
  if (mode === 'working') {
    document.body.classList.remove('light');
    modeLabel.textContent = 'Working';
    toggleModeCheckbox.checked = false;
  } else {
    document.body.classList.add('light');
    modeLabel.textContent = 'Break';
    toggleModeCheckbox.checked = true;
  }
}

function switchModeByCheckbox() {
  mode = toggleModeCheckbox.checked ? 'break' : 'working';
  applyTheme();
  isRunning = false;
  clearInterval(timer);
  elapsedTime = 0;
  lastStartTimestamp = null;
  updateDisplay();
}

startButton.addEventListener('click', () => {
  if (!isRunning) {
    isRunning = true;
    lastStartTimestamp = Date.now(); // 計測再開時の時刻を記録
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
    // スリープ復帰時の補正
    if (lastStartTimestamp) {
      const now = Date.now();
      const diff = now - lastStartTimestamp;
      // diffがelapsedTimeより大きい場合、スリープしていたとみなして補正
      if (diff > elapsedTime + 200) {
        elapsedTime += diff - elapsedTime;
        updateDisplay();
      }
    }
    lastStartTimestamp = null;
  }
});

resetButton.addEventListener('click', () => {
  isRunning = false;
  clearInterval(timer);
  elapsedTime = 0;
  lastStartTimestamp = null;
  updateDisplay();
});

toggleModeCheckbox.addEventListener('change', switchModeByCheckbox);

// ウィンドウがフォーカスを取り戻したときにスリープ復帰を検知して補正
window.addEventListener('focus', () => {
  if (isRunning && lastStartTimestamp) {
    const now = Date.now();
    const diff = now - lastStartTimestamp;
    elapsedTime += diff - (elapsedTime % 100);
    lastStartTimestamp = now;
    updateDisplay();
  }
});

// 初期テーマ適用
applyTheme();
