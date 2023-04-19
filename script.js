//NOTE declaring the variables for the different classes to be used later on in the code
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";

//NOTE creating an array with all the winning combinations to be used in later functions to determine a winner.
//uses the index of the cells to reference each one
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

//NOTE calls on all the id's and data attributes in the HTML and gives them variables to be used throughout the page
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const playerDisplay = document.querySelector("[data-display-player]");

//NOTE sets a variable for circleTurn, which is a boolean that will be used to determine when to swap turns and
//also sets a variable for currentPlayer, so as it changes, so does the display message saying whose turn it is
let circleTurn
let currentPlayer = "X";

//NOTE calls on the function to start the game and adds a click event listener to the restart button that will also start the game
startGame()

restartButton.addEventListener("click", startGame);

//NOTE the startGame function sets everthing back to the beginning, clearing the results and classes from the previous game, while adding the elements we need to start the new one.
//That's why all of the removing happens at the beginning of the function, since the code is read from the top down.
function startGame() {
    circleTurn = false; //starts game on X turn
    cellElements.forEach(cell => {  //for each element in the array, it will remove the X or O and the event listener, so it clears the board
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true}) //adds the event listener and each cell can only be clicked once
    });
    setBoardHoverClass(); //enables hover element before first cell is clicked
    winningMessageElement.classList.remove("show"); //sets display from flex to none in CSS
};

function handleClick(e) {
    const cell = e.target; //whichever cell has been clicked
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;//if circleTurn is true, its circle class, false, its x class
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }else if (isDraw()) {
        endGame(true);
    }else {
        swapTurns();
        setBoardHoverClass(); //set after the turn is swapped so the hover mark reflects the current player, not the previous one
    };
};

//NOTE if the endGame is true, then the game is a draw and the winning message text will say, "Draw!". If the endGame is false, then it changes the winning message text to declare the winner
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!"
    }else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!` //if circleTurn is true, return O's. if circleTurn is false, return "X's"
    };
    winningMessageElement.classList.add("show"); //this adds show to the class name, which changes the display in CSS from "none" to "flex"
    if (currentPlayer === "O") {
        changePlayer();
    };//this resets the player display, so it always starts on Player X
};

//NOTE - if every single cell has an X or Circle class, then isDraw returns true
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    });
};

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass); //adds the currentClass to the cell, which is determined by circleTurn boolean
};

function swapTurns() {
    circleTurn = !circleTurn; //changes variable from true to false and vice versa
    changePlayer(); //updates the player display
};

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`); //removes class
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // if currentPlayer is equal to X, return O. If currentPlayer, is not equal to X, return X
    playerDisplay.innerText = currentPlayer; //updates inner text to current player of the round
    playerDisplay.classList.add(`player${currentPlayer}`); //adds the new class of the current player
};

//NOTE removes both classes from the board to reset, then based on the circleTurn conditional, it will add the relevant class
function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }else {
        board.classList.add(X_CLASS);
    };
};

//NOTE returns the indexes of the cell elements that contain the current class. The combination function then returns every combination with the current class.
//if any of those combinations matches one of the arrays in the Winning Combinations array, then the whole function is returned and completed.
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
};