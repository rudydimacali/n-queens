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
  var testChildBoards = function(row, col) {
    if (row > board.rows().length - 1) {
      return;
    }
    // toggle the next value
    board.togglePiece(row, col);
    // If a solution is found, add to solutionCount
    if (!board.hasAnyRooksConflicts() && row + 1 === board.rows().length) {
      solutionCount++;
      board.togglePiece(row, col);
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
      var currentPlace = [row, col];
      for (var j = 0; j < board.rows().length; j++) {
        testChildBoards(row + 1, j);
      }
      board.togglePiece(currentPlace[0], currentPlace[1]);
    }
  };
  for (var i = 0; i < board.rows().length; i++) {
    testChildBoards(0, i);
  } 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;
  if (n === 0) {
    return [];
  }
  var board = new Board({n: n});
  var testChildBoards = function(row, col) {
    if (row > board.rows().length - 1 || solution !== undefined) {
      return;
    }
    // toggle the next value
    board.togglePiece(row, col);
    // If a solution is found, add to solutionCount
    if (!board.hasAnyQueensConflicts() && (row + 1 === board.rows().length)) {
      solution = board.rows();
      console.log('solution test', solution);
      return;
    }

    // If there is a queen conflict, remove that queen and return
    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(row, col);
      return;
    }

    // If new board with added piece has no conflicts
    if (!board.hasAnyQueensConflicts() && row < board.rows().length) {
      // Iterate through positions in row below
      var currentPlace = [row, col];
      for (var j = 0; j < board.rows().length; j++) {
        testChildBoards(row + 1, j);
      }
      board.togglePiece(currentPlace[0], currentPlace[1]);
      return;
    }
  };
  for (var i = 0; i < board.rows().length; i++) {
    testChildBoards(0, i);
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var testChildBoards = function(row, col) {
    if (row > board.rows().length - 1) {
      return;
    }
    // toggle the next value
    board.togglePiece(row, col);
    // If a solution is found, add to solutionCount
    if (!board.hasAnyQueensConflicts() && row + 1 === board.rows().length) {
      solutionCount++;
      return;
    }

    // If there is a rook conflict, remove that rook and return
    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(row, col);
      return;
    }

    // If new board with added piece has no conflicts
    if (!board.hasAnyQueensConflicts() && row < board.rows().length) {
      // Iterate through positions in row below
      var currentPlace = [row, col];
      for (var j = 0; j < board.rows().length; j++) {
        testChildBoards(row + 1, j);
      }
      board.togglePiece(currentPlace[0], currentPlace[1]);
    }
  };
  for (var i = 0; i < board.rows().length; i++) {
    testChildBoards(0, i);
  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
