/**
 * Variation Menu
 * Joyce Angelina Lam
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "blue-variation"; // menu

//speech data
let speech = undefined;
let collided = false;
let showText = false;
//introduction
let intro = true;

//font
let novem = undefined;
let firstTime = undefined;

//red img
let redBg = undefined;
let altarImg = undefined;
let redPaveImg = undefined;
let redStoneImg = undefined;

//blue img
let blueF = undefined;
let redF = undefined;
let lilacF = undefined;
let yellowF = undefined;
let grassLand = undefined;
let pebbleF = undefined;
let treeImg = undefined;


//load speech data
function preload(){
    // dialogue preload
    speech = loadJSON("assets/data/speech_interaction.json");

    //font preload
    novem = loadFont("assets/fonts/Novem_Font_1_35/Novem.otf"); //red variation
    firstTime = loadFont("assets/fonts/FirstTimeWriting/FirstTimeWriting.otf"); //green variation

    //background preload taken from Freepik and pinterest
    //red variation
    redBg = loadImage("assets/images/red_var_bg.png"); 
    altarImg = loadImage("assets/images/altar.png");
    redPaveImg = loadImage("assets/images/pavement.png");
    redStoneImg = loadImage("assets/images/stone.png");

    //blue variation 
    grassLand = loadImage("assets/images/grass_floor.jpg");
    pebbleF = loadImage("assets/images/pebble.png");
    blueF = loadImage("assets/images/blue_flower.png");
    redF = loadImage("assets/images/red_flower.png");
    lilacF = loadImage("assets/images/lilac.png");
    yellowF = loadImage("assets/images/yellow_flower.png");
    treeImg = loadImage("assets/images/tree.png");
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(500, 500);
    redSetup();
    blueSetup();
}


/**
 * Display the menu or the current variation
*/
function draw() {
    switch (state) {
        case "menu":
            menuDraw();
            break;
        case "red-variation":
            redDraw();
            break
        case "green-variation":
            greenDraw();
            break;
        case "blue-variation":
            blueDraw();
            break;
    }
    
}

/**
 * Listen for mouse pressed and call the function for it in the
 * current state
 */
function mousePressed() {
    switch (state) {
        case "menu":
            menuMousePressed();
            break;
        case "red-variation":
            redMousePressed();
            break
        case "green-variation":
            greenMousePressed();
            break;
        case "blue-variation":
            blueMousePressed();
            break;
    }
}

/**
 * Listen for keypressed and call the function for it in the
 * current state
 */
function keyPressed(event) {
    switch (state) {
        case "menu":
            menuKeyPressed(event);
            break;
        case "red-variation":
            redKeyPressed(event);
            break
        case "green-variation":
            greenKeyPressed(event);
            break;
        case "blue-variation":
            blueKeyPressed(event);
            break;
    }
}