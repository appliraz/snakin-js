export let snakedirection = 'STOP';
export let prev_direction = '';
export let new_direction = true;
const direction = {37: "LEFT", 38: "UP", 39: "RIGHT", 40: "DOWN", 87: "UP", 65: "LEFT", 83:"DOWN", 68:"RIGHT"};

document.addEventListener('keydown', updateDirection);

export function listenForDirection(){
  document.addEventListener('keydown', updateDirection);
}

export function unlistenForDirection(){
  document.removeEventListener('keydown', updateDirection);
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