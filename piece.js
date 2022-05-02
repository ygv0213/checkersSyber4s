class Piece {
    constructor(row, col, color) {
        this.row = row;
        this.col = col;
        this.color = color;
        this.quinn = false;
        this.src = "assetes/"+this.color+"Piece.png";
        this.img = document.createElement("img");
        this.td = undefined;
        this.setImgSrc(this.src);
    }

    draw(td){
        this.td = td;
        td.appendChild(this.img);
    }

    removeImgFromTd(){
        if(this.td !== undefined){
            this.td.removeChild(this.img);
        }
    }

    addId(id){
        this.img.classList.add(id);
    }

    removeId(id){
        this.img.classList.remove(id);
    }

    getSrc() {
        return this.src;
    }

    getRow() {
        return this.row;
    }

    getCol() {
        return this.col;
    }

    getColor() {
        return this.color;
    }

    setIndex(row, col){
        this.row = row;
        this.col = col;
    }

    setImgSrc(src){
        this.src = src;
        this.img.setAttribute('src', this.src);
    }

    isAquinn(){
        return this.quinn;
    }

    mackQuinn() {
        this.quinn = true;
        this.setImgSrc("assetes/"+this.color+"Quinn.png");
    }

    cantMove(board){
        //this function chacks if solider is stuck if so return true else return false
        let tmp1 = 0;
        let tmp2 = 0;
        if(this.color === "black"){
            tmp1 = 1;
            tmp2 = 2;
        }else if(this.color === "white"){
            tmp1 = -1;
            tmp2 = -2;
        }
        if(this.row + tmp1 < 8 && this.col + 1 < 8 && this.row + tmp1 > -1){
            if(board[this.row+tmp1][this.col+1] === undefined){
                return false;
            }else if(board[this.row+tmp1][this.col+1].getColor() !== this.color){
                if(this.row + tmp2 < 8 && this.col + 2 < 8 && this.row + tmp1 > -1){
                    if(board[this.row+tmp2][this.col+2] === undefined){
                        return false;
                    }
                }
            }
        }
        if(this.row + tmp1 < 8 && this.col - 1 > -1 && this.row + tmp1 > -1){
            if(board[this.row+tmp1][this.col-1] === undefined){
                return false;
            }else if(board[this.row+tmp1][this.col-1].getColor() !== this.color){
                if(this.row + tmp2 < 8 && this.col - 2 < 8 && this.row + tmp2 > -1){
                    if(board[this.row+tmp2][this.col-2] === undefined){
                        return false;
                    }
                }
            }
        }

        return true;
    }
}