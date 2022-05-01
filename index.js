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
            if (table.rows[i].cells[j].classList.contains("notOption")) {
                table.rows[i].cells[j].classList.remove("notOption");
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

function posibleMoves(row, col, board, turn, clickesArr) {
    //this function decided where the piece can go on the board
    let moves = [];

    let table = document.getElementsByTagName("table")[0];
    if (board[row][col].isAquinn() === false) {
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
            if (row - 2 > -1 && col - 2 > -1) {
                if (board[row - 1][col - 1] !== undefined && board[row - 1][col - 1].getColor() === "black" && board[row - 2][col - 2] === undefined) {
                    moves.push([row - 2, col - 2]);
                    table.rows[row - 2].cells[col - 2].classList.add("moves");
                }
            }
            if (row - 1 > -1 && col + 1 < 8) {
                if (board[row - 1][col + 1] === undefined) {
                    moves.push([row - 1, col + 1]);
                    table.rows[row - 1].cells[col + 1].classList.add("moves");
                }
            }
            if (row - 2 > -1 && col + 2 < 8) {
                if (board[row - 1][col + 1] !== undefined && board[row - 1][col + 1].getColor() === "black" && board[row - 2][col + 2] === undefined) {
                    moves.push([row - 2, col + 2]);
                    table.rows[row - 2].cells[col + 2].classList.add("moves");
                }
            }
        }

        let eatOption = false;
        
        //if there option to eat eatOption become to true
        moves.forEach((move) => {
            let tmp = 0;

            if (turn === "black") {
                tmp = 2;
            } else if (turn === "white") {
                tmp = -2;
            }

            if (clickesArr.length === 1 && clickesArr[0] !== undefined) {
                if (move[0] === clickesArr[0].getRow() + tmp) {
                    eatOption = true;
                }
            }
        });
        
        //chacks if there is option to eat if so all other option will be removed
        if(eatOption === true){
            let tmp = 0;
            let tmpMoves = [];

            if (turn === "black") {
                tmp = 2;
            } else if (turn === "white") {
                tmp = -2;
            }

            for (let i = 0; i < moves.length; i++) {
                for (let j = 0; j < moves[i].length; j++) {
                    if (moves[i][0] === clickesArr[0].getRow() + tmp) {
                        tmpMoves.push(moves[i]);
                    }else if (moves[i][0] !== clickesArr[0].getRow() + tmp) {
                        table.rows[moves[i][0]].cells[moves[i][1]].classList.remove("moves");
                    }
                }
            }
            moves = tmpMoves;
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

    playAgain.addEventListener("click", (e) => {
        if (e.target.id === "playAgain") {
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

            //here i manege the turn system
            if (clickesArr.length === 0 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png") {
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
            } else if (clickesArr.length === 1 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png") {
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
                clickesArr.shift();
            } else if (clickesArr.length === 1 && e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") !== turn + "Piece.png") {
                clickesArr = [];
            }

            clearPreviuseClick(board);
            addCurrentClick(board, clickRow, clickCol);
            moves = posibleMoves(clickRow, clickCol, board.getBoard(), turn, clickesArr, [board.getWhitePieces(), board.getBlackPieces()]);
        }

        if (e.target.tagName === "TD") {
            //save click index and status of move [if its valid or not]
            let clickRow = e.target.parentElement.rowIndex;
            let clickCol = e.target.cellIndex;
            let validMove = false;
            clearPreviuseClick(board);

            if (clickesArr.length === 1) {
                //chacks if the move is valid [valide moves store in moves array]
                moves.forEach((move) => {
                    if (clickRow === move[0] && clickCol === move[1]) {
                        validMove = true;
                    }
                });

                if (validMove === true) {
                    //change the turn and check if you need to turn the piece to quinn if so the piece turn to quinn
                    if (turn === "black") {
                        turn = "white";
                        if (clickRow === 7 && clickesArr[0].isAquinn() !== true) {
                            clickesArr[0].mackQuinn();
                        }
                    } else {
                        turn = "black";
                        if (clickRow === 0 && clickesArr[0].isAquinn() !== true) {
                            clickesArr[0].mackQuinn();
                        }
                    }
                    //if the move is valid then move the piece
                    board.getBoard()[clickesArr[0].getRow()][clickesArr[0].getCol()] = undefined;
                    clickesArr[0].setIndex(clickRow, clickCol);
                    board.getBoard()[clickRow][clickCol] = clickesArr[0];
                    clickesArr[0].draw(e.target);
                    clickesArr = [];
                    visualTurn.textContent = "This is " + turn + " turn now";
                }
            }
        }
    });

});