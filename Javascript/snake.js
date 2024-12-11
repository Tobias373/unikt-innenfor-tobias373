const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spillvariabler
const boxSize = 20;
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;
let snake = [{ x: 5, y: 5 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let score = 0;

// Tegner slangen
function drawSnake() {
  snake.forEach(segment => {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(segment.x * boxSize, segment.y * boxSize, boxSize, boxSize);
  });
}

// Tegner mat
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * boxSize, food.y * boxSize, boxSize, boxSize);
}

// Oppdaterer slangen
function updateSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  // Sjekk kollisjon med vegger
  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    endGame();
    return;
  }

  // Sjekk kollisjon med seg selv
  if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
    endGame();
    return;
  }

  // Legger til ny posisjon
  snake.unshift(head);

  // Sjekk om slangen spiser mat
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  } else {
    snake.pop(); // Fjerner halen hvis mat ikke spises
  }
}

// Tegner spill
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
}

// Spillslutt
function endGame() {
  alert(`Spillet er over! Poengsum: ${score}`);
  snake = [{ x: 5, y: 5 }];
  direction = { x: 0, y: 0 };
  food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
  score = 0;
}

// Styrer slangen
document.addEventListener('keydown', event => {
  const { key } = event;
  if (key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -1 };
  if (key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 1 };
  if (key === 'ArrowLeft' && direction.x === 0) direction = { x: -1, y: 0 };
  if (key === 'ArrowRight' && direction.x === 0) direction = { x: 1, y: 0 };
});

// Spillloop
function gameLoop() {
  updateSnake();
  drawGame();
  setTimeout(gameLoop, 100);
}

gameLoop();
