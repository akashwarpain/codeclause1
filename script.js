const cardsArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Pairs of cards
let cards = [...cardsArray, ...cardsArray]; // Duplicate for matching pairs
let flippedCards = [];
let matchedCards = 0;
let score = 0;
let timer;
let seconds = 0;
let minutes = 0;

const gameBoard = document.getElementById('gameBoard');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const resetButton = document.getElementById('reset');

// Shuffle cards using Fisher-Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start the game
function startGame() {
  gameBoard.innerHTML = '';
  flippedCards = [];
  matchedCards = 0;
  score = 0;
  seconds = 0;
  minutes = 0;
  clearInterval(timer);
  scoreDisplay.textContent = score;
  timeDisplay.textContent = '00:00';

  cards = shuffle(cards);

  cards.forEach(card => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.card = card;
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  });

  timer = setInterval(updateTime, 1000);
}

// Update the timer display
function updateTime() {
  seconds++;
  if (seconds >= 60) {
    minutes++;
    seconds = 0;
  }
  timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Flip the card
function flipCard() {
  if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
    this.classList.add('flipped');
    this.textContent = this.dataset.card;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }
}

// Check for match
function checkForMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.dataset.card === secondCard.dataset.card) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    flippedCards = [];
    matchedCards += 2;
    score += 10;
    scoreDisplay.textContent = score;

    if (matchedCards === cards.length) {
      clearInterval(timer);
      setTimeout(() => alert(`Congratulations! You won with a score of ${score}`), 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      flippedCards = [];
    }, 1000);
  }
}

// Reset the game
resetButton.addEventListener('click', startGame);

// Initialize the game
startGame();
