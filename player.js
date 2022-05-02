class Player{
    constructor(color){
        this.color = color;
        this.pieces = [];
        this.eatsNum = 0;
        this.gutToEat = false;
    }

    chacksIfPayerMustEat(){
        return;
    }

    chacksPlayerStuck(){
        this.pieces.forEach((e)=>{
            if(e.cantMove() === false){
                return false;
            }
        });
        return true;
    }

    getcolor(){
        return this.color;
    }

    getPieces(){
        return this.pieces;
    }

    mackPlayer(){
        let start = 0;
        let end = 0;
        if(this.color === "black"){
            start = 0;
            end = 3;
        }else{
            start = 5;
            end = 8;
        }
        for(let i = start;i<end;i++){
            for(let j = 0;j<8;j++){
                if(this.color === "black"){
                    if(i % 2 === 0){
                        if(j % 2 !== 0){
                            let piece = new Piece(i, j, this.color);
                            this.pieces.push(piece);
                        }
                    }else{
                        if(j % 2 === 0){
                            let piece = new Piece(i, j, this.color);
                            this.pieces.push(piece);
                        }
                    }
                }else if(this.color === "white"){
                    if(i % 2 !== 0){
                        if(j % 2 === 0){
                            let piece = new Piece(i, j, this.color);
                            this.pieces.push(piece);
                        }
                    }else{
                        if(j % 2 !== 0){
                            let piece = new Piece(i, j, this.color);
                            this.pieces.push(piece);
                        }
                    }
                }
            }
        }
        
    }
}