/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
// console.log(squareEls)
const messageEl = document.querySelector('#message')
// console.log(messageEl)
const resetBtnEl = document.querySelector('#reset')

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = ['', '', '', '', '', '', '', '', '']
    turn = 'X'
    winner = false;
    tie = false;
    messageEl.textContent = `It's ${turn}'s Turn`

    render();
    
};


function render() {
    updateBoard();
    updateMessage();
};

const updateBoard = () => {

    board.forEach((element, id) => {
        const squares = document.getElementById(id);
        // console.log(squares)
        squares.textContent = board.at(id);
});

};

const updateMessage = () => {
    if (winner === false && tie === false){
        messageEl.textContent = `It's ${turn}'s Turn`;
    } else if ( winner === false && tie === true ) {
        messageEl.textContent = "It's a Tie!"
    } else {
        messageEl.textContent = `${turn} Won!`
    }
};

function handleClick(event) {
    
    const squareIndex = event.target.id
    // console.log(squareIndex);

    if (board[squareIndex] === 'X' || board[squareIndex] === 'O'){
        return;
    } if (winner === true) {
        return;
    } else{
        placePiece(squareIndex);

        checkForWinner();

        checkForTie();

        switchPlayerTurn();

        render();
    }

    
}

function placePiece(index) {
    board[index] = turn
    // console.log(board);
};

function checkForWinner() {
    for (combo in winningCombos) {
        // console.log(winningCombos[combo]);

        let firstIndex = winningCombos[combo][0];
        let secondIndex = winningCombos[combo][1];
        let thirdIndex = winningCombos[combo][2];

        let firstPosition = board[firstIndex];
        let secondPosition = board[secondIndex];
        let thridPosition = board[thirdIndex];

        if (firstPosition !== '' && firstPosition === secondPosition && firstPosition === thridPosition) {
            winner = true;
        }
        
        
    }
};

function checkForTie() {
    if (winner === true) {
        return;
    } else if (board.includes('')) {
        return;
    } else {
        tie = true;
    }

};

function switchPlayerTurn() {
    if (winner === true){
        return;
    } if (winner === false) {
        if (turn === 'X'){
            turn = 'O'
        } else if (turn === 'O') {
            turn = 'X'
        }
    }
};
/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("load", init);

squareEls.forEach((element) => {
    element.addEventListener('click', handleClick);
});

resetBtnEl.addEventListener('click', init);