
let score_label = document.getElementById("score");
let final_score_label = document.getElementById("final-score");
let score = 0;

export function updateScoreInHtml(){
    score_label.innerHTML = score;
  }
  
export function updateFinalScoreInHtml(){
    final_score_label.innerHTML = score;
}

export function addScorePoints(points=30){
    score+=points;
    updateScoreInHtml();
}

export function getScore(){
    return score;
}

export function resetScore(){
    score = 0;
    updateScoreInHtml();
}