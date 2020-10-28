// Min Max Bot
const INF = 100000000;

function minMaxPlay() {
    let bestScore = -INF;
    let bestX, bestY;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameBoard[i][j] == playerSign.N) {
                gameBoard[i][j] = getCurrentPlayer().sign;
                let score = minimax(gameBoard, 0, false);
                gameBoard[i][j] = playerSign.N;
                if (score > bestScore) {
                    bestScore = score;
                    bestX = i; bestY = j;
                }
            }
        }
    }
    print(bestX + " " + bestY);
    gameBoard[bestX][bestY] = getCurrentPlayer().sign;
    computeNextPlayer();
}

function minimax(gameBoard, depth, isMaximizing) {
    let result = searchWinner(false);
    if (result !== null) {
        switch (result) {
            case playerSign.T:
                return 0;
            case getCurrentPlayer().sign:
                return 10;
            case getNextPlayer().sign:
                return -10;
        };
    }

    if (isMaximizing) {
        let bestScore = -INF;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == playerSign.N) {
                    gameBoard[i][j] = getCurrentPlayer().sign;
                    let score = minimax(gameBoard, depth + 1, false);
                    gameBoard[i][j] = playerSign.N;
                    bestScore = Math.max(score, bestScore);
                }
            }
        }
        return bestScore;
    } else {
        let bestScore = INF;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == playerSign.N) {
                    gameBoard[i][j] = getNextPlayer().sign;
                    let score = minimax(gameBoard, depth + 1, true);
                    gameBoard[i][j] = playerSign.N;
                    bestScore = Math.min(score, bestScore);
                }
            }
        }
        return bestScore;
    }
}

// Human Player

function mousePressed() {
    if (getCurrentPlayer() != null && getCurrentPlayer().type == "human") {
        let j = floor(mouseX / h);
        let i = floor(mouseY / h);
        print(i + " " + j);
        if (gameBoard[i][j] == playerSign.N) {
            gameBoard[i][j] = getCurrentPlayer().sign;
            computeNextPlayer();
        } else {
            console.log("Unvalid Case");
        }
    }
    if (getCurrentPlayer() != null && getCurrentPlayer().type == "bot") {
        if (searchWinner(false) == null)
            getCurrentPlayer().play();
    }
}