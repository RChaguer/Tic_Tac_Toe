const playerSign = {
    N : 'Empty',
    X : 'X',
    O : 'O',
    T : 'Tie'
};

var partyNumber = 1;

var gameBoard = [
    [playerSign.N, playerSign.N, playerSign.N],
    [playerSign.N, playerSign.N, playerSign.N],
    [playerSign.N, playerSign.N, playerSign.N]
];

let player1 = {
    type : "human",
    sign : playerSign.X,
};

let player3 = {
    type : "human",
    sign : playerSign.O,
};

let player2 = {
    type : "bot",
    sign : playerSign.O,
    play : function() {
        minMaxPlay();
    }
};

let currentPlayer = player1;

function getCurrentPlayer() {
    return currentPlayer;
}

function getNextPlayer() {
    if (currentPlayer == player1) {
        return player2;
    } else {
        return player1;
    }
}

function computeNextPlayer() {
    if (currentPlayer == player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
}

function keyPressed() {
    if (keyCode === RETURN) {
        console.log("Restart the party");
        for (let i = 0; i < 3; i++) 
            for (let j = 0; j < 3; j++) 
                gameBoard[i][j] = playerSign.N;
        currentPlayer = player1;
        if (!isLooping()) {
            partyNumber++;
            loop();
        }
    }
}