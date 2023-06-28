import './style.css'

const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score")
let snakeX = 10, snakeY = 20;
let mouvementX = 0, mouvementY = 0;
let foodX = 20, foodY = 10;
let score = 0
let snakeBody = []
let highscoreElement = document.querySelector(".high-score")

if (!localStorage.getItem('highscore')) {
    localStorage.setItem('highscore', 0)
}

highscoreElement.textContent = `highscore : ${localStorage.getItem('highscore')}`

function gameOver() {
    clearInterval(interval)
    alert("Game Over")
    if (localStorage.getItem('highscore') < score) {
        localStorage.setItem('highscore', score)
        highscoreElement.textContent = `highscore : ${score}`
    }


    window.location.reload()
}

const initGame = () => {
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if (snakeY == foodY && snakeX == foodX) {
        foodX = Math.floor(Math.random() * 30) + 1
        foodY = Math.floor(Math.random() * 30) + 1 
        score += 1
        scoreElement.textContent = `Score : ${score}`
        snakeBody.push([foodX, foodY])
    }

    snakeY += mouvementY
    snakeX += mouvementX

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1]
    }

    snakeBody[0] = [snakeX, snakeY] 

    if (snakeY < 0 || snakeY > 31 || snakeX < 0 || snakeX > 31) {
        gameOver()
    }

    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1] && i!=0){
            gameOver()
        } 
    }

    playBoard.innerHTML = html;
}

document.addEventListener('keyup', changePosition);

function changePosition(event) {
    console.log(event)
    if (event.key == "ArrowUp" && mouvementY != 1) {
        console.log("auto1")
        mouvementY = -1
        mouvementX = 0
    }
    if (event.key == "ArrowDown" && mouvementY != -1) {
        console.log("auto2")
        mouvementY = 1
        mouvementX = 0
    }
    if (event.key == "ArrowRight" && mouvementX != -1) {
        console.log("auto3")
        mouvementX = 1
        mouvementY = 0
    }
    if (event.key == "ArrowLeft" && mouvementX != 1) {
        console.log("auto4")
        mouvementX = -1
        mouvementY = 0
    }
}

let interval = setInterval(initGame, 100)

