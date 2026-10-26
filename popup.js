let timeLeft = 25 * 60; // 25 minutes in seconds
let timerRunning = false;
let timerInterval;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const clearBtn = document.getElementById('clearData');

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Update display
timerDisplay.textContent = formatTime(timeLeft);

// Start button
startBtn.addEventListener('click', () => {
  if (!timerRunning) {
    timerRunning = true;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = formatTime(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon128.png',
          title: 'FocusPulse',
          message: 'Time is up! Take a break ☕'
        });
      }
    }, 1000);
  }
});

// Pause button
pauseBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
});

// Reset button
resetBtn.addEventListener('click', () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timeLeft = 25 * 60;
  timerDisplay.textContent = formatTime(timeLeft);
});

// Clear data button — PRIVACY FEATURE!
clearBtn.addEventListener('click', () => {
  if (confirm('⚠️ Delete ALL your FocusPulse data? This cannot be undone!')) {
    chrome.storage.local.clear(() => {
      alert('✅ All data deleted from your device.');
    });
  }
});

// Save session when it ends — LOCALLY ONLY
chrome.storage.local.get(['sessions'], (result) => {
  let sessions = result.sessions || [];
  // We'll add more here later
});