window.addEventListener("load", (e)=>{
    let body = document.getElementsByTagName("body")[0];
    let div = document.createElement("div");
    div.id = "mainDiv";

    let board = new Board();
    board.drawBoard();

    div.appendChild(board.getBoard());
    body.appendChild(div);
});