function clearPreviuseClick(board){
    for(let i = 0;i<board.getBoard().length;i++){
        for(let j=0;j<board.getBoard()[i].length;j++){
            if(board.getBoard()[i][j] !== undefined){
                board.getBoard()[i][j].removeId("selected");
            }
        }
    }
}

function addCurrentClick(board, clickRow, clickCol){
    for(let i = 0;i<board.getBoard().length;i++){
        for(let j=0;j<board.getBoard()[i].length;j++){
            if(i === clickRow && j === clickCol){
                board.getBoard()[i][j].addId("selected");
            }
        }
    }
}

window.addEventListener("load", (e)=>{
    let turn = undefined;
    let choseColor = document.getElementById("choseColor1");
    let color = document.getElementsByName("color");

    let board = new Board();
    board.drawBoard();

    let clickesArr = [];

    choseColor.addEventListener('click', (event) => {
        //this function chenges the turn varible when the player click on the start game button
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

    window.addEventListener("click", (e)=>{
        
        if(e.target.tagName === "TD"){
            let clickRow = e.target.parentElement.rowIndex;
            let clickCol = e.target.cellIndex;
            
            if(clickesArr.length === 1){
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
                board.getBoard()[clickRow][clickCol] = clickesArr[0];
                board.getBoard()[clickesArr[0].getRow()][clickesArr[0].getCol()] = undefined;
                clickesArr[0].draw(e.target);
                clickesArr.push(clickesArr[0]);
                clickesArr.shift();
                clickesArr = [];
                if(turn === "black"){
                    turn = "white";
                }else{
                    turn = "black";
                }
                visualTurn.textContent = "This is " + turn + " turn now";
            }
        }

        if(e.target.tagName === "IMG"){
            let clickRow = e.target.parentElement.parentElement.rowIndex;
            let clickCol = e.target.parentElement.cellIndex;
            
            clearPreviuseClick(board);
            addCurrentClick(board, clickRow, clickCol);
            
            if(clickesArr.length === 0 && e.target.src.toString().split('/').find((element)=>element ===  turn+"Piece.png") === turn+"Piece.png"){
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
            }else if(clickesArr.length === 1 && e.target.src.toString().split('/').find((element)=>element ===  turn+"Piece.png") === turn+"Piece.png"){
                console.log(clickesArr)
                clickesArr.push(board.getBoard()[clickRow][clickCol]);
            }
        }
        console.log(board.getBoard())
    });

});