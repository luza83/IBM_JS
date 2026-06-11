const gameContainer = document.getElementById("game-container");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startBtn = document.getElementById("startbtn");

const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
  "pink",
  "cyan"
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let timeLeft = 30;
let timer;

// Create cards
function createBoard() {
  gameContainer.innerHTML = "";

  const cardColors = [...colors, ...colors];

  // Shuffle
  cardColors.sort(() => Math.random() - 0.5);

  cardColors.forEach(color => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.dataset.color = color;

    card.addEventListener("click", flipCard);

    gameContainer.appendChild(card);
  });
}

// Flip card
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (this.classList.contains("matched")) return;

  this.style.backgroundColor = this.dataset.color;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

// Check match
function checkMatch() {
  if (firstCard.dataset.color === secondCard.dataset.color) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score += 10;
    scoreElement.textContent = `Score: ${score}`;

    resetTurn();

    const matchedCards =
      document.querySelectorAll(".matched").length;

    if (matchedCards === 16) {
      clearInterval(timer);
      alert("You win!");
    }
  } else {
    setTimeout(() => {
      firstCard.style.backgroundColor = "#ddd";
      secondCard.style.backgroundColor = "#ddd";

      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

// Timer
function startTimer() {
  clearInterval(timer);

  timeLeft = 30;
  timerElement.textContent = `Time Left: ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;

    timerElement.textContent = `Time Left: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
    }
  }, 1000);
}

// Start game
function startGame() {
  score = 0;
  scoreElement.textContent = "Score: 0";

  createBoard();
  startTimer();
}

startBtn.addEventListener("click", startGame);