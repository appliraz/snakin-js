
import { getSelectedPlayer, getSelectedDifficulty, initMenu} from "./game_menu.js";
import { getInitFoodPosition, getInitSnakePosition, getUpdatedSnake, getUpdatedFood } from "./positions.js";
import { draw } from "./draw.js";
import { foodCollision, handleFoodCollisionPositions, updateSnakePosition, bodyCollision, wallsCollision} from "./positions.js";
import { addScorePoints } from "./score.js";
import { getSnakeDirection, setSnakeDirection} from "./directions.js";
import {serveGameOverMenu} from "./gameovermenu.js";


const difficulties = {"easy": 200, "medium": 110, "hard": 55, "extreme": 30, "Easy": 200, "Medium": 110, "Hard": 55, "Extreme": 30};
let difficulty;

let snake = []
let food; 

let selected_player = ""
let selected_difficulty = ""

let game_running = false;

let game_interval;



export function initalizeGame(){
  selected_player = getSelectedPlayer();
  selected_difficulty = getSelectedDifficulty();
  difficulty = difficulties[selected_difficulty];
  snake = getInitSnakePosition();
  food = getInitFoodPosition();
}

function runGame(){
  if(!game_running){
    return;
  }
  draw();
  if(getSnakeDirection()!='STOP');{
    updateSnakePosition();
    snake = getUpdatedSnake();
  }
  if(foodCollision()){
    console.log("food collide");
    handleFoodCollisionPositions();
    food = getUpdatedFood();
    addScorePoints();
  }
  if(isGameOver())
    handleGameOver();
}

export function isGameRunnin(){
  return game_running;
}


function isGameOver(){
  return bodyCollision() || wallsCollision();
}

function handleGameOver(){
  game_running = false;
  setSnakeDirection('END');
  //drawEndSnake();
  serveGameOverMenu();
}

export function startGameRun(){
  game_running = true;
  game_interval = setInterval(runGame, difficulty);
}

export function start(){
  initMenu(); //calls startGameRun afterStartButtonClicked
}

export function getPlayerName(){
  return selected_player;
}

export function getSnake(){
  return snake;
}

export function getFood(){
  return food;
}

export function restartSnake(){
  snake = [];
  food = {};
  setSnakeDirection('STOP');
  selected_player = "";
  selected_difficulty = "";
  game_running = false;
  difficulty = "";
  clearInterval(game_interval);
}


