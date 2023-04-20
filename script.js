class Knight {
  constructor() {
    this.showBoard();
  }

  //BST with possible moves, and depth to determine best solution
  createTree() {
    let convertedPosition = Array.from(this.start).map(Number);
    let convertedGoal = Array.from(this.goal).map(Number);

    //checks if it's out of bounds
    let filtered = chooseSide(convertedPosition, convertedGoal).filter(
      (array) => isOutOfBounds(array[0], array[1])
    );

    //pushes each move into tree.
    for (let i = 0; i < filtered.length; i++) {
      const move = filtered[i];
      const moveName = `move${i}`;
      this.tree[moveName] = move;
    }
  }
  //creates board, with each div's position id and calls placePieceAndEndPoint();
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
    this.placePieceAndEndPoint();
  }
  //get user input of start and goal helper function
  placePieceAndEndPoint() {
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
  //filter out all moves that are out of bounds.
  isOutOfBounds(num1, num2) {
    if (num1 < 0 || num1 > 7 || num2 < 0 || num2 > 7) {
      return false;
    } else {
      return [num1, num2];
    }
  }
}

let knight = new Knight();
