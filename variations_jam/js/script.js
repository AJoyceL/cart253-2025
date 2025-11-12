/**
 * Variation Menu
 * Joyce Angelina Lam
 * 
 * A relatively simple example of a set of variations within a single
 * project. (When we learn Object-Oriented Programming this will be a
 * LOT easier.)
 */

"use strict";

let state = "red-variation"; // menu

//speech data
let speech = undefined;
let collided = false;
let showText = false;
let preffixText = "";
let suffixText = "";
let currentSpeech= '';


//font
let novem = undefined;

//load speech data
function preload(){
    speech = loadJSON("assets/data/speech_interaction.json");
    novem = loadFont("assets/fonts/Novem_Font_1_35/Novem.otf");
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(500, 500);
    redSetup();
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
    
    if(showText && currentSpeech) {

        if(state === "red-variation"){
            push();
            fill("black");
            textSize(20);
            textFont(novem);
            textAlign(CENTER, TOP);
            text(currentSpeech, width/2, height/2 -200);
            pop();
        }

    } 

    if(collided) {
        currentSpeech = preffixText + " " + suffixText;
        showText = true;
    }
    else{
        showText = false;
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