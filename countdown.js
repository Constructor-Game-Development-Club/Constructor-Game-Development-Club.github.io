// Countdown to Game Jam #1 — theme reveal, Friday 16 October 2026, 18:35
// Used on index.html and jams.html. Both pages have the same four span ids,
// so one script serves both.

// --- Data ---
const TARGET = new Date("2026-10-16T18:35:00");

// --- Refs ---
const daysEl  = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minsEl  = document.getElementById("mins");
const secsEl  = document.getElementById("secs");
const noteEl  = document.getElementById("countdown-note");

// Milliseconds in each unit — makes the maths below readable
const SEC  = 1000;
const MIN  = SEC * 60;
const HOUR = MIN * 60;
const DAY  = HOUR * 24;

// Always show two digits: 7 becomes "07"
function pad(n) {
  return String(n).padStart(2, "0");
}

// --- Render ---
function renderCountdown() {
  const left = TARGET - new Date();

  // Jam has started or finished
  if (left <= 0) {
    daysEl.textContent  = "00";
    hoursEl.textContent = "00";
    minsEl.textContent  = "00";
    secsEl.textContent  = "00";
    if (noteEl) noteEl.textContent = "The jam has started. See you there.";
    clearInterval(ticker);
    return;
  }

  // Whole days, then the remainder feeds the next unit down
  daysEl.textContent  = pad(Math.floor(left / DAY));
  hoursEl.textContent = pad(Math.floor((left % DAY) / HOUR));
  minsEl.textContent  = pad(Math.floor((left % HOUR) / MIN));
  secsEl.textContent  = pad(Math.floor((left % MIN) / SEC));
}

// --- Exec ---
// Render once immediately, otherwise the page shows 00:00:00:00 for a full
// second before the first interval tick fires.
renderCountdown();
const ticker = setInterval(renderCountdown, 1000);
