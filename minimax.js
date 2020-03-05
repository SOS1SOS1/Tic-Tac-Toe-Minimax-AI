function computerMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // checks if the spot is open
      if (board[i][j] == '') {
        // tries this spot and scores the move
        board[i][j] = ai;
        let score = minimax(board, 0,  false);
        //console.log("Score: " + score + "  " + i + " " + j);
        board[i][j] = '';

        // if the move's score is greater than bestScore, it saves it as the new bestScore
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
          //console.log("Best Score: " + bestScore + "  " + i + " " + j);
        }
      }
    }
  }
  // computer uses bestMove
  board[bestMove.i][bestMove.j] = ai;
  // changes player back to human
  currentPlayer = human;
}

let scores = {
  X: -10, // X (human) wins
  O: 10, // O (ai) wins
  tie: 0
}

function minimax(board, depth, isMaximizing) {
  let result = checkForWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {  // ai is looking for highest score
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // checks if the spot is open
        if (board[i][j] == '') {
          board[i][j] = ai;
          let score = minimax(board, depth+1, false) - depth;
          board[i][j] = '';
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {  // human is looking for lowest score
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // checks if the spot is open
        if (board[i][j] == '') {
          board[i][j] = human;
          let score = minimax(board, depth+1, true) + depth;
          board[i][j] = '';
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
