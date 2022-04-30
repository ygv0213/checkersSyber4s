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
    let board = new Board();
    board.drawBoard();

    let clickesArr = [];

    window.addEventListener("click", (e)=>{
        
        if(e.target.tagName === "TD"){
            if(clickesArr.length === 1){
                clickesArr.push(e.target);
                clickesArr[0].parentElement.removeChild(clickesArr[0]);
                clickesArr[1].appendChild(clickesArr[0]);
                clickesArr = [];
            }
        }

        if(e.target.tagName === "IMG"){
            let clickRow = e.target.parentElement.parentElement.rowIndex;
            let clickCol = e.target.parentElement.cellIndex;
            
            clearPreviuseClick(board);
            addCurrentClick(board, clickRow, clickCol);
            
            if(clickesArr.length === 0){
                clickesArr.push(e.target);
            }
        }
    });

});