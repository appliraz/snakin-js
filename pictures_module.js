import { prev_direction, snakedirection, directionChangeFromHorizontalToVertical, new_direction} from "./directions.js";
import {getPlayerName} from "./game_loop.js";

let player = new Image();
let food_img = new Image();


export function getPlayerImg(){
  if(new_direction || player.src=="")
    player.src = getImageSource();
  return player;  
}

function getImageSource(){
  let player_name = getPlayerName();
  let src = 'img/' + player_name + '/';
  if(directionChangeFromHorizontalToVertical())
    return src + player_name + '-' + prev_direction.toLowerCase() + '-' + snakedirection.toLowerCase() + '.png';
  return src + player_name + '-' + snakedirection.toLowerCase() + '.png'; 
}

export function getFoodImg(){
  if(food_img.src=="")
    initFoodImg();
  return food_img
}

function initFoodImg(){
  let player_name = getPlayerName();
  food_img.src = 'img/Food/' + player_name + '.png';
}


export function restartPictures(){
  player = new Image();
  food_img = new Image();
}

/*
export function getEndPicture(){
  let end_pic = new Image();
  end_pic.src = getEndPictureSource();
  return end_pic;
}
function getEndPictureSource(){
  let player_name = getPlayerName();
  let src = 'img/' + player_name + '/';
  return src + player_name + '-end' + '.png'; 
}
*/