const COLS = 4;
const ROWS = 3;
const TOTAL = COLS * ROWS;

let boardState = [];
let isPlaying = false;
let time = 0;
let timerInterval = null;
let steps = 0;
let history = [];

const COLORS = [
  'bg-green-100  text-green-600',
  'bg-pink-100   text-pink-500',
  'bg-blue-100   text-blue-500',
  'bg-purple-100 text-purple-500',
  'bg-yellow-100 text-yellow-600',
  'bg-pink-100   text-pink-500',
  'bg-blue-100   text-blue-500',
  'bg-gray-100   text-gray-500',
  'bg-emerald-100 text-emerald-600',
  'bg-amber-100  text-amber-500',
  'bg-lime-100   text-lime-600',
  'bg-red-100    text-red-500'
];

function initBoard() {
  boardState = [];
  for (let i = 1; i < TOTAL; i++) boardState.push(i);
  boardState.push(0);
  renderBoard();
}

function renderBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';
  boardState.forEach((num) => {
    const tile = document.createElement('div');
    if (num === 0) {
      tile.className = 'tile tile-empty rounded-xl shadow-inner';
    } else {
      tile.className =
        'tile rounded-xl shadow-sm ' + COLORS[(num - 1) % COLORS.length];
      tile.innerText = num;
    }
    boardEl.appendChild(tile);
  });
}

function updateTimer() {
  time++;
  document.getElementById('timer').innerText = formatTime(time);
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function toggleGame() {
  const btn = document.getElementById('startBtn');
  const winMsg = document.getElementById('winMsg');

  if (!isPlaying) {
    isPlaying = true;
    btn.innerText = 'Kết thúc';
    winMsg.classList.add('hidden');
    steps = 0;
    time = 0;
    document.getElementById('timer').innerText = '00:00';
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
    shuffleBoard();
  } else {
    isPlaying = false;
    btn.innerText = 'Bắt đầu';
    clearInterval(timerInterval);
    initBoard();
  }
}

function getValidMoves(emptyIdx) {
  const moves = [];
  if (emptyIdx >= COLS) moves.push(emptyIdx - COLS);
  if (emptyIdx < TOTAL - COLS) moves.push(emptyIdx + COLS);
  if (emptyIdx % COLS !== 0) moves.push(emptyIdx - 1);
  if (emptyIdx % COLS !== COLS - 1) moves.push(emptyIdx + 1);
  return moves;
}

function shuffleBoard() {
  let emptyIdx = boardState.indexOf(0);
  for (let i = 0; i < 200; i++) {
    const valid = getValidMoves(emptyIdx);
    const target = valid[Math.floor(Math.random() * valid.length)];
    boardState[emptyIdx] = boardState[target];
    boardState[target] = 0;
    emptyIdx = target;
  }
  renderBoard();
}

function move(dir) {
  if (!isPlaying) return;
  const emptyIdx = boardState.indexOf(0);
  let targetIdx = -1;

  if (dir === 'UP' && emptyIdx >= COLS) targetIdx = emptyIdx - COLS;
  if (dir === 'DOWN' && emptyIdx < TOTAL - COLS) targetIdx = emptyIdx + COLS;
  if (dir === 'LEFT' && emptyIdx % COLS !== 0) targetIdx = emptyIdx - 1;
  if (dir === 'RIGHT' && emptyIdx % COLS !== COLS - 1) targetIdx = emptyIdx + 1;

  if (targetIdx !== -1) {
    boardState[emptyIdx] = boardState[targetIdx];
    boardState[targetIdx] = 0;
    steps++;
    renderBoard();
    checkWin();
  }
}

function checkWin() {
  for (let i = 0; i < TOTAL - 1; i++) {
    if (boardState[i] !== i + 1) return;
  }
  if (boardState[TOTAL - 1] !== 0) return;

  isPlaying = false;
  clearInterval(timerInterval);
  document.getElementById('winMsg').classList.remove('hidden');
  document.getElementById('startBtn').innerText = 'Chơi lại';

  history.push({ step: steps, time: formatTime(time) });
  updateHistory();
}

function updateHistory() {
  const tbody = document.getElementById('historyTable');
  tbody.innerHTML = '';
  history.forEach((h, idx) => {
    const tr = document.createElement('tr');
    tr.className = idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
    tr.innerHTML =
      `<td class="py-2 px-4 border-b text-center">${idx + 1}</td>` +
      `<td class="py-2 px-4 border-b text-center">${h.step}</td>` +
      `<td class="py-2 px-4 border-b text-center">${h.time}</td>`;
    tbody.appendChild(tr);
  });
}

window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); move('UP'); }
  if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); move('DOWN'); }
  if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); move('LEFT'); }
  if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); move('RIGHT'); }
});

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('startBtn').addEventListener('click', toggleGame);

  document.getElementById('btnUp').addEventListener('click', () => move('UP'));
  document.getElementById('btnDown').addEventListener('click', () => move('DOWN'));
  document.getElementById('btnLeft').addEventListener('click', () => move('LEFT'));
  document.getElementById('btnRight').addEventListener('click', () => move('RIGHT'));

  initBoard();
});
