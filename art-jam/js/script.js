/**
 * Art Jam: Sefl Portrait
 * Joyce Angelina Lam
 * 
 * Taking inspiration from the works of Pablo Picasso and cubism/abstract to create a self portrait.
 * 
 * TO DO LIST:
 * - use variables to  make the eyes blink repeatedly and slowly over time
 * - use mouseX and mouseY to make the pupils follow the mouse
 * - use a conditional to change the colour of something when the mouse is pressed
 * - look up a p5 function I've never used
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
    drawHair();
    drawEyes();
    drawPupils();
    drawGlasses();
}

// Draw the face
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

// Draw the hair
function drawHair() {
    push();
    fill(50, 50, 50);
    noStroke();

    //Vertex declaratiuons in counter-clockwise order
    beginShape();
    vertex(400, 70);
    vertex(370, 100);
    vertex(250, 300);
    vertex(475, 500);
    vertex(450, 800);
    vertex(575, 850);
    vertex(550, 100);
    vertex(500, 50);
    endShape(CLOSE);
    pop();
}

// Draw the eyes
function drawEyes() {
    push();
    noStroke();
    ellipse(400, 400, 100, 50);
    fill(255, 255, 255);
    pop();
}

// Draw the pupils
function drawPupils() {
    push();
    fill(50, 20, 20);
    noStroke();
    ellipse(400, 400, 25, 25);
    pop();
}

// Draw the glasses
function drawGlasses() {
    push();
    noFill();
    stroke(192, 192, 192);
    strokeWeight(5);
    ellipse(400, 400, 150, 150);
    pop();
}