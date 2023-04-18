// REVIEW 
// Using any of the tools you’ve worked with so far, create a game of Tic-Tac-Toe.
//     1. Create a Tic-Tac-Toe game grid using your HTML element of choice. 
//     2. When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
//     3. A heading should say whether it is X’s or O’s turn and change with each move made.
//     4. A button should be available to clear the grid and restart the game.
//     5. When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component 
//     should appear across the screen announcing the winner.
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector("[data-winning-message-text");
const playerDisplay = document.querySelector(".display-player");
let circleTurn
let currentPlayer = "X";

startGame()

restartButton.addEventListener("click", startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true})
    });
    setBoardHOverClass();
    winningMessageElement.classList.remove("show");
};

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }else if (isDraw()) {
        endGame(true);
    }else {
        swapTurns();
        setBoardHOverClass();
    };
};

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    };
    winningMessageElement.classList.add("show");
    if (currentPlayer === "O") {
        changePlayer();
    };
};

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    });
};

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
};

function swapTurns() {
    circleTurn = !circleTurn;
    changePlayer();
};

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
};

function setBoardHOverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS);
    };
};

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
};