// tic tac toe board
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // width of canvas divided by 3
let h; // height of canvas divided by 3

let ai = 'O';
let human = 'X';
let currentPlayer = human;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkForWinner() {
  let winner = null;

  // horizontal win
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // vertical win
  for (let j = 0; j < 3; j++) {
    if (equals3(board[0][j], board[1][j], board[2][j])) {
      winner = board[0][j];
    }
  }

  // diagonal win
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[0][2], board[1][1], board[2][0])) {
    winner = board[0][2];
  }

  // checks how many open spots there are on the board
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  // tie
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  // if it is the human's turn, then when the mouse is pressed it places an 'X' on the board
  if (currentPlayer == human) {
    // looks at where human clicked
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);

    // checks if that spot is open
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      computerMove();
    }
  }
}

function draw() {
  // background of canvas
  background(255);
  // line width
  strokeWeight(5);
  // rounds ends of lines
  strokeCap(ROUND);

  // start x, start y, end x, end y
  stroke(0);
  line(w, 5, w, height-5);
  line(w * 2, 5, w * 2, height-5);
  line(5, h, width-5, h);
  line(5, h * 2, width-5, h * 2);

  // draws pieces on board
  for (let j = 0;  j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let r = w / 4;

      let spot = board[i][j];

      if (spot == ai) {
        stroke(48, 102, 190);
        noFill();
        // x, y, diameter
        ellipse(x, y, r * 2);
      } else if (spot == human) {
        stroke(254, 127, 45);
        line(x-r, y-r, x+r, y+r);
        line(x+r, y-r, x-r, y+r);
      }
    }
  }

  let result = checkForWinner();
  if (result != null) {
    // someone won or there was a tie
    noLoop();
    let resultText = createP('');
    resultText.style('font-size', '32pt');
    if (result == 'tie') {
      resultText.html('Tie!');
    } else {
      resultText.html(`${result} wins!`);
    }
  }

}
