import { initalizeGame, startGameRun } from "./game_loop.js";
import { listenForDirection } from "./directions.js";

/** The opening menu of the game, allows the user to:
 * Select a player
 * Select a difficulty level
 * Start the game
 */

let menu;
let selected_player = "";
let selected_difficulty = "";
let allowed_players = ['Dolev', 'Pincu', 'Amit', 'Liraz'];
let allowed_difficulties = ["easy", "medium", "hard", "extreme", "Easy", "Medium", "Hard", "Extreme"];
let menu_img_orientation = 1;
let start_btn_clicked = false;
//get the imgs from the html file
let menu_imgs = Array.from(document.getElementsByClassName("player-img"));
let dancing_imgs_interval;

getMenuFromDocument(); //get the menu html element


/** Getters */
function getMenu(){
    return menu;
}

export function getSelectedPlayer(){
    return selected_player;
}

export function getSelectedDifficulty(){
    return selected_difficulty;
}

function getAllowedPlayers(){
    return allowed_players;
}

function getAllowedDifficulties(){
    return allowed_difficulties;
}



/** Setters*/
function setSelectedPlayer(player){
    selected_player = player;
}

function setSelectedDifficulty(diff){
    selected_difficulty = diff;
}
/** Functions and Methods */

export function initMenu(){
    console.log("in init menu");

    //get the menu element
    menu = getMenuFromDocument();

    //make the menu visible
    showMenu();

    //let the imgs dance
    dancing_imgs_interval = setInterval(danceMenuImgs, 666);

    //add event listeners for the different parts of the menu
    /*select player */
    addClickEventListener('player_selection', handlePlayerSelection);
    /*select difficulty */
    addClickEventListener('difficulty_level', handleDifficultySelection);
    /*start button */
    addClickEventListener('start-btn', handleStartButton);
}

function danceMenuImgs(){
    //the orientation makes the images go back and forth
    let orientation = getImgOrientation();
    menu_imgs.forEach((img)=>{
        //every img get a random angle to avoid over-unification
        let angle = getImgAngle()*orientation;
        if(isSelectedPlayer(img.alt))
            angle = 0 //make the selected player's img stand out by not rotating it
        img.style.transform = `rotate(${angle}deg)`;
    })
}

/**Handler Functions */
function handlePlayerSelection(e){
    let selected = e.target.alt; //the players name are in the alt field of the img
    selected = selected.trim(); //avoid spaces
    if(!isAllowedPlayer(selected)){
        showErrorMessage("There was a problem with player selection");
        throw new Error(`Not an allowed player: ${selected}`);
    }
    setSelectedPlayer(selected);
    mark_selected_player();
}

function handleDifficultySelection(e){
    let selected = e.target.innerText; //the difficulties are text elements
    selected = selected.trim(); //avoid spaces
    if(!isAllowedDifficulty(selected)){
        return;
        /*
        showErrorMessage("Something went wrong with difficulty selection")
        throw new Error(`Not an allowed difficulty: ${diff_name}`);*/
    }
    setSelectedDifficulty(selected);
    mark_selected_difficulty();
}


function handleStartButton(){
    let player_name = getSelectedPlayer();
    let difficulty_name = getSelectedDifficulty();
    if(!isAllowedPlayer(player_name) || !isAllowedDifficulty(difficulty_name)){
        window.alert("Don't click me before you select a player and a difficulty")
        return;
    }
    hideMenu();
    removeEventListeners();
    clearInterval(dancing_imgs_interval);
    start_btn_clicked = true;
    initalizeGame();
    listenForDirection();
    startGameRun();
}


/** Helper Functions */
function getMenuFromDocument(){
    menu = document.getElementById('menu');
    if(menu===null){
        showErrorMessage("There was a problem loading the page :/");
        throw new Error("Menu is null");
    }
    return menu;
}

function getMenuElementsByClass(class_var){
    let elements = document.getElementsByClassName(class_var);
    if(elements===null){
        showErrorMessage("There was a problem trying to get elements from the page, please consult the dev");
        throw new Error("Elements rendered null");
    }
    return Array.from(elements);
}

