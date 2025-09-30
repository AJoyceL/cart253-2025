/**
 * Time
 * Author Name
 * 
 */

"use strict";

const ball = {
    x : 0, 
    y: 200,
    size: 50
};

/**
    * Creates the canvas
*/
function setup() {
    createCanvas(400, 400);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    ball.x += 1;

    Push();
    noStroke();
    ellipse(ball.x, ball.y, ball.size);
    Pop();
}