/**
 * Intro to variables
 * Joyce Angelina Lam
 * 
 * Leanrning whart a variable is and does
 */

"use strict";

/**
 * create a canvas
*/
function setup() {
    createCanvas(640, 640);
}


/**
 * Draws a circle in the center of the canvas
*/
function draw() {
    background(0);

    //Draw the circle
    push();
    fill(153, 153, 255);
    noStroke();
    ellipse(width/2, height/2, 100, 100);
    pop();

    /* 
   *Another option of colour with the variable *of mouseX and mouseY
   *
   * fill(mouseX, mouseY, 0);
   * ellipse(mouseX, mouseY, 100, 100); 
   *ellipse(width/2, height/2, mouseX, mouseY);
   */
}