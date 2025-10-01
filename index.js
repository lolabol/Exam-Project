let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("themeToggle");

function updateTime() {
  const now = performance.now();
  const diff = now - startTime + elapsedTime;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const milliseconds = Math.floor(diff % 1000);

  display.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(milliseconds).padStart(3, "0");
}

startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = performance.now();
    timer = setInterval(updateTime, 1);
    startStopBtn.textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(timer);
    elapsedTime += performance.now() - startTime;
    startStopBtn.textContent = "Start";
    isRunning = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00:000";
  startStopBtn.textContent = "Start";
});

// Dark/Light theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = 
    document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});