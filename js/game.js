const playerSign = {
    N : 'Empty',
    X : 'X',
    O : 'O'
};

let gameBoard = [
    [playerSign.X, playerSign.O, playerSign.O],
    [playerSign.X, playerSign.X, playerSign.O],
    [playerSign.O, playerSign.X, playerSign.X]
];

let currentPlayer = null;
let players = [playerSign.X, playerSign.O];