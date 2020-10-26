var w,h;

function drawPlayerSign(sign, x, y) {
    switch(sign) {
        case playerSign.X :
            let xRadius = w/4;
            line(x-xRadius, y-xRadius, x+xRadius, y+xRadius);
            line(x+xRadius, y-xRadius, x-xRadius, y+xRadius);
            break;
        case playerSign.O :
            noFill();
            ellipse(x,y,w*2/3);
            break;
        default :
            // EmptyCase
    }
}

function drawWinnerLine(i, type) {
    stroke('red');
    strokeWeight(3);
    switch(type) {
        case 'h' :
            let y = h*i + h/2;
            line(w/6, y, width-w/6, y);
            break;
        case 'v' :
            let x = w*i + w/2;
            line(x, h/6, x, height-h/6);
            break;
        case 'd' :
            let x_0 = w*i + (i*2+1) * w/6;
            let x_1 = w*(2-i) + ((2-i)*2 + 1) * w/6; 
            line(x_0, h/6, x_1, height - h/6);
    }
}

function setup() {
    createCanvas(400, 400);
    w = width/3;
    h = height/3; 
}
  
function draw() {
    background('yellow');
    stroke('green');
    strokeWeight(6);
    for(let i = 0; i<4; i++) {
        line(w*i, 0, w*i, height);
        line(0, h*i, width, h*i);
    }
    strokeWeight(5);
    stroke('black');
    for (let j = 0; j<3 ; j++) {
        for (let i = 0; i<3; i++) {
            let x = w*i + w/2;
            let y = h*j + h/2;
            drawPlayerSign(gameBoard[j][i], x, y);
        }
    }
    //currentPlayer = getNextPlayer();
    //play(currentPlayer);
    searchWinner();
}

function tripleEquality(a, b, c) {
    return (a == b && b == c);
}

function searchWinner() {
    for (let i = 0; i < 3; i++) {
        if (tripleEquality(gameBoard[i][0], gameBoard[i][1], gameBoard[i][2])) {
            drawWinnerLine(i, 'h');    
            return gameBoard[i][0];      
        }
        if (tripleEquality(gameBoard[0][i], gameBoard[1][i], gameBoard[2][i])) {
            drawWinnerLine(i, 'v');
            return gameBoard[0][i];
        }
    }

    if (tripleEquality(gameBoard[0][0], gameBoard[1][1], gameBoard[2][2])) {
        drawWinnerLine(0, 'd');
        return gameBoard[0][0];
    }

    if (tripleEquality(gameBoard[0][2], gameBoard[1][1], gameBoard[2][0])) {
        drawWinnerLine(2, 'd');
        return gameBoard[0][2];
    }

}