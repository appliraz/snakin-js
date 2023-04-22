import { trackpad } from "./touch_module.js";
export let snakedirection = 'STOP';
export let prev_direction = '';
export let new_direction = true;
const direction = {37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 87: "UP", 65: "LEFT", 83:"DOWN", 68:"RIGHT"};
const touch_directions = ["UP", "DOWN", "LEFT", "RIGHT"];
let touchStartX, touchStartY, touchEndX, touchEndY;


export function listenForDirection(){
  document.addEventListener('keydown', updateDirection);
  trackpad.addEventListener('touchstart', updateTouchStart, false);
  trackpad.addEventListener('touchend', handleTouchEnd, false);
}

export function unlistenForDirection(){
  document.removeEventListener('keydown', updateDirection);
  trackpad.removeEventListener('touchstart', updateTouchStart, false);
  trackpad.removeEventListener('touchend', handleTouchEnd, false);
}

/**
 * @param {event} e
 */
export function updateDirection(e){
  if(snakedirection=="END"){
    return;
  }
  let dir = e.keyCode
  if(!isDirection(dir))
    return;
  e.preventDefault(); //prevent page scroll
  prev_direction = snakedirection;
  let new_dir = direction[dir];
  snakedirection = new_dir;
  new_direction = (prev_direction!=snakedirection);
}
  
function isDirection(key_code){
    return key_code in direction;
}

export function directionChangeFromHorizontalToVertical(){
    return (prev_direction=='RIGHT' || prev_direction=="LEFT") && (snakedirection=="UP" || snakedirection=="DOWN");
}

export function getSnakeDirection(){
  return snakedirection;
}

export function setSnakeDirection(dir){
  snakedirection = dir;
}

export function restartDirections(){
  snakedirection = 'STOP';
  prev_direction = '';
  new_direction = true;
  unlistenForDirection();
}






function updateTouchStart(event){
  event.preventDefault();
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function updateTouchEnd(event){
  event.preventDefault();
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
}

function getTouchDirection(){
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  return Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX>0 ? "RIGHT" : "LEFT") : (deltaY > 0 ? "DOWN" : "UP");
}

/**
 * 
 * @param {event} event 
 *
 */
function handleTouchEnd(event){
  if(snakedirection=="END"){
    return;
  }
  updateTouchEnd(event);
  let dir = getTouchDirection();
  console.log(dir)
  if(!touch_directions.includes(dir))
    return;
  prev_direction = snakedirection;
  let new_dir = dir;
  snakedirection = new_dir;
  new_direction = (prev_direction!=snakedirection);
  console.log("reached");
}