const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Spillvariabler  
const boxSize = 20; // Mindre rute-størrelse
const rows = canvas.height / boxSize;
const cols = canvas.width / boxSize;
let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 }; // Starter med å bevege seg til høyre
let food = generateFood();
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

// Genererer mat  
function generateFood() {
  let isOnSnake;
  let newFood;
  do {
    isOnSnake = false;
    newFood = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };

    // Sjekk om maten overlapper med slangen  
    snake.forEach(segment => {
      if (segment.x === newFood.x && segment.y === newFood.y) {
        isOnSnake = true;
      }
    });
  } while (isOnSnake);
  return newFood;
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
    food = generateFood();
  } else {
    snake.pop();
  }
}

// Tegner spill  
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
}

function endGame() {
  alert(`Spillet er over! Poengsum: ${score}`);
  
  // Nullstill variabler
  snake = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
  direction = { x: 1, y: 0 }; // Starter til høyre
  food = generateFood();
  score = 0;
  
  // Start spillloopen igjen
}


// Styrer slangen  
document.addEventListener('keydown', event => {
  const { key } = event;

  // Pil-taster
  if ((key === 'ArrowUp' || key === 'w') && direction.y === 0) direction = { x: 0, y: -1 };
  if ((key === 'ArrowDown' || key === 's') && direction.y === 0) direction = { x: 0, y: 1 };
  if ((key === 'ArrowLeft' || key === 'a') && direction.x === 0) direction = { x: -1, y: 0 };
  if ((key === 'ArrowRight' || key === 'd') && direction.x === 0) direction = { x: 1, y: 0 };
});


// Spillloop  
function gameLoop() {
  updateSnake();
  drawGame();
  setTimeout(gameLoop, 100);
}

gameLoop();
