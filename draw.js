import { getPlayerImg, getFoodImg} from "./pictures_module.js";
import { getSnake, getFood } from "./game_loop.js";

export let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = getCanvasWidth();
canvas.height = canvas.width;
let gameview_container = document.getElementById("game-view");
gameview_container.style.width = canvas.width;
export let board_bound = canvas.getBoundingClientRect();
export let board_left_bound = board_bound.x;
export let board_top_bound = board_bound.y;
export let board_width = canvas.width;
export let board_height = canvas.height;
export let box = board_width/20;
const snake_body_color = 'rgb(31, 100, 32)'
const board_color = 'rgba(206,255,201, 0.6)'

export let player_img_width = box*2;
export let player_img_height = box*1.5;
//let player_img = new Image();
//let food_img = new Image();
export let food_radius = box*0.65; 


export function draw(){
    clearBoard();
    drawBoard();
    drawSnake();
    drawFood();
    /*
    if(foodCollision()){
      console.log("coollide");
      handleCollisionWithFood();
    }*/     
}  

export function drawSnake(){
    let snake = getSnake();
    drawSnakeBody(snake);
    drawPlayerImageAtSnakeHead(snake);
    
};

/*
export function drawEndSnake(){
    let snake = getSnake();
    ctx.drawImage(getEndPicture(), snake[0].x, snake[0].y, player_img_width, player_img_height);
}*/

function drawPlayerImageAtSnakeHead(snake){
    let player_img = getPlayerImg();
    ctx.drawImage(player_img, snake[0].x, snake[0].y, player_img_width, player_img_height);
    
}

function drawSnakeBody(snake){
    ctx.fillStyle = snake_body_color; //body
    for(let i=1; i<snake.length; i++)
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
}

function drawBoard(){
    updateBoardDimensions();
    //ctx.fillStyle = "#E55F68";
    ctx.fillStyle = board_color;
    ctx.fillRect(0, 0, board_width, board_height);
}

function drawFood(){
    /** draw food as dot 
    ctx.beginPath();
    ctx.fillStyle = '#A124B6';
    ctx.arc(food.x, food.y, food_radius, 0, 2*Math.PI, false);
    ctx.fill();
    ctx.closePath();
    */
   /**drae foor as image */
    let food = getFood();
    let food_img = getFoodImg();
    ctx.drawImage(food_img, food.x, food.y, food_radius*2, food_radius*2);
}

export function clearBoard(){
    ctx.clearRect(0, 0, board_width, board_height);
}

/**trying to make it responsive */
function updateBoardDimensions(){
    canvas = document.getElementById('canvas');
    board_bound = canvas.getBoundingClientRect();
    board_left_bound = board_bound.x;
    board_top_bound = board_bound.y;
    board_width = canvas.width;
    board_height = canvas.height;
    box = board_width/20;
    player_img_width = box*2;
    player_img_height = box*1.5;
    food_radius = box*0.65; 
    console.log(`box size is ${canvas.width}`);
}

function getCanvasWidth(){
    let width = window.innerWidth;
    if(width>=1000)
        return width*0.3
    let diff = (1000-width);
    diff = diff/1000;
    return width*(diff+0.3);
}

function resetCanvasWidth(){
    canvas.width = getCanvasWidth();
    canvas.height = canvas.width;
    gameview_container.style.width = canvas.width;
}




//window.addEventListener('resize', resetCanvasWidth);