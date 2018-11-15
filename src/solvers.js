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
  var testChildBoards = function(board, row, col) {
    if (solution !== undefined) {
      return;
    }
    var childBoard = new Board(board);
    childBoard.togglePiece(row, col);
    console.log(childBoard.rows());
    var rowCounter = row;
    var colCounter = col + 1;
    if (colCounter >= childBoard.rows().length) {
      rowCounter = row + 1;
      colCounter = 0;
    }
    var numPieces = _.reduce(childBoard.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    if (childBoard.hasAnyRooksConflicts()) {
      childBoard.togglePiece(row, col);
      return;
    }
    // If new board with added piece has no conflicts
    if (!childBoard.hasAnyRooksConflicts() && numPieces < childBoard.rows().length) {
      // Loop through remainder of row and add and test
      for (rowCounter; rowCounter < childBoard.rows().length; rowCounter++) {
        for (colCounter; colCounter < childBoard.rows().length; colCounter++) {
          testChildBoards(childBoard.rows(), rowCounter, colCounter);
        }
        colCounter = 0;
      }
    }
    if (!childBoard.hasAnyRooksConflicts() && numPieces === childBoard.rows().length) {
      solution = childBoard.rows();
    }
  };
  testChildBoards(board.rows(), 0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  // Create a counter to hold remaining pieces
  var testChildBoards = function(board, row, col) {
    var childBoard = new Board(board);
    childBoard.togglePiece(row, col);
    console.log(childBoard.rows());
    var rowCounter = row;
    var colCounter = col + 1;
    if (colCounter >= childBoard.rows().length) {
      rowCounter = row + 1;
      colCounter = 0;
    }
    var numPieces = _.reduce(childBoard.rows(), function(memo, row) {
      return memo + _.reduce(row, function(memo, col) {
        return memo + col;
      }, 0);
    }, 0);
    if (childBoard.hasAnyRooksConflicts()) {
      childBoard.togglePiece(row, col);
      return;
    }
    // If new board with added piece has no conflicts
    if (!childBoard.hasAnyRooksConflicts() && numPieces < childBoard.rows().length) {
      // Loop through remainder of row and add and test
      for (rowCounter; rowCounter < childBoard.rows().length; rowCounter++) {
        for (colCounter; colCounter < childBoard.rows().length; colCounter++) {
          testChildBoards(childBoard.rows(), rowCounter, colCounter);
        }
        colCounter = 0;
      }
    }
    if (!childBoard.hasAnyRooksConflicts() && numPieces === childBoard.rows().length) {
      solutionCount++;
    }
  };
  testChildBoards(board.rows(), 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme
  // var board = new Board({n: n});
  // // Create a counter to hold remaining pieces
  // var testChildBoards = function(board, row, col) {
  //   if (solution !== undefined) {
  //     return;
  //   }
  //   var childBoard = new Board(board);
  //   childBoard.togglePiece(row, col);
  //   console.log(childBoard.rows());
  //   var rowCounter = row;
  //   var colCounter = col + 1;
  //   if (colCounter >= childBoard.rows().length) {
  //     rowCounter = row + 1;
  //     colCounter = 0;
  //   }
  //   var numPieces = _.reduce(childBoard.rows(), function(memo, row) {
  //     return memo + _.reduce(row, function(memo, col) {
  //       return memo + col;
  //     }, 0);
  //   }, 0);
  //   if (childBoard.hasAnyQueensConflicts()) {
  //     childBoard.togglePiece(row, col);
  //     return;
  //   }
  //   // If new board with added piece has no conflicts
  //   if (!childBoard.hasAnyQueensConflicts() && numPieces < childBoard.rows().length) {
  //     // Loop through remainder of row and add and test
  //     for (rowCounter; rowCounter < childBoard.rows().length; rowCounter++) {
  //       for (colCounter; colCounter < childBoard.rows().length; colCounter++) {
  //         testChildBoards(childBoard.rows(), rowCounter, colCounter);
  //       }
  //       colCounter = 0;
  //     }
  //   }
  //   if (!childBoard.hasAnyQueensConflicts() && numPieces === childBoard.rows().length) {
  //     solution = childBoard.rows();
  //   }
  // };
  // testChildBoards(board.rows(), 0, 0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
