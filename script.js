class chessBoard {
  showBoard() {
    //row counter
    for (let i = 0; i < 8; i++) {
      let playBoard = document.getElementById("gameBoard");
      //column counter
      for (let j = 0; j < 8; j++) {
        let div = document.createElement("div");
        div.classList.add("piece");
        let isBlack = false;
        div.id = `${i}-${j}`;

        (i + j) % 2 ? (isBlack = true) : (isBlack = false);
        isBlack ? div.classList.add("black") : div.classList.add("white");

        playBoard.appendChild(div);
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

class chessPiece {
  // Treat all possible moves the knight could make as children in a tree.
  // Don’t allow any moves to go off the board.
}

function placePieceAndEndPoint() {
  let piecePlaced = false;
  let goalPlaced = false;
  let gameBoard = Array.from(document.querySelectorAll("div.piece"));

  let knightPiece = document.createElement("img");
  knightPiece.src = "./chess-knight-svgrepo-com.svg";
  knightPiece.id = "knightPiece";

  gameBoard.forEach((square) => {
    square.addEventListener("click", () => {
      if (!piecePlaced) {
        square.appendChild(knightPiece);
        piecePlaced = true;
      } else if (piecePlaced && goalPlaced === false) {
        let div = document.createElement("div");
        div.id = "endGoal";
        square.appendChild(div);
        goalPlaced = true;
      }
    });
  });
}
placePieceAndEndPoint();
