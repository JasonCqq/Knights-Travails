class chessBoard {
  showBoard() {
    //row counter
    for (let i = 0; i < 8; i++) {
      let board = document.getElementById(`gameBoard`);
      //column counter
      for (let j = 0; j < 8; j++) {
        let div = document.createElement("div");
        let isBlack = false;
        div.id = `${i}-${j}`;
        div.textContent = "X";

        (i + j) % 2 ? (isBlack = true) : (isBlack = false);
        isBlack ? div.classList.add("black") : div.classList.add("white");
        board.appendChild(div);
        isBlack = !isBlack;
      }
    }
  }

  gameBoard = [
    [1, 2, 3, 4, 5, 6, 7, 8], //row 1
    [1, 2, 3, 4, 5, 6, 7, 8], //row 2
    [1, 2, 3, 4, 5, 6, 7, 8], //row 3
    [1, 2, 3, 4, 5, 6, 7, 8], //row 4
    [1, 2, 3, 4, 5, 6, 7, 8], //row 5
    [1, 2, 3, 4, 5, 6, 7, 8], //row 6
    [1, 2, 3, 4, 5, 6, 7, 8], //row 7
    [1, 2, 3, 4, 5, 6, 7, 8], //row 8
  ];
}
const board = new chessBoard();
board.showBoard();
