(function () {
  let FPS = 10;
  const SIZE = 40;
  const SPEED_INCREMENT_INTERVAL = 60; 
  const SPEED_INCREMENT_AMOUNT = 0.5; 

  let start = 0;
  let board;
  let snake;
  let score = 0;
  let fruit;
  let framesPassed = 0;
  let isPaused = false;
  let intervalId;

  function init() {
    if (!board) {
      board = new Board(SIZE);
    } else {
      clearBoard();
    }
    snake = new Snake([[4, 4], [4, 5], [4, 6]]);
    fruit = new Fruit();
    clearInterval(intervalId); 
    intervalId = setInterval(run, 1000 / FPS);
    updateScore();
  }

  function clearBoard() {
    const cells = document.querySelectorAll("#board td");
    cells.forEach(cell => {
      cell.style.backgroundColor = board.color;
    });
  }

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "s":
        if (start == 0 || start == 2) {
          document.getElementById("game-over").style.display = "none";
          start = 1;
          score = 0;
          framesPassed = 0;
          FPS = 10; 
          init();
        }
        break;
      case "ArrowUp":
        if (snake.direction !== 2) snake.changeDirection(0); 
        break;
      case "ArrowRight":
        if (snake.direction !== 3) snake.changeDirection(1); 
        break;
      case "ArrowDown":
        if (snake.direction !== 0) snake.changeDirection(2); 
        break;
      case "ArrowLeft":
        if (snake.direction !== 1) snake.changeDirection(3); 
        break;
      case "p":
        isPaused = !isPaused;
        break;
      default:
        break;
    }
  });

  class Board {
    constructor(size) {
      this.element = document.createElement("table");
      this.element.setAttribute("id", "board");
      this.color = "#ccc";
      document.body.appendChild(this.element);
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        this.element.appendChild(row);
        for (let j = 0; j < size; j++) {
          const field = document.createElement("td");
          row.appendChild(field);
        }
      }
    }
  }

  class Snake {
    constructor(body) {
      this.body = body;
      this.color = "#222";
      this.direction = 1; // 0 para cima, 1 para direita, 2 para baixo, 3 para esquerda
      this.body.forEach(field => document.querySelector(`#board tr:nth-child(${field[0] + 1}) td:nth-child(${field[1] + 1})`).style.backgroundColor = this.color);
    }
    walk() {
      const head = this.body[this.body.length - 1];
      let newHead;
      switch (this.direction) {
        case 0:
          newHead = [head[0] - 1, head[1]];
          break;
        case 1:
          newHead = [head[0], head[1] + 1];
          break;
        case 2:
          newHead = [head[0] + 1, head[1]];
          break;
        case 3:
          newHead = [head[0], head[1] - 1];
          break;
        default:
          break;
      }

      if (newHead[0] < 0 || newHead[0] >= SIZE || newHead[1] < 0 || newHead[1] >= SIZE) {
        gameOver();
        return;
      }

      this.body.push(newHead);
      const oldTail = this.body.shift();
      document.querySelector(`#board tr:nth-child(${newHead[0] + 1}) td:nth-child(${newHead[1] + 1})`).style.backgroundColor = this.color;
      document.querySelector(`#board tr:nth-child(${oldTail[0] + 1}) td:nth-child(${oldTail[1] + 1})`).style.backgroundColor = board.color;
    }
    changeDirection(direction) {
      this.direction = direction;
    }
    grow() {
      const tail = this.body[0];
      this.body.unshift([tail[0], tail[1]]);
      document.querySelector(`#board tr:nth-child(${tail[0] + 1}) td:nth-child(${tail[1] + 1})`).style.backgroundColor = this.color;
    }
    checkCollision() {
      const head = this.body[this.body.length - 1];
      for (let i = 0; i < this.body.length - 1; i++) {
        if (head[0] === this.body[i][0] && head[1] === this.body[i][1]) {
          return true;
        }
      }
      return false;
    }
  }

  class Fruit {
    constructor() {
      this.color = this.getRandomColor();
      this.position = this.generateRandomPosition();
      this.draw();
    }
    getRandomColor() {
      return Math.random() < 0.67 ? "#000" : "#f00";
    }
    generateRandomPosition() {
      let position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
      while (snake.body.some(segment => segment[0] === position[0] && segment[1] === position[1])) {
        position = [Math.floor(Math.random() * SIZE), Math.floor(Math.random() * SIZE)];
      }
      return position;
    }
    draw() {
      document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = this.color;
    }
    remove() {
      document.querySelector(`#board tr:nth-child(${this.position[0] + 1}) td:nth-child(${this.position[1] + 1})`).style.backgroundColor = board.color;
    }
  }

  function run() {
    if (start == 1 && !isPaused) {
      snake.walk();
      framesPassed++;
      if (framesPassed % SPEED_INCREMENT_INTERVAL === 0) {
        FPS += SPEED_INCREMENT_AMOUNT;
        clearInterval(intervalId);
        intervalId = setInterval(run, 1000 / FPS);
      }
      const head = snake.body[snake.body.length - 1];
      if (head[0] === fruit.position[0] && head[1] === fruit.position[1]) {
        score += fruit.color === "#000" ? 1 : 2;
        updateScore();
        fruit.remove();
        fruit = new Fruit();
        snake.grow();
      }
      if (snake.checkCollision()) {
        gameOver();
      }
    }
  }

  function updateScore() {
    let scoreElement = document.getElementById("score");
    if (!scoreElement) {
      scoreElement = document.createElement("div");
      scoreElement.setAttribute("id", "score");
      document.body.appendChild(scoreElement);
    }
    scoreElement.textContent = score.toString().padStart(4, "0");
  }

  function gameOver() {
    let gameOverElement = document.getElementById("game-over");
    if (!gameOverElement) {
      gameOverElement = document.createElement("div");
      gameOverElement.setAttribute("id", "game-over");
      gameOverElement.textContent = "Game Over";
      document.body.appendChild(gameOverElement);
    }
    gameOverElement.style.display = "block";
    start = 2;
    clearInterval(intervalId);
  }
})();
