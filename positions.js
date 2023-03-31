import {player_img_height, player_img_width, food_radius, box, board_height, board_width, board_left_bound, board_top_bound} from "./draw.js"
import { getSnakeDirection } from "./directions.js";

let snake = []
let food;
let prev_x;
let prev_y;

export function getInitSnakePosition(){
    snake[0] = {x: getRandom(), y: getRandom()};
    return snake;
}

export function getInitFoodPosition(){
    food = {x: setRandPos('x'), y: setRandPos('y')};
    return food;
}



function isFreeSpace(cord_type, cord){
    for(let i = 0; i<snake.length; i++){
        let c = (cord_type=='x' ? snake[i].x : snake[i].y);
        if(c==cord)
            return false;
    }
    return true
}

export function updateSnakePosition(){
  prev_x = snake[0].x;
  prev_y = snake[0].y
  //update head
  updateHeadPoistion();
  //update body
  updateBodyPosition();
  //check after new snake position if there was a food collison
};



export function handleFoodCollisionPositions(){
    snake.push({x: prev_x, y: prev_y});
    updateFoodPosition();
}

function updateHeadPoistion(){
    snake[0] = {x: getNewPosX(prev_x), y: getNewPosY(prev_y)};
}

function updateBodyPosition(){
  let snakedirection = getSnakeDirection();
  if(snakedirection=='STOP' || snakedirection=='END')
    return;
  for(let i=1; i<snake.length;i++){
    let next_x = snake[i].x;
    let next_y = snake[i].y;
    snake[i] = {x: prev_x, y: prev_y};
    prev_x = next_x;
    prev_y = next_y;
  }
}

function updateFoodPosition(){
    food = {x: setRandPos('x'), y: setRandPos('y')};
  }



/** Collisions */

export function foodCollision(){
    let snake_x1 = snake[0].x;
    let snake_x2 = snake[0].x + player_img_width;
    let snake_y1 = snake[0].y;
    let snake_y2 = snake[0].y + player_img_height;
    let food_x1 = food.x;
    let food_x2 = food.x + food_radius*2;
    let food_y1 = food.y;
    let food_y2 = food.y + food_radius*2;

    return (Math.min(snake_x2, food_x2) > Math.max(snake_x1, food_x1)) && (Math.min(snake_y2, food_y2) > Math.max(snake_y1, food_y1));
}

export function bodyCollision(){
    let head_x = snake[0].x;
    let head_y = snake[0].y;
    for(let i=1;i<snake.length;i++){
      if(head_x==snake[i].x && head_y==snake[i].y){
        return true;
      }
    }
    return false;
}
  
export function wallsCollision(){
    let head_x = snake[0].x;
    let head_y = snake[0].y;
    console.log(head_x);
    console.log(head_y-player_img_height);
    return head_x - player_img_width/2 > board_width || head_y-player_img_height/2 > board_height || head_x+box < 0 || head_y+box < 0;
}

/** getPosition */

function getNewPosX(old_pos){
  let snakedirection = getSnakeDirection();
  if(snakedirection == 'RIGHT')
    return old_pos + box;
  if(snakedirection == 'LEFT')
    return old_pos - box;
  return old_pos;
}
  
function getNewPosY(old_pos){
  let snakedirection = getSnakeDirection();
  if(snakedirection == 'DOWN')
    return old_pos + box;
  if(snakedirection == 'UP')
    return old_pos - box;
  return old_pos;
}

function getRandom(){
    let min = 2;
    let max = 19;
    let val = Math.floor(Math.random()*(max-min)+min);
    console.log(val)
    return val;
};
  
  
function setRandPos(cord_type){
    let r = getRandom()*box;
    while(!isFreeSpace(cord_type, r))
      r = getRandom()*box;
    return r;
};

export function getUpdatedSnake(){
  return snake;
}

export function getUpdatedFood(){
  return food;
}

export function restartPositions(){
  snake = []
  food = {};
  prev_x = "";
  prev_y = "";
}