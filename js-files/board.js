class Board {
    constructor(){
        this.board = [];
        this.whitePlayer = new Player("white");
        this.blackPlayer = new Player("black");
        this.setBoard();
    }

    getBoard(){
        return this.board;
    }

    getWhitePieces(){
        return this.whitePlayer;
    }

    getBlackPieces(){
        return this.blackPlayer;
    }
    
    setBoard(){
        //this method set all board default values to undefinted
        for(let i = 0;i<8;i++){
            let row = [];
            for(let j=0;j<8;j++){
                row.push(undefined);
            }
            this.board.push(row);
        }
    }

    drawBoard(){ 
        //this method darw the board and adding the pieces to the array board
        let table = document.createElement("table");
        let body = document.getElementsByTagName("body")[0];
        let div = document.createElement("div");
        let tr = document.createElement("tr");
        let td = document.createElement("td");

        div.id = "mainDiv";
    
        this.whitePlayer.mackPlayer();
        this.blackPlayer.mackPlayer();

        for(let i = 0;i<8;i++){
            tr = document.createElement("tr");
            for(let j=0;j<8;j++){
                td = document.createElement("td");
                this.whitePlayer.getPieces().forEach((piece)=>{
                    if(i === piece.getRow() && j === piece.getCol()){
                        piece.draw(td);
                        this.board[i][j] = piece;
                    }
                });
                this.blackPlayer.getPieces().forEach((piece)=>{
                    if(i === piece.getRow() && j === piece.getCol()){
                        piece.draw(td);
                        this.board[i][j] = piece;
                    }
                });
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        div.appendChild(table);
        body.appendChild(div);
    }
}