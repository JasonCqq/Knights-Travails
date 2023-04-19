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

    let currentGoal = Array.from(this.goal).map(Number);
    let side; //side = bottom-right / top-right etc
    //finds the correct 1/4 portion
    if (currentGoal[1] <= j) {
      //left side
      currentGoal[0] <= i ? (side = "top-left") : (side = "bottom-left");
    } else if (currentGoal[1] > j) {
      //right side
      currentGoal[0] <= i ? (side = "top-right") : (side = "bottom-right");
    }

    //finds the right moves to push into the right portion.
    //i = row, j = column
    let possibleMoves = [];
    switch (side) {
      case "top-left":
        possibleMoves.push([i - 1, j - 2]);
        possibleMoves.push([i - 2, j - 1]);
        break;
      case "bottom-left":
        possibleMoves.push([i + 1, j - 2]);
        possibleMoves.push([i + 2, j - 1]);
        break;
      case "top-right":
        possibleMoves.push([i - 2, j + 1]);
        possibleMoves.push([i - 1, j + 2]);
        break;
      case "bottom-right":
        possibleMoves.push([i + 1, j + 2]);
        possibleMoves.push([i + 2, j + 1]);
        break;
    }

    //checks if it's out of bounds
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

class move {
  constructor(position, move1, move2) {
    this.move1 = move1;
    this.move2 = move2;
    this.position = position;
  }
}

//HELPER FUNCTIONS BELOW
//filter out all moves that are out of bounds.
function isOutOfBounds(num1, num2) {
  if (num1 < 0 || num1 > 7 || num2 < 0 || num2 > 7) {
    return false;
  } else {
    return [num1, num2];
  }
}
//creates board, with each div's position id
function showBoard() {
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
//get user input of start and goal helper function
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

showBoard();
let knight = new chessPiece();
placePieceAndEndPoint();
