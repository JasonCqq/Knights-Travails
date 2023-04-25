class Knight {
  constructor(start = null, goal = null) {
    this.start = start;
    this.goal = goal;
    this.showBoard();
  }

  move(x = this.start) {
    let mainQueue = this.possibleMoves(x); // [[], [], [], [], []]
    const visited = new Set(); // {}
    const allPaths = new Set(); // {}

    //Gets all possible moves
    while (mainQueue.length !== 0) {
      console.log(allPaths);
      //while queue is not empty
      let dequeuedMove = mainQueue.shift();
      visited.add(dequeuedMove);

      let currentPath = [];
      currentPath.push(dequeuedMove);

      let queue2 = this.possibleMoves(dequeuedMove);
      for (let i = 0; i < queue2.length; i++) {
        if (!visited.has(queue2[i])) {
          currentPath.push(queue2[i]);
          visited.add(queue2[i]);
          console.log(queue2[i][0], queue2[i][1], this.goal[0], this.goal[1]);
          if (queue2[i][0] === this.goal[0] && queue2[i][1] === this.goal[1]) {
            currentPath.push(queue2[i]);
            allPaths.add([...currentPath]);
            currentPath = [];
          } else {
            currentPath.pop();
          }
        }
      }
    }
    return allPaths;
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
  //get user input of start and goal helper function.
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

          knight.start = Array.from(knightPiece.parentElement.id).map(Number);
          knight.goal = Array.from(div.parentElement.id).map(Number);
        }
      });
    });
  }
  //return possible moves array without out of bound moves.
  possibleMoves(i) {
    function isOutOfBounds(num1, num2) {
      if (num1 < 0 || num1 > 7 || num2 < 0 || num2 > 7) {
        return false;
      } else {
        return [num1, num2];
      }
    }

    let moves = [
      [i[0] - 1, i[1] - 2],
      [i[0] - 2, i[1] - 1],
      [i[0] + 1, i[1] - 2],
      [i[0] + 2, i[1] - 1],
      [i[0] - 2, i[1] + 1],
      [i[0] - 1, i[1] + 2],
      [i[0] + 1, i[1] + 2],
      [i[0] + 2, i[1] + 1],
    ];

    let filtered = moves.filter((move) => isOutOfBounds(move[0], move[1]));
    return filtered;
  }
}

let knight = new Knight();
