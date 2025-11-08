/**
 * Tarot
 * Pippin Barr
 * 
 * Some experiments with data representing a Tarot deck
 */

"use strict";

// our tarot data
let tarot = undefined;

// our fortune
let fortune = "click to show a fortune";

// Load tarot data
function preload() {
    tarot = loadJSON("assets/data/tarot_interpretations.json");
}

/**
 * display canvas.
*/
function setup() {
    createCanvas(800, 400);
}


/**
 * display tarot.
*/
function draw() {
    background(0);

    // const card = tarot.tarot_interpretations[0];
    // const meanings = card.meanings;
    // const shadows = meanings.shadow;
    // const fool = shadows[0];

    //or a more direct way 

    const fool = tarot.tarot_interpretations[0].meanings.shadow[0];

    //display the info
    push();
    textSize(16);
    fill("yellow");
    textAlign(CENTER, CENTER);
    text(fortune, width/2, height/2);
    pop();
}

function mousePressed(){
    // choose a random card
    const card = random(tarot.tarot_interpretations);

    //choose a random fortune
    fortune = random(card.fortune_telling);
}