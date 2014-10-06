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

function swap(container, x, y) {
    var temp = container[x];
    container[x] = container[y];
    container[y] = temp;
}

function lookup(matrix, pos) {
    var r = Math.floor(pos / matrix.length),
        c = pos - r * matrix.length;
    return matrix[r][c];
}

function testme(event) {
    var funfun = event,
        cellId = funfun.srcElement.parentElement.id.substr(5),
        keypress = Number(String.fromCharCode(event.keyCode));

    console.log(keypress, cellId, lookup(solution, cellId));
    if (lookup(solution, cellId) !== keypress) {
        event.preventDefault();
    }
}

function permuteBoard(partialBoard, fullBoard) {
    //things to permute:
    //permute alphabet
    //block: a 3x3 grid of numbers - sudoku is a 3x3 grid of Latin square blocks
    //permute blocks by row
    //permute blocks by columns
    //permute rows within block
    //permute columns within block

    //permute alphabet - not the best permutation, but this isn't exactly military-grade Sudoku
    var alpha = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], //i maps to alpha[i], so 0 maps to 0 to preserve empty squares
        seq = String(Math.ceil(Math.random()*1e9)).split(''), //9-digit random number sequence
        temp;

    while (seq.length < 9) {
        seq.unshift(0); //leading zeroes
    }
    seq = seq.map(function(i){ return (i % 9)+1;}); //narrow range to numbers between 1 - 9

    for(var i = 0; 9 > i; ++i) {
        swap(alpha, i+1, seq[i]);   //shuffle alphabet array based on sequence
    }
    return alpha;
}

console.log(permuteBoard(shown, solution));