function getPlayersImgsFromDocument(){
    return getMenuElementsByClass('player-img');
}

function getDifficultiesFromDocument(){
    return getMenuElementsByClass('diff-elem');
}

function showMenu(){
    console.log("showing menu");
    setMenuVisibilty('visible');
}

function hideMenu(){
    setMenuVisibilty('hidden');
}


function getImgAngle(){
    let max = 20;
    let min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getImgOrientation(){
    menu_img_orientation = (menu_img_orientation == 1 ? -1 : 1);
    return menu_img_orientation;
}


function showErrorMessage(msg){
    window.alert(msg);
}

function addClickEventListener(eleme_id, callback){
    let elem = document.getElementById(eleme_id);
    elem.addEventListener('click', callback);
}

function removeClickEventListener(eleme_id, callback){
    let elem = document.getElementById(eleme_id);
    elem.removeEventListener('click', callback);
}

/** Style related functions */
function mark_selected_player(){
    //make the player's img stand out
    let menu_imgs = getPlayersImgsFromDocument();
    menu_imgs.forEach((img)=>{
        if(isSelectedPlayer(img.alt))
            img.style.transform = "rotate(0deg)"; // don't rotate selected player
        setPlayerImgOpacity(img);
    })
}

function mark_selected_difficulty(){
    let diff_elements = getDifficultiesFromDocument();
    diff_elements.forEach((diff_elem)=> {
        try{
            markDifficulty(diff_elem);
        }
        catch(e){
            console.log(e);
        }
    })
}

function setMenuVisibilty(visibility_var){
    if(menu!==null)
        menu.style.visibility = visibility_var;
    else
        throw new Error("Menu is null, could not set visibility");
}

function setPlayerImgOpacity(img){
    img.style.opacity = getPlayerImgOpacity(img.alt);
}

function getPlayerImgOpacity(player_name){
    let selected_player = getSelectedPlayer();
    let regular_opacity = "85%";
    let selected_opacity = "100%";
    return selected_player == player_name ? selected_opacity : regular_opacity;
}

function markDifficulty(diff_element){
    let diff_name = diff_element.innerText.trim();
    if(!isAllowedDifficulty(diff_name)){/*
        showErrorMessage("Something went wrong with difficulty selection")
        throw new Error(`Not an allowed difficulty: ${diff_name}`);*/
        return;
    }
    isSelectedDifficulty(diff_name) ? markAsSelectedDifficulty(diff_element) : markAsRegaulrDifficulty(diff_element);
}

function markAsRegaulrDifficulty(diff_element){
    diff_element.style.fontSize = "20px";
    diff_element.style.color = "white";
    diff_element.style.textShadow = "none";
}

function markAsSelectedDifficulty(diff_element){
    diff_element.style.fontSize = "24px";
    diff_element.style.color = "#9ACD32";
    diff_element.style.textShadow = "2px 2px black";
}


/** Booleans */
function isAllowedDifficulty(diff){
    let difficulties = getAllowedDifficulties();
    return difficulties.includes(diff);
}

function isAllowedPlayer(play){
    let players = getAllowedPlayers();
    return players.includes(play);
}

function isSelectedPlayer(player){
    let selected = getSelectedPlayer();
    return selected==player;
}

function isSelectedDifficulty(diff){
    let selected = getSelectedDifficulty();
    return selected==diff;
}

function unmarkDifficulties(){
    let diffs = getDifficultiesFromDocument();
    diffs.forEach(diff=>{
        markAsRegaulrDifficulty(diff);
    })
}

function removeEventListeners(){
    removeClickEventListener('player_selection', handlePlayerSelection);
    /*select difficulty */
    removeClickEventListener('difficulty_level', handleDifficultySelection);
    /*start button */
    removeClickEventListener('start-btn', handleStartButton);
}

/**restart */

export function restartMenu(){
    selected_player = "";
    selected_difficulty = "";
    menu_img_orientation = 1;
    start_btn_clicked = false;
    mark_selected_player();
    unmarkDifficulties();
    
}