class chessBoard {
  //display chessBoard
  showBoard() {
    //row counter
    for (let i = 0; i < 8; i++) {
      let playBoard = document.getElementById("gameBoard");
      //column counter
      for (let j = 0; j < 8; j++) {
        let div = document.createElement("div");
        div.classList.add("piece");
        let isBlack = false;
        div.id = `${i}${j}`;

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

class chessPiece {
  constructor(start, goal) {
    this.start = start;
    this.goal = goal;
    this.tree = {};
  }

  //BST with possible moves, and depth to determine best solution
  createTree(position = this.start) {
    let currentPosition = Array.from(position).map(Number);
    let i = currentPosition[0];
    let j = currentPosition[1];

    // i = row, j = column
    const possibleMoves = [
      [i - 1, j + 2],
      [i - 2, j + 1],
      [i + 1, j + 2],
      [i + 2, j + 1],
      [i + 1, j - 2],
      [i + 2, j - 1],
      [i - 1, j - 2],
      [i - 2, j - 2],
    ];

    //filter out all moves that are out of bounds.
    function isOutOfBounds(num1, num2) {
      if (num1 < 0 || num1 > 7 || num2 < 0 || num2 > 7) {
        return false;
      } else {
        return [num1, num2];
      }
    }
    let filtered = possibleMoves.filter((array) =>
      isOutOfBounds(array[0], array[1])
    );

    //pushes each move into tree.
    for (let i = 0; i < filtered.length; i++) {
      const move = filtered[i];
      const moveName = `move${i}`;
      this.tree[moveName] = move;
    }

    console.log(this.tree);
  }
}

//get start and end points function
function placePieceAndEndPoint() {
  // piece/goal can only be placed once
  let piecePlaced = false;
  let goalPlaced = false;

  // knight piece image
  let knightPiece = document.createElement("img");
  knightPiece.src = "./chess-knight-svgrepo-com.svg";
  knightPiece.id = "knightPiece";

  //add event listener to each square on gameboard.
  let gameBoard = Array.from(document.querySelectorAll("div.piece"));
  gameBoard.forEach((square) => {
    square.addEventListener("click", () => {
      //place knight piece first
      if (!piecePlaced) {
        square.appendChild(knightPiece);
        piecePlaced = true;
        //place goal piece second
      } else if (piecePlaced && goalPlaced === false) {
        let div = document.createElement("div");
        div.id = "endGoal";
        square.appendChild(div);
        goalPlaced = true;

        knight.start = knightPiece.parentElement.id;
        knight.goal = div.parentElement.id;
      }
    });
  });
}

const board = new chessBoard();
let knight = new chessPiece();
board.showBoard();
placePieceAndEndPoint();

// console.log(chessPiece.log());
