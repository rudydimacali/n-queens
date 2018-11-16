/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined;
  var board = new Board({n: n});
  // Create a counter to hold remaining pieces
  var testChildBoards = function(row, col) {
    if (row > board.rows().length - 1 || solution !== undefined) {
      return;
    }
    // toggle the next value
    board.togglePiece(row, col);
    // If a solution is found, add to solutionCount
    if (!board.hasAnyRooksConflicts() && row + 1 === board.rows().length) {
      solution = board.rows();
      return;
    }

    // If there is a rook conflict, remove that rook and return
    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(row, col);
      return;
    }

    // If new board with added piece has no conflicts
    if (!board.hasAnyRooksConflicts() && row < board.rows().length) {
      // Iterate through positions in row below
      for (var j = 0; j < board.rows().length; j++) {
        testChildBoards(row + 1, j);
      }
    }
  };
  testChildBoards(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // Create a counter to hold remaining pieces
  var solutionCount = 0;
  var board = new Board({n: n});
  var testChildBoards = function(row) {
    // toggle the passed value value
    if (!board.hasAnyRooksConflicts()) {
      if (row < n) {
        for (var j = 0; j < n; j++) {
          board.togglePiece(row, j);
          testChildBoards(row + 1);
          board.togglePiece(row, j);
        }        
      } else if (board.rows().length === n) {
        solutionCount++;
        return;        
      }
    }
  };
  testChildBoards(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  debugger;
  var solution = undefined;
  var board = new Board({n: n});
  var testChildBoards = function(row) {
    // toggle the passed value value
    if (row === n) {
      solution = board.rows();
      return;
    }
    for (var j = 0; j < n; j++) {
      if (solution === undefined) {
        board.togglePiece(row, j);
        if (!board.hasAnyQueensConflicts()) {
          testChildBoards(row + 1);
        }
        if (solution === undefined && board.rows()[row][j] === 1) {
          board.togglePiece(row, j);
        }
      } else {
        return;
      }
    }
  };
  testChildBoards(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solution === undefined) {
    return board.rows();
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  if (n === 0) {
    return 1;
  }
  var testChildBoards = function(row) {
    // toggle the passed value value
    if (row === n) {
      solutionCount++;
      return;
    }
    for (var j = 0; j < n; j++) {
      board.togglePiece(row, j);
      if (!board.hasAnyQueensConflicts()) {
        testChildBoards(row + 1);
      }
      board.togglePiece(row, j);
    }
  };
  testChildBoards(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
