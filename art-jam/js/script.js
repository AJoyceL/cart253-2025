/**
 * Art Jam: Sefl Portrait
 * Joyce Angelina Lam
 * 
 * Taking inspiration from the works of Pablo Picasso and cubism/abstract to create a self portrait.
 */

"use strict";

// // Variables for the face
// let face = {
//     x: 300,
//     y: 450,
//     width: 200,
//     height: 300,
// };

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(600, 900);
}


/**
 * Function to draw the self portrait
*/
function draw() {
    // Lavender blue background
    background(191, 179, 255);

    drawFace();
}

function drawFace() {
    push();
    fill(255, 204, 153);
    noStroke();

    //Vertex declaratiuons in counter-clockwise order
    beginShape();
    vertex(450, 100);
    vertex(400, 100);
    vertex(200, 700);
    vertex(400, 700);
    vertex(400, 800);
    vertex(300, 900);
    vertex(600, 900);
    vertex(500, 800);
    endShape(CLOSE);
    pop();

   
}