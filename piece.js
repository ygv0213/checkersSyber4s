class Piece{
    constractor(row, col, color){
        this.row = row;
        this.col = col;
        this.color = color;
        this.quinn = false;
        if(this.quinn === true && this.color === "black"){
            this.src = "";
        }else if(this.quinn === true && this.color === "white"){
            this.src = "";
        }else if(this.quinn === false && this.color === "black"){
            this.src = "";
        }else if(this.quinn === false && this.color === "black"){
            this.src = "";
        }
    }

    draw(){
        let img = document.createElement("img");
        img.src = this.src;
    }
}