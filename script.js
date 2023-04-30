class Knight {
  constructor(start = null, goal = null) {
    this.start = start;
    this.goal = goal;
    this.showBoard();
  }

  move() {
    const root = new Move(this.start, null);
    const mainQueue = [root];
    const allPaths = [];
    const visited = new Map();
    let counter = 0;

    while (mainQueue.length !== 0) {
      let dequeueFromMain = mainQueue.shift();
      let dequeuedMove = new Move(dequeueFromMain.current, null);

      counter++;
      visited.set(`move${counter}`, dequeueFromMain.current);

      //Set previous node to Root if no previous nodes.
      JSON.stringify(dequeueFromMain.current) ===
        JSON.stringify(root.current) && dequeueFromMain.current !== undefined
        ? (dequeuedMove.prev = root)
        : (dequeuedMove.prev = dequeueFromMain);

      //Push new moves into mainQueue
      let tempMoveArr = this.possibleMoves(dequeueFromMain).filter(
        (move) => !this.visitedBefore(move.current, visited)
      );

      for (let a = 0; a < tempMoveArr.length; a++) {
        counter++;
        visited.set(`move${counter}`, tempMoveArr[a].current);
        if (
          tempMoveArr[a].current[0] === this.goal[0] &&
          tempMoveArr[a].current[1] === this.goal[1]
        ) {
          let currentPath = [];
          let moveRoot = tempMoveArr[a].prev;
          while (moveRoot) {
            console.log(moveRoot);
            currentPath.push(moveRoot.current);
            moveRoot = moveRoot.prev;
          }
          currentPath.reverse();
          let newPath = [...currentPath, this.goal];
          allPaths.push(newPath);
        } else {
          console.log("hi");
          mainQueue.push(tempMoveArr[a]);
        }
      }
    }
    return allPaths;
  }

  //helper function to check if move has been visited
  visitedBefore(move, map) {
    for (const value of map.values()) {
      if (JSON.stringify(move) === JSON.stringify(value)) {
        return true;
      }
    }
    return false;
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
  possibleMoves(node) {
    function isOutOfBounds(num1, num2) {
      if (num1 < 0 || num1 > 7 || num2 < 0 || num2 > 7) {
        return false;
      } else {
        return [num1, num2];
      }
    }

    let moves = [
      [node.current[0] - 1, node.current[1] - 2],
      [node.current[0] - 2, node.current[1] - 1],
      [node.current[0] + 1, node.current[1] - 2],
      [node.current[0] + 2, node.current[1] - 1],
      [node.current[0] - 2, node.current[1] + 1],
      [node.current[0] - 1, node.current[1] + 2],
      [node.current[0] + 1, node.current[1] + 2],
      [node.current[0] + 2, node.current[1] + 1],
    ];

    let filtered = moves.filter((move) => isOutOfBounds(move[0], move[1]));
    let array = [];
    for (let i = 0; i < filtered.length; i++) {
      let move = new Move(filtered[i], node);
      array.push(move);
    }
    return array;
  }
}

class Move {
  constructor(current, prev) {
    this.current = current;
    this.prev = prev;
  }
}
let knight = new Knight();
