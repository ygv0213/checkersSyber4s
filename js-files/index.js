window.addEventListener("load", (e) => {
    let turn = undefined;
    let choseColor = document.getElementById("choseColor1");
    let playAgain = document.getElementById("showWinning");
    let color = document.getElementsByName("color");

    let board = new Board();
    board.drawBoard();

    let clickesArr = [];

    let moves = [];
    let eatOptions = [];

    let whiteEats = 0;
    let blackEats = 0;

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
        }
    });

    window.addEventListener("click", (e) => {
        /* this event track after the user clickes
           if the user clickes on img its chacked if this is the currect turn if so it show him the posible moves
           if the user clicked on anather turn piece it block him from do it
           if the user clicked on td [empty cell] so its chacked if it can be move ther if so it moves ale to nothing  */

        let tmpMoves = [];

        if (e.target.tagName === "IMG") {
            let clickRow = e.target.parentElement.parentElement.rowIndex;
            let clickCol = e.target.parentElement.cellIndex;

            chacksIfOpponnetStuck(turn, board.getBoard());
            clickesArr = manegeTurnSystem(turn, board, clickesArr, e, clickRow, clickCol);
            clearPreviuseClick(board);
            addCurrentClick(board, clickRow, clickCol);
            moves = posibleMoves(clickRow, clickCol, board.getBoard(), turn, clickesArr);
            eatOptions = playerEatOptions(board.getBoard(), turn, clickesArr);
        
            //this here chacks if there is option to eat if so the moves array will be updated 
            //and then the player can to move only to were is the eat
            
            if(eatOptions.length > 0){
                eatOptions.forEach((row)=>{
                    for(let i=0;i<moves.length-1;i++){
                        if(row[0] === moves[i][0] && row[1] === moves[i][1]){
                            tmpMoves.push(row);
                        }
                    }
                });
                tmpMoves.push(moves[moves.length-1]);
                moves = tmpMoves;
            }
        }

        if (e.target.tagName === "TD") {
            //save click index and status of move [if its valid or not]
            let clickRow = e.target.parentElement.rowIndex;
            let clickCol = e.target.cellIndex;
            let validMove = false;
            chacksIfOpponnetStuck(turn, board.getBoard());
            clearPreviuseClick(board);
            //if you choice to eat piece she will be removed and count of eating will go up
            if (clickesArr.length === 1 && clickesArr[0].isAquinn() === false) {
                if(moves.length > 1){
                    if(turn === "black"){
                        if(moves[moves.length-1][0] === clickRow - 2){
                            if(clickCol < moves[moves.length-1][1]){
                                eatPiece(board, clickRow-1, clickCol+1);
                                whiteEats ++;
                            }else if(clickCol > moves[moves.length-1][1]){
                                whiteEats ++;
                                eatPiece(board, clickRow-1, clickCol-1);
                            }
                        }
                    }else if(turn === "white"){
                        if(moves[moves.length-1][0] === clickRow + 2){
                            if(clickCol < moves[moves.length-1][1]){
                                eatPiece(board, clickRow+1, clickCol+1);
                                blackEats ++;
                            }else if(clickCol > moves[moves.length-1][1]){
                                eatPiece(board, clickRow+1, clickCol-1);
                                blackEats ++;
                            }
                        }
                    }
                }
                
                //chacks for winner
                if(whiteEats === 12){
                    chacksForRegularWin(turn, playAgain);
                }else if(blackEats === 12){
                    chacksForRegularWin(turn, playAgain);
                }

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
                    if(!clickesArr[0].isAquinn()){
                        clickesArr = movePiece(board, clickesArr, clickRow, clickCol, e, visualTurn, turn);
                    }else{
                        //add support in quinns for later
                        clickesArr = movePiece(board, clickesArr, clickRow, clickCol, e, visualTurn, turn)
                    }
                }
            }
        }

    });

});