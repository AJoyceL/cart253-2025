/**
 * Creating variables
 * Joyce Angelina Lam
 * 
 * experimenting with creating variables
 */

"use strict";

let holeShape = 0; // declare the shape of the hole
let holeSize = 120; // declare the size of the hole
let holeX = 140; // declare the x position of the hole
let holeY = 175; // declare the y position of the hole

let cheeseRed = 255; // declare the red value of the cheese colour
let cheeseGreen = 255; // declare the green value of the cheese colour
let cheeseBlue = 0; // declare the blue value of the cheese colour

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
    background(cheeseRed, cheeseGreen, cheeseBlue);

    // The hole
    push();
    noStroke();
    fill(holeShape);
    ellipse(holeX, holeY, holeSize); // use the variable for the size of the hole
    pop();
}