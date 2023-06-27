import './style.css'

const playBoard = document.querySelector(".play-board");
const snakeX = 5, snakeY = 5;

const initGame = () => {
    let html = `<div class="snake" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = html;
}

initGame();