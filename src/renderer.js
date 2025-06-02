// ストップウォッチアプリ本体
const StopwatchApp = (() => {
  // --- 状態管理 ---
  let timer = null;
  let isRunning = false;
  let elapsedTime = 0;
  let lastStartTimestamp = null; // 計測再開時の絶対時刻
  let mode = 'working'; // 'working' or 'break'

  // --- DOM取得 ---
  const startButton = document.getElementById('start');
  const stopButton = document.getElementById('stop');
  const resetButton = document.getElementById('reset');
  const display = document.getElementById('display');
  const modeLabel = document.getElementById('mode-label');
  const toggleModeCheckbox = document.getElementById('toggle-mode');

  // --- UI更新 ---
  function updateDisplay() {
    const seconds = Math.floor(elapsedTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes % 60
    ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    display.textContent = formattedTime;
  }

  function updateModeUI() {
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

  // --- ストップウォッチ操作 ---
  function start() {
    if (isRunning) return;
    isRunning = true;
    lastStartTimestamp = Date.now();
    timer = setInterval(() => {
      elapsedTime += 100;
      updateDisplay();
    }, 100);
  }

  function stop() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(timer);
    // スリープ復帰時の補正
    if (lastStartTimestamp) {
      const now = Date.now();
      const diff = now - lastStartTimestamp;
      if (diff > elapsedTime + 200) {
        elapsedTime += diff - elapsedTime;
        updateDisplay();
      }
    }
    lastStartTimestamp = null;
  }

  function reset() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    lastStartTimestamp = null;
    updateDisplay();
  }

  // --- モード切り替え ---
  function switchModeByCheckbox() {
    mode = toggleModeCheckbox.checked ? 'break' : 'working';
    updateModeUI();
    reset(); // モード切り替え時はリセット
  }

  // --- イベント登録 ---
  function addEventListeners() {
    startButton.addEventListener('click', start);
    stopButton.addEventListener('click', stop);
    resetButton.addEventListener('click', reset);
    toggleModeCheckbox.addEventListener('change', switchModeByCheckbox);
    window.addEventListener('focus', () => {
      // ウィンドウ復帰時のスリープ補正
      if (isRunning && lastStartTimestamp) {
        const now = Date.now();
        const diff = now - lastStartTimestamp;
        elapsedTime += diff - (elapsedTime % 100);
        lastStartTimestamp = now;
        updateDisplay();
      }
    });
  }

  // --- 初期化 ---
  function init() {
    updateModeUI();
    updateDisplay();
    addEventListeners();
  }

  // --- 外部公開 ---
  return { init };
})();

// アプリ初期化
StopwatchApp.init();
