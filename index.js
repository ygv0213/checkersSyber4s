function clearPreviuseClick(board) {
    //this function clear the selected || moves from the screen
    let table = document.getElementsByTagName("table")[0];
    for (let i = 0; i < board.getBoard().length; i++) {
        for (let j = 0; j < board.getBoard()[i].length; j++) {
            if (board.getBoard()[i][j] !== undefined) {
                board.getBoard()[i][j].removeId("selected");
            }
            if (table.rows[i].cells[j].classList.contains("moves")) {
                table.rows[i].cells[j].classList.remove("moves");
            }
        }
    }
}

function addCurrentClick(board, clickRow, clickCol) {
    //this function show who piece was selected
    for (let i = 0; i < board.getBoard().length; i++) {
        for (let j = 0; j < board.getBoard()[i].length; j++) {
            if (i === clickRow && j === clickCol) {
                board.getBoard()[i][j].addId("selected");
            }
        }
    }
}

function posibleMoves(row, col, event, board, turn) {
    //this function decided where the piece can go on the board
    let moves = [];

    let table = document.getElementsByTagName("table")[0];
    if(board[row][col].isAquinn() === false){
        if (board[row][col].getColor() === "black" && turn === "black") {
            if (row + 1 < 8 && col + 1 < 8) {
                if (board[row + 1][col + 1] === undefined) {
                    moves.push([row + 1, col + 1]);
                    table.rows[row + 1].cells[col + 1].classList.add("moves");
                }
            }
            if (row + 2 < 8 && col + 2 < 8) {
                if (board[row + 1][col + 1] !== undefined && board[row + 1][col + 1].getColor() === "white" && board[row + 2][col + 2] === undefined) {
                    moves.push([row + 2, col + 2]);
                    table.rows[row + 2].cells[col + 2].classList.add("moves");
                }
            }
            if (row + 1 < 8 && col - 1 > -1) {
                if (board[row + 1][col - 1] === undefined) {
                    moves.push([row + 1, col - 1]);
                    table.rows[row + 1].cells[col - 1].classList.add("moves");
                }
            }
            if (row + 2 < 8 && col - 2 > -1) {
                if (board[row + 1][col - 1] !== undefined && board[row + 1][col - 1].getColor() === "white" && board[row + 2][col - 2] === undefined) {
                    moves.push([row + 2, col - 2]);
                    table.rows[row + 2].cells[col - 2].classList.add("moves");
                }
            }
        } else if (board[row][col].getColor() === "white" && turn === "white") {
            if (row - 1 > -1 && col - 1 > -1) {
                if (board[row - 1][col - 1] === undefined) {
                    moves.push([row - 1, col - 1]);
                    table.rows[row - 1].cells[col - 1].classList.add("moves");
                }
            }
            if (row - 1 > -1 && col + 1 < 8) {
                if (board[row - 1][col + 1] === undefined) {
                    moves.push([row - 1, col + 1]);
                    table.rows[row - 1].cells[col + 1].classList.add("moves");
                }
            }
        }
    }

    return moves;
}

window.addEventListener("load", (e) => {
    let turn = undefined;
    let choseColor = document.getElementById("choseColor1");
    let playAgain = document.getElementById("showWinning");
    let color = document.getElementsByName("color");

    let board = new Board();
    board.drawBoard();

    let clickesArr = [];
    let moves = [];

    choseColor.addEventListener('click', (event) => {
        //this event chenges the turn varible when the player click on the start game button
        let mainDiv = document.getElementById("mainDiv");
        let visualTurn = document.createElement('p');
        if (event.target.id === "sendBtn") {
            if (color[0].checked === true) {
                turn = color[0].value;
            } else {
                turn = color[1].value;
            }
            choseColor.style.display = "none";
            visualTurn.textContent = "This is " + turn + " turn now";
            visualTurn.id = "visualTurn";
            mainDiv.appendChild(visualTurn);
            mainDiv.style.display = "flex";
        }
    });

    playAgain.addEventListener("click", (e)=>{
        if(e.target.id === "playAgain"){
            window.location.reload();
            console.log("end")
        }
    });

    window.addEventListener("click", (e) => {
        /* this event track after the user clickes
           if the user clickes on img its chacked if this is the currect turn if so it show him the posible moves
           if the user clicked on anather turn piece it block him from do it
           if the user clicked on td [empty cell] so its chacked if it can be move ther if so it moves ale to nothing  */
        if (e.target.tagName === "IMG") {
            let clickRow = e.target.parentElement.parentElement.rowIndex;
            let clickCol = e.target.parentElement.cellIndex;

            clearPreviuseClick(board);
            addCurrentClick(board, clickRow, clickCol);
            moves = posibleMoves(clickRow, clickCol, e, board.getBoard(), turn);

            if (clickesArr.length === 0 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png") {
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
            } else if (clickesArr.length === 1 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png") {
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
                clickesArr.shift();
            } else if (clickesArr.length === 1 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") !== turn + "Piece.png") {
                clickesArr = [];
            }
        }

        if (e.target.tagName === "TD") {
            let clickRow = e.target.parentElement.rowIndex;
            let clickCol = e.target.cellIndex;
            let validMove = false;

            clearPreviuseClick(board);

            if (clickesArr.length === 1) {
                moves.forEach((move) => {
                    if (clickRow === move[0] && clickCol === move[1]) {
                        validMove = true;
                    }
                });
                if (validMove === true) {
                    //i am here
                    clickesArr.push(board.getBoard()[clickRow][clickCol]);
                    board.getBoard()[clickRow][clickCol] = clickesArr[0];
                    clickesArr[0].draw(e.target);
                    clickesArr.push(clickesArr[0]);
                    board.getBoard()[clickesArr[0].getRow()][clickesArr[0].getCol()] = undefined;
                    clickesArr.shift();
                    clickesArr = [];
                    if (turn === "black") {
                        turn = "white";
                    } else {
                        turn = "black";
                    }
                    visualTurn.textContent = "This is " + turn + " turn now";
                }
            }
        }
    });

});