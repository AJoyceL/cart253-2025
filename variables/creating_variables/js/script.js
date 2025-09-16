/**
 * Creating variables
 * Joyce Angelina Lam
 * 
 * experimenting with creating variables
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(480, 480);
}


/**
 * Draws a hole in a piece of cheese
*/
function draw() {
    // The cheese
    background(255, 255, 0);

    // The hole
    push();
    noStroke();
    fill(0);
    ellipse(141, 175, 180)
    pop();
}