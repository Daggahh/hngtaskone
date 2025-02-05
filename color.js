const colorBox = document.getElementById("colorBox");
const optionsContainer = document.getElementById("options");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const newGameButton = document.getElementById("newGameButton");

let score = 0;
let targetColor;

// Function to generate a random color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function fadeInNewColor(newColor) {
  colorBox.style.transition = "background-color 0.5s ease-in-out";
  colorBox.style.backgroundColor = newColor;
}

// Function to start a new game
function startGame() {
  gameStatus.textContent = "";
  score = 0;
  scoreDisplay.textContent = score;
  generateNewRound();
}

function generateNewRound() {
  targetColor = getRandomColor();

  fadeInNewColor(targetColor);

  let colors = [targetColor];
  while (colors.length < 6) {
    let newColor = getRandomColor();
    if (!colors.includes(newColor)) colors.push(newColor);
  }
  colors.sort(() => Math.random() - 0.5);

  optionsContainer.innerHTML = "";
  colors.forEach((color) => {
    const button = document.createElement("button");
    button.style.backgroundColor = color;
    button.setAttribute("data-testid", "colorOption");
    button.addEventListener("click", () => checkGuess(button, color));
    optionsContainer.appendChild(button);
  });
}

// Function to check if the selected color is correct
function checkGuess(button, selectedColor) {
  if (selectedColor === targetColor) {
    score++;
    gameStatus.textContent = "🎉 Correct! Great job!";
    gameStatus.style.color = "green";
    button.classList.add("correct");

    setTimeout(() => {
      gameStatus.textContent = ""; 
      generateNewRound();
    }, 800);
  } else {
    gameStatus.textContent = "❌ Wrong! Try Again.";
    gameStatus.style.color = "red";
    button.classList.add("wrong");
    setTimeout(() => button.classList.remove("wrong"), 500);
  }
  scoreDisplay.textContent = score;
}

// Event Listener for New Game Button
newGameButton.addEventListener("click", startGame);

// Start the game initially
startGame();
