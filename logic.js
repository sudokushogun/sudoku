var shown = [
        //0 marks empty sudoku squares
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0], 
        [8, 0, 0, 0, 6, 0, 0, 0, 3], 
        [4, 0, 0, 8, 0, 3, 0, 0, 1], 
        [7, 0, 0, 0, 2, 0, 0, 0, 6], 
        [0, 6, 0, 0, 0, 0, 2, 8, 0], 
        [0, 0, 0, 4, 1, 9, 0, 0, 5], 
        [0, 0, 0, 0, 8, 0, 0, 7, 9] 
    ],
    solution = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];

function lookup(matrix, pos) {
    //lookup 2D matrix by offset from 0
    var r = Math.floor(pos / matrix.length),
        c = pos - r * matrix.length;
    return matrix[r][c];
}

function checkSolution(event) {
    //check typed user entry against position in solution matrix
    var funfun = event,
        cellId = funfun.srcElement.parentElement.id.substr(5),
        keypress = Number(String.fromCharCode(event.keyCode));

    console.log(keypress, cellId, lookup(solution, cellId));
    if (lookup(solution, cellId) !== keypress) {
        event.preventDefault();
    }
}


function swapElements(firstContainer, firstIndex, secondContainer, secondIndex) {
    var temp = firstContainer[firstIndex];
    firstContainer[firstIndex] = secondContainer[secondIndex];
    secondContainer[secondIndex] = temp;
}

function swapVectors(partialBoard, fullBoard, firstIndex, secondIndex, isColumn) {
    //swap two vectors on the board
    if (!isColumn) {
        swapElements(partialBoard, firstIndex, partialBoard, secondIndex);    //swap arrays
        swapElements(fullBoard, firstIndex, fullBoard, secondIndex);
    } else {
        for(var i = 0; partialBoard.length > i; ++i) {
            //partialBoard and fullBoard should have the same dimensions
            swapElements(partialBoard[i], firstIndex, partialBoard[i], secondIndex);
            swapElements(fullBoard[i], firstIndex, fullBoard[i], secondIndex);
        }
    }
}

function permuteBoard(partialBoard, fullBoard) {
    permuteNumbers(partialBoard, fullBoard);
    permuteVectors(partialBoard, fullBoard);
}

function permuteVectors(partialBoard, fullBoard) {
    var rowShuffle, colShuffle, blockShuffle;

    for(var start = 0; 9 > start; start += 3) {
        //get a random number from 0 - 5 for three-element permutation: 3! = 6
        rowShuffle = Math.floor(Math.random() * 10) % 6;
        colShuffle = Math.floor(Math.random() * 10) % 6;
        blockShuffle = Math.floor(Math.random() * 10) % 6;

        //permutes rows and columns within blocks
        swapVectors(partialBoard, fullBoard, start, start + (rowShuffle % 3), false);    //shuffle first row
        swapVectors(partialBoard, fullBoard, start + 1, start + 1 + (rowShuffle % 2), false);   //shuffle second row
        swapVectors(partialBoard, fullBoard, start, start + (colShuffle % 3), true);    //shuffle first column
        swapVectors(partialBoard, fullBoard, start + 1, start + 1 + (colShuffle % 2), true);   //shuffle second column

        //permute blocks
        for(var i = 0; 3 > i; ++i) {
            swapVectors(partialBoard, fullBoard, i, (blockShuffle % 3) * 3 + i, false); //permute first block by row
            swapVectors(partialBoard, fullBoard, i, (1 + (blockShuffle % 2)) * 3 + i, false);   //permute second block by row
            swapVectors(partialBoard, fullBoard, i, (blockShuffle % 3) * 3 + i, true);  //permute first block by column
            swapVectors(partialBoard, fullBoard, i, (1 + (blockShuffle % 2)) * 3 + i, true);    //permute second block by column
        }
    }
}

function permuteNumbers(partialBoard, fullBoard) {
    //permutes number sequence on boards
    var alpha = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //alphabet array of numbers for permutation
        seq = String(Math.floor(Math.random()*1e9)).split(''); //9-digit random number sequence (excluding leading zeroes)

    while (seq.length < 9) {
        seq.unshift(0); //handle leading zeroes
    }
    seq = seq.map(function(i){ return (i % 9) + 1;}); //narrow range to numbers between 1 - 9

    for(var i = 0; 9 > i; ++i) {
        swapElements(alpha, i+1, alpha, seq[i]);   //shuffle alphabet array based on sequence ignore 0's (empty squares)
    }
    for(var i = 0; 9 > i; ++i) {
        for(var j = 0; 9> j; ++j) {
            partialBoard[i][j] = alpha[partialBoard[i][j]]; //shuffle alphabet
            fullBoard[i][j] = alpha[fullBoard[i][j]];
        }
    }
}

//console.log(permuteBoard(shown, solution));
permuteBoard(shown, solution);