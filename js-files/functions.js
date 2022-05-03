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
    //this function show the selected piece 
    for (let i = 0; i < board.getBoard().length; i++) {
        for (let j = 0; j < board.getBoard()[i].length; j++) {
            if (i === clickRow && j === clickCol) {
                board.getBoard()[i][j].addId("selected");
            }
        }
    }
}

function manegeTurnSystem(turn, board, clickesArr, e, clickRow, clickCol) {
    //here i manege the turn system
    //the function chacks whitch piece was selected and update clickesArr by the selected piece
    if (clickesArr.length === 0 && (e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png" || e.target.src.toString().split('/').find((element) => element === turn + "Quinn.png") === turn + "Quinn.png")) {
        clickesArr.push(board.getBoard()[clickRow][clickCol]);
    } else if (clickesArr.length === 1 && (e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") === turn + "Piece.png" || e.target.src.toString().split('/').find((element) => element === turn + "Quinn.png") === turn + "Quinn.png")) {
        clickesArr.push(board.getBoard()[clickRow][clickCol]);
        clickesArr.shift();
    } else if (clickesArr.length === 1 && (e.target.src.toString().split('/').find((element) => element === turn + "Piece.png") !== turn + "Piece.png" || e.target.src.toString().split('/').find((element) => element === turn + "Quinn.png") !== turn + "Quinn.png")) {
        clickesArr = [];
    }
    return clickesArr;
}

function movePiece(board, clickesArr, clickRow, clickCol, e, visualTurn, turn) {
    //this function show the current turn on the screen
    //remove the piece from here last location and insert it back in the new position
    board.getBoard()[clickesArr[0].getRow()][clickesArr[0].getCol()] = undefined;
    clickesArr[0].setIndex(clickRow, clickCol);
    board.getBoard()[clickRow][clickCol] = clickesArr[0];
    clickesArr[0].draw(e.target);
    clickesArr = [];
    visualTurn.textContent = "This is " + turn + " turn now";
    return clickesArr;
}

function chacksForRegularWin(turn, playAgain) {
    //this function chacks for regular winning [not stuck one] and show it on the screen
    let p = document.getElementById("winner");
    let mainDiv = document.getElementById("mainDiv");
    mainDiv.style.display = "none";
    p.textContent = turn.toUpperCase() + " YOU ARE THE WINNER !";
    playAgain.style.display = "flex";
}

function posibleMoves(row, col, board, turn, clickesArr) {
    //this function decided where the piece can go on the board
    //and shows where you can go on the screen
    let moves = [];

    let table = document.getElementsByTagName("table")[0];
    if (board[row][col].isAquinn() === false) {
        //this is the posible moves to pieces
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

        //chacks if there is option to eat if so all other option will be removed from moves array
        if (eatOption === true) {
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
                    } else if (moves[i][0] !== clickesArr[0].getRow() + tmp) {
                        table.rows[moves[i][0]].cells[moves[i][1]].classList.add("notOption");
                    }
                }
            }
            moves = tmpMoves;
        }
    } else if (board[row][col].isAquinn() === true && board[row][col].getColor() === turn) {
        //this is the posible moves to quinns
        let options = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
        let tmp = 8;
        moves = [];

        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < tmp; j++) {
                tmp = 8;
                if (row + (options[i][0] * j) < 8 && col + (options[i][1] * j) < 8 && row + (options[i][0] * j) > -1 && col + (options[i][1] * j) > -1) {
                    if (board[row + (options[i][0] * j)][col + (options[i][1] * j)] === undefined || board[row + (options[i][0] * j)][col + (options[i][1] * j)].getColor() != turn) {
                        moves.push([row + (options[i][0] * j), col + (options[i][1] * j)]);
                        table.rows[row + (options[i][0] * j)].cells[col + (options[i][1] * j)].classList.add("moves");
                    }
                }
            }
        }

        for (let i = 0; i < moves.length; i++) {
            if (board[moves[i][0]][moves[i][1]] !== undefined) {
                moves.splice(i, moves.length);
                break;
            }
        }
    }
    //this add to end of the array the index of the moving piece to be yused later
    moves.push([row, col]);
    return moves;
}

