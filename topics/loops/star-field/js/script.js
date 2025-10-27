/**
 * Star-field
 * Joyce A Lam
 * 
 * Draws a star-field with a for-loop
 */

"use strict";

const numStars = 100;

/**
 * create canvas
*/
function setup() {
    createCanvas(400, 400);
}


/**
 * Draw star-field
*/
function draw() {
    background(0);

    randomSeed(10);
    for (let i = 0; i < numStars; i++){
        drawStar();
    }
}

/**
 * Draw random star
 */
function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(2, 5);

    push();
    fill(255);
    noStroke();
    ellipse(x, y, diameter);
    pop();
}