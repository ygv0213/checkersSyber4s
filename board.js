class Board {
    constractor(){
        this.white = [];
        this.black = [];
        this.board = undefined;
    }
    drawBoard(){
        this.board = document.createElement("table");
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        for(let i = 0;i<8;i++){
            tr = document.createElement("tr");
            for(let j=0;j<8;j++){
                td = document.createElement("td");
                tr.appendChild(td);
            }
            this.board.appendChild(tr);
        }
    }

    getBoard(){
        return this.board;
    }
}