export let snakedirection = 'STOP';
export let prev_direction = '';
export let new_direction = true;
const direction = {37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 87: "UP", 65: "LEFT", 83:"DOWN", 68:"RIGHT"};
let touchStartX, touchStartY, touchEndX, touchEndY;


export function listenForDirection(){
  document.addEventListener('keydown', updateDirection);
  document.addEventListener('touchstart', updateTouchStart, false);
  document.addEventListener('touchend', handleTouchEnd, false);
}

export function unlistenForDirection(){
  document.removeEventListener('keydown', updateDirection);
  document.removeEventListener('touchstart', updateTouchStart, false);
  document.removeEventListener('touchend', handleTouchEnd, false);
}

export function updateDirection(e){
  if(snakedirection=="END"){
    return;
  }
  let dir = e.keyCode
  if(!isDirection(dir))
    return;
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
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}

function updateTouchEnd(event){
  touchEndX = event.changedTouches[0].clientX;
  touchEndY = event.changedTouches[0].clientY;
}

function getTouchDirection(){
  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;
  return Math.abs(deltaX) > Math.abs(deltaY) ? (delatX>0 ? "RIGHT" : "LEFT") : (deltaY > 0 ? "DOWN" : "UP");
}

function handleTouchEnd(event){
  if(snakedirection=="END"){
    return;
  }
  updateTouchEnd(event);
  let dir = getTouchDirection();
  if(!isDirection(dir))
    return;
  prev_direction = snakedirection;
  let new_dir = direction[dir];
  snakedirection = new_dir;
  new_direction = (prev_direction!=snakedirection);
}