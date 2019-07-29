/*----- constants -----*/
const LETTERS = {
    '0' : '',
    '1' : 'X',
    '-1': 'O'
};


/*----- app's state (variables) ------*/
let board, turn, winner;


/*------ cached element references ------*/
const msgEl = document.getElementById('msg');

/* ------- event listeners --------*/
document.querySelector('table.board').addEventListener('click', handleClick);

/*-------- functions -------*/
init();

function init() {
    board = [
        [0,0,0], // row 1
        [0,0,0], // row 2
        [0,0,0],  // row 3
    ];
    turn = 1;
    winner = null;
    render();
}

function render() {
    board.forEach(function(rowArr,rowidx){
        rowArr.forEach(function(cell,colidx){
            let td = document.getElementById(`r${rowidx}c${colidx}`);
            td.innerHTML = LETTERS[cell];
        });
    });

    if(winner) {
        msgEl.textContent = `Player ${LETTERS[turn*-1]} has won.`;
    }
    else {
        msgEl.textContent = `${LETTERS[turn]}'s Turn.`
    }
}

function handleClick(evt) {
    let rowidx = parseInt(evt.target.id[1]);
    let colidx = parseInt(evt.target.id[3]);
    console.log(rowidx,colidx);
    if(board[rowidx][colidx] === 0) {
        board[rowidx][colidx] = turn;
        turn*=-1;
        winner = win_check();
        render();
    }
    else {
        return;
    }
}

function win_check() {
    if((board[0][0] === board[0][1] && board[0][1] === board[0][2])) { // Matching row 1
        if(board[0][0] === 0){
            return false;
        }
        return true;
    }
    if((board[1][0] === board[1][1] && board[1][1] === board[1][2])) { // Matching row 2
        if(board[1][0] === 0){
            return false;
        }
        return true;
    }

    if((board[2][0] === board[2][1] && board[2][1] === board[2][2])) { // Matching row 3
        if(board[2][0] === 0) {
            return false;
        }
        return true;
    }

    if((board[0][0] === board[1][0] && board[1][0] === board[2][0])) { // Matching col 1
        if(board[0][0] === 0) {
            return false;
        }
        return true;
    }

    if((board[0][1] === board[1][1] && board[1][1] === board[2][1])) { // Matching col 2
        if(board[0][1] === 0) {
            return false;
        }
        return true;
    }

    if((board[0][2] === board[1][2] && board[1][2] === board[2][2])) { // Matching col 3
        if(board[0][2] === 0) {
            return false;
        }
        return true;
    }

    if((board[0][0] === board[1][1] && board[1][1] === board[2][2])) { // Matching diagonal 1
        if(board[0][0] === 0) {
            return false;
        }
        return true;
    }

    if((board[2][0] === board[1][1] && board[1][1] === board[0][2])) { // Matching diagonal 2
        if(board[2][0] === 0) {
            return false;
        }
        return true;
    }

    else{
        return false;
    }
}

function reset() {
    init();
}