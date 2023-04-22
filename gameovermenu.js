import { updateFinalScoreInHtml, resetScore } from "./score.js";
import { restartSnake } from "./game_loop.js";
import { initMenu, restartMenu } from "./game_menu.js";
import { restartDirections } from "./directions.js";
import { restartPictures } from "./pictures_module.js";
import { restartPositions } from "./positions.js";
import { clearBoard, canvas } from "./draw.js";

let game_over_menu;
let restart_btn;

game_over_menu = getGameOverMenuFromDocument();
restart_btn = getRestartButtonFromDocument();

function getGameOverMenuFromDocument(){
    return document.getElementById('game-over');
}

export function showGameOverMenu(){
    //setMenuVisibilty('visible');
    console.log("showing game over menu");
    game_over_menu.style.display = "flex";
}

export function hideGameOverMenu(){
    //setMenuVisibilty('hidden');
    game_over_menu.style.display = "none";
}

function getRestartButtonFromDocument(){
    return document.getElementById('restart-btn');
}

export function serveGameOverMenu(){
    //update the final score
    updateFinalScoreInHtml();
    //make the menu visible
    showGameOverMenu();
    //listen for restart button
    restart_btn.addEventListener('click', handleRestartButtonClicked)
}

function handleRestartButtonClicked(){
    //hide game over menu;
    hideGameOverMenu();
    hideTrackpad();
    restart_btn.removeEventListener('click', handleRestartButtonClicked)
    //restart game parameters;
    restartSnake();
    restartDirections();
    restartPictures();
    restartPositions();
    restartMenu();
    clearBoard();
    canvas.style.display = "none";
    resetScore();
    //re-init menu
    initMenu();
}

function setMenuVisibilty(visibility_var){
    if(game_over_menu!==null)
        game_over_menu.style.visibility = visibility_var;
    else
        throw new Error("Menu is null, could not set visibility");
}

function hideTrackpad(){
    let trackpad = document.getElementById('trackpad');
    trackpad.style.display = 'none';
}