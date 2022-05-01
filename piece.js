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

}