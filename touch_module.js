export let trackpad = document.getElementById("trackpad");


export function initTrackpad(){
    if(isMobile()){
        let trackpad = document.getElementById("trackpad");
        trackpad.style.display = "flex";
    }
}

function isMobile(){
    return 'ontouchstart' in window;
}


/**
export function initTrackpad(){
    if(!isMobile())
        return; 
    showTrackpad();
}
function isMobile(){
    return window.matchMedia("(max-width: 768px)").matches
}

function showTrackpad(){
    trackpad.style.visibility = "visible";
}

function hideTrackpad(){
    trackpad.style.visibility = "hidden";
}

*/