function posibleMovesWithoutColoring(row, col, board, turn) {
    //this function decided where the piece can go on the board and not show were you can go on the screen 
    //this function ment to be for playerEatOption function and not to any other use
    let moves = [];

    let table = document.getElementsByTagName("table")[0];
    if (board[row][col].isAquinn() === false) {
        //this is the posible moves to pieces
        if (board[row][col].getColor() === "black" && turn === "black") {
            if (row + 1 < 8 && col + 1 < 8) {
                if (board[row + 1][col + 1] === undefined) {
                    moves.push([row + 1, col + 1]);
                }
            }
            if (row + 2 < 8 && col + 2 < 8) {
                if (board[row + 1][col + 1] !== undefined && board[row + 1][col + 1].getColor() === "white" && board[row + 2][col + 2] === undefined) {
                    moves.push([row + 2, col + 2]);
                }
            }
            if (row + 1 < 8 && col - 1 > -1) {
                if (board[row + 1][col - 1] === undefined) {
                    moves.push([row + 1, col - 1]);
                }
            }
            if (row + 2 < 8 && col - 2 > -1) {
                if (board[row + 1][col - 1] !== undefined && board[row + 1][col - 1].getColor() === "white" && board[row + 2][col - 2] === undefined) {
                    moves.push([row + 2, col - 2]);
                }
            }
        } else if (board[row][col].getColor() === "white" && turn === "white") {
            if (row - 1 > -1 && col - 1 > -1) {
                if (board[row - 1][col - 1] === undefined) {
                    moves.push([row - 1, col - 1]);
                }
            }
            if (row - 2 > -1 && col - 2 > -1) {
                if (board[row - 1][col - 1] !== undefined && board[row - 1][col - 1].getColor() === "black" && board[row - 2][col - 2] === undefined) {
                    moves.push([row - 2, col - 2]);
                }
            }
            if (row - 1 > -1 && col + 1 < 8) {
                if (board[row - 1][col + 1] === undefined) {
                    moves.push([row - 1, col + 1]);
                }
            }
            if (row - 2 > -1 && col + 2 < 8) {
                if (board[row - 1][col + 1] !== undefined && board[row - 1][col + 1].getColor() === "black" && board[row - 2][col + 2] === undefined) {
                    moves.push([row - 2, col + 2]);
                }
            }
        }

    } else if (board[row][col].isAquinn() === true && board[row][col].getColor() === turn) {
        //this is the posible moves to quinns
        let options = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
        let tmp = 8;
        moves = [];

        for (let i = 0; i < options.length; i++) {
            for (let j = 0; j < tmp; j++) {
                tmp = 8;
                if (row + (options[i][0] * j) < 8 && col + (options[i][1] * j) < 8 && row + (options[i][0] * j) > -1 && col + (options[i][1] * j) > -1) {
                    if (board[row + (options[i][0] * j)][col + (options[i][1] * j)] === undefined || board[row + (options[i][0] * j)][col + (options[i][1] * j)].getColor() != turn) {
                        moves.push([row + (options[i][0] * j), col + (options[i][1] * j)]);
                        table.rows[row + (options[i][0] * j)].cells[col + (options[i][1] * j)].classList.add("moves");
                    }
                }
            }
        }

        for (let i = 0; i < moves.length; i++) {
            if (board[moves[i][0]][moves[i][1]] !== undefined) {
                moves.splice(i, moves.length);
                break;
            }
        }
    }
    moves.push([row, col]); //this add to end of array the index of the moving piece
    return moves;
}

function chacksIfOpponnetStuck(turn, board) {
    //this function chacks if player is stuck
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== undefined && turn !== board[i][j].getColor() && board[i][j].isAquinn() === false) {
                if (board[i][j].cantMove(board) === false) {
                    return;
                }
            }
        }
    }
    //if there is player thet stuck this here will end the game and show the winner 
    let p = document.getElementById("winner");
    let mainDiv = document.getElementById("mainDiv");
    let playAgain = document.getElementById("showWinning");
    mainDiv.style.display = "none";
    p.textContent = turn.toUpperCase() + " YOU ARE THE WINNER !";
    playAgain.style.display = "flex";
}

function eatPiece(board, clickRow, clickCol) {
    //this function remove piece from board array and mack the piece undefinted
    //and remove the img from the screen 
    board.getBoard()[clickRow][clickCol].removeImgFromTd();
    board.getBoard()[clickRow][clickCol] = undefined;
}

function playerEatOptions(board, turn, clickesArr) {
    /*  this function uses posibleMovesWithoutColoring function to see the posible moves to all player pieces
        if there is option to eat and it not arleady in eatOption array it will be added to eatOption array 
        the function returns array of all posible eat options for current player */
    let eatsOptions = [];
    let pieceMoves = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== undefined && board[i][j].getColor() === turn) {
                pieceMoves = posibleMovesWithoutColoring(board[i][j].getRow(), board[i][j].getCol(), board, turn);
                if (pieceMoves.length >= 2) {
                    for (let x = 0; x < pieceMoves.length - 1; x++) {
                        if (pieceMoves[x][0] + 2 === pieceMoves[pieceMoves.length - 1][0] || pieceMoves[x][0] - 2 === pieceMoves[pieceMoves.length - 1][0]) {
                            if (eatsOptions.indexOf(pieceMoves[x]) === -1) {
                                eatsOptions.push(pieceMoves[x]);
                            }
                        }
                    }
                }
            }
        }
    }

    return eatsOptions;
}