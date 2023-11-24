var devices = window.innerWidth
var boardHeight,boardWidth;
if(devices<600){
    boardHeight=500
    boardWidth=360
}
else{
    boardHeight=700
    boardWidth=700
}
let scoreLimit=5;
let gameOver=false;
//sound
function playBg() {
    document.getElementById("bgaudio").play();
}

window.onload = playBg;


//board
let board;
let context; 

//players
let playerWidth = 10;
let playerHeight = 100;
let playerVelocityY = 0;

let player1 = {
    x : 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

let player2 = {
    x : boardWidth - playerWidth - 10,
    y : boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY : 0
}

//ball
let ballWidth = 10;
let ballHeight = 10;
let ball = {
    x : boardWidth/2,
    y : boardHeight/2,
    width: ballWidth,
    height: ballHeight,
    velocityX : 5,
    velocityY : 5
}

let player1Score = 0;
let player2Score = 0;

let storedPlayer1Score = localStorage.getItem("player1Score");
let storedPlayer2Score = localStorage.getItem("player2Score");

if(storedPlayer1Score !== null){
    player1Score = parseInt(storedPlayer1Score);
}
if(storedPlayer2Score !== null){
    player2Score = parseInt(storedPlayer2Score);
}


window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board

    //draw initial player1
    context.fillStyle="skyblue";
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);
    document.addEventListener("touchstart",touchPlayer);
    document.addEventListener("touchmove", touchPlayer);
    document.addEventListener("touchend", restartGameOntouch);
}

function update() {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    // player1
    context.fillStyle = "skyblue";
    let nextPlayer1Y = player1.y + player1.velocityY;
    if (!outOfBounds(nextPlayer1Y)) {
        player1.y = nextPlayer1Y;
    }
    // player1.y += player1.velocityY;
    context.fillRect(player1.x, player1.y, playerWidth, playerHeight);

    // player2
    let nextPlayer2Y = player2.y + player2.velocityY;
    if (!outOfBounds(nextPlayer2Y)) {
        player2.y = nextPlayer2Y;
    }
    // player2.y += player2.velocityY;
    context.fillRect(player2.x, player2.y, playerWidth, playerHeight);

    // ball
    context.fillStyle = "white";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ballWidth, ballHeight);

    if (ball.y <= 0 || (ball.y + ballHeight >= boardHeight)) { 
        // if ball touches top or bottom of canvas
        ball.velocityY *= -1; //reverse direction
    }

    //bounce the ball back
    if (detectCollision(ball, player1)) {
        if (ball.x <= player1.x + player1.width) { //left side of ball touches right side of player 1 (left paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }
    else if (detectCollision(ball, player2)) {
        if (ball.x + ballWidth >= player2.x) { //right side of ball touches left side of player 2 (right paddle)
            ball.velocityX *= -1;   // flip x direction
        }
    }

    //game over
   
    if (ball.x < 0) {
        player2Score++;
        if (player2Score >= scoreLimit) {
            endGame("Player 2");
        } else {
            resetGame(1);
        }
    } else if (ball.x + ballWidth > boardWidth) {
        player1Score++;
        if (player1Score >= scoreLimit) {
            endGame("Player 1");
        } else {
            resetGame(-1);
        }
    }

    //update scores in local storage
    localStorage.setItem("player1Score",player1Score.toString());
    localStorage.setItem("player2Score",player2Score.toString());

    //score
    context.font = "45px sans-serif";
    context.fillText(player1Score, boardWidth/5, 45);
    context.fillText(player2Score, boardWidth*4/5 - 45, 45);

    // draw dotted line down the middle
    for (let i = 10; i < board.height; i += 25) { //i = starting y Position, draw a square every 25 pixels down
        // (x position = half of boardWidth (middle) - 10), i = y position, width = 5, height = 5
        context.fillRect(board.width / 2 - 10, i, 5, 5); 
    }
}

function outOfBounds(yPosition) {
    return (yPosition < 0 || yPosition + playerHeight > boardHeight);
}

function movePlayer(e) {
    //player1
    if (e.code == "KeyW") {
        player1.velocityY = -5;
    }
    else if (e.code == "KeyS") {
        player1.velocityY = 5;
    }

    //player2
    if (e.code == "ArrowUp") {
        player2.velocityY = -5;
    }
    else if (e.code == "ArrowDown") {
        player2.velocityY = 5;
    }
}

function touchPlayer(e){
    if(e.type === "touchstart" || e.type === "touchmove"){

        if(e.touches[0].clientY<window.innerHeight/2){

            player1.velocityY = -5;
        }else{
            player1.velocityY = 5;
        }
        if(e.touches[0].clientY<window.innerHeight/2){

            player2.velocityY = -5;
        }else{
            player2.velocityY = 5;
        }
    }
    else if(e.type === "touchend"){
        restartGameOntouch();
    }
}


function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}

function resetGame(direction) {
    
        ball.x = boardWidth/2,
        ball.y = boardHeight/2,
        // width: ballWidth,
        // height: ballHeight,
        ball.velocityX = direction,
        ball.velocityY = 2
    
}

function endGame(winner) {
    gameOver = true;
    context.fillStyle = "black";
    context.fillRect(0, 0, boardWidth, boardHeight);

    context.fillStyle = "white";
    context.font = "50px sans-serif";
    context.fillText(`${winner} Wins!`, boardWidth / 10, boardHeight / 2);

    context.font = "30px sans-serif";
    context.fillText("Press 'R' or 'click'to restart", boardWidth / 10, boardHeight / 2 + 50);

    document.addEventListener("keydown", restartGame);
}

function restartGame(e) {
    if (e.code === "KeyR") {
        gameOver = false;
        player1Score = 0;
        player2Score = 0;
        resetGame(1);
        requestAnimationFrame(update);
        document.removeEventListener("keydown", restartGame);

        //clear scores from local storage on restart the game
        localStorage.removeItem("player1Score");
        localStorage.removeItem("player2Score");
    }
}
 
function restartGameOntouch(){
    if(gameOver){
        gameOver = false;
        player1Score = 0;
        player2Score = 0;
        resetGame(1);
        requestAnimationFrame(update);

        localStorage.removeItem("player1Score");
        localStorage.removeItem("player2Score");
    }
}
