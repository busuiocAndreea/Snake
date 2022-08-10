let blockSize = 30;
let rows = 25;
let cols = 25;
let board;
let context;


let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0
let snakeBody = [];
let baitX;
let baitY;
let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeBait();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 2000/10);
}
function placeBait() {
    baitX = Math.floor(Math.random() * cols) * blockSize;
    baitY = Math.floor(Math.random() * cols) * blockSize;
}

function update() {
    if (gameOver){
        return;
    }
    context.fillStyle = '#002b36';
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "#eee8d5";
    context.fillRect(baitX, baitY, blockSize,blockSize);

    if(snakeX == baitX && snakeY == baitY) {
        snakeBody.push([baitX, baitY])
        placeBait();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "orange";
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("You lost!");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("You lost!");    
        }
    }

}

function changeDirection(e) {
    if(e.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    }
    if(e.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    }
    if(e.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0;
    }
    if(e.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }
}
