// ストップウォッチアプリ本体
const StopwatchApp = (() => {
  // --- 状態管理 ---
  let timer = null;
  let lastStartTimestamp = null; // 計測開始時の絶対時刻
  let mode = 'working'; // 'working' or 'break'

  // --- DOM取得 ---
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const display = document.getElementById('display');
  const modeLabel = document.getElementById('mode-label');
  const toggleModeCheckbox = document.getElementById('toggle-mode');

  // --- UI更新 ---
  function updateDisplay() {
    if (!lastStartTimestamp) {
      display.textContent = '00:00:00';
      if (window.electronAPI) window.electronAPI.updateTime('00:00:00', mode);
      return;
    }
    const now = Date.now();
    const elapsed = now - lastStartTimestamp;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes % 60
    ).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
    display.textContent = formattedTime;
    if (window.electronAPI) window.electronAPI.updateTime(formattedTime, mode);
  }

  function updateModeUI() {
    if (mode === 'break') {
      document.body.classList.add('light');
      modeLabel.textContent = 'Break';
      toggleModeCheckbox.checked = false;
    } else {
      document.body.classList.remove('light');
      modeLabel.textContent = 'Working';
      toggleModeCheckbox.checked = true;
    }
  }

  // --- ストップウォッチ操作 ---
  function start() {
    if (timer) return;
    lastStartTimestamp = Date.now();
    timer = setInterval(updateDisplay, 100);
  }

  function reset() {
    clearInterval(timer);
    timer = null;
    lastStartTimestamp = null;
    updateDisplay();
  }

  // --- モード切り替え ---
  function switchModeByCheckbox() {
    mode = toggleModeCheckbox.checked ? 'working' : 'break';
    updateModeUI();
    reset(); // モード切り替え時はリセット
    if (window.electronAPI) window.electronAPI.updateTime('00:00:00', mode);
  }

  // --- イベント登録 ---
  function addEventListeners() {
    startButton.addEventListener('click', start);
    resetButton.addEventListener('click', reset);
    toggleModeCheckbox.addEventListener('change', switchModeByCheckbox);
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

// Trayメニューからの操作を受け取る
if (window.electronAPI) {
  window.electronAPI.onTraySwitchMode(() => {
    document.getElementById('toggle-mode').checked =
      !document.getElementById('toggle-mode').checked;
    const event = new Event('change');
    document.getElementById('toggle-mode').dispatchEvent(event);
  });
  window.electronAPI.onTrayReset(() => {
    document.getElementById('reset').click();
  });
  window.electronAPI.onTrayStart(() => {
    document.getElementById('start').click();
  });
}
