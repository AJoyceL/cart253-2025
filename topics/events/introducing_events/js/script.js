/**
 * Introducing events
 * Author Name
 * 
 */

"use strict";

/**
 * creates a canvas, makes the canvas black
*/
function setup() {
    createCanvas(400, 400);
    background(0);
}


/**
 * does nothing!
*/
function draw() {

}

/** 
 * draws a yellow circle where the mouse is pressed
*/
function mousePressed() {
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}