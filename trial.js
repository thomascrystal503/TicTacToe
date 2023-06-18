const playerX = "x";
const playerO = "O";

const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//does this need to be in a const
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", hasCellClicked));
const restartButton = document
  .querySelector(".restart-button")
  .addEventListener("click", handleResetGame);

let gameState = ["", "", "", "", "", "", "", "", ""];

const gameStatus = document.querySelector(".winning-message");
const board = document.getElementById("board");

let gameOn = true;

let currentPlayer = "x";

//Display to the user.. function winningMessage
const winningMessage = () => `${currentPlayer} wins!`;
const tieMessage = () => "The cat wins!";

function hasCellClicked(clickedCellEvent) {
  console.log("clicked");
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameOn) {
    return;
  }
  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winCombo = WINNING_COMBOS[i];
    let a = gameState[winCombo[0]];
    let b = gameState[winCombo[1]];
    let c = gameState[winCombo[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      //break;
    }
  }
  if (roundWon) {
    gameOn = false;

    gameStatus.classList.add("show");
    gameStatus.innerHTML = winningMessage();

    handleResetGame();
    return;
  }

  let gameTie = !gameState.includes("");

  if (gameTie) {
    gameOn = false;
    //gameStatus.style.display = "flex";
    gameStatus.classList.add("show");
    gameStatus.innerHTML = tieMessage();

    return;
  }

  handlePlayerTurn();
}

function handlePlayerTurn() {
  //if then else
  currentPlayer = currentPlayer === "x" ? "O" : "x";
}

function handleResetGame() {
  gameOn = true;
  //gameStatus.style.display = "none";
  currentPlayer = "x";
  gameState = ["", "", "", "", "", "", "", ""];
  console.log("clicked");
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  //handleResultValidation();
}
