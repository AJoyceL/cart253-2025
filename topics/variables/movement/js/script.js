/**
 * Movement
 * Joyce Angelina Lam
 * 
 * 
 */

"use strict";

let bird = {
    x: 120,
    y: 400,
    size: 50,
    velocity: {
        x: 1,
        y: -2
    },
    minVelocity: {
        x: -3,
        y: -2
    },
    maxVelocity: {
        x: 3,
        y: 2
    },
    acceleration: {
        x: 0.025,
        y: -0.05
    }
};

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(640, 400);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);
    
    // move bird
    // bird.velocity.x = bird.velocity.x + bird.acceleration.x;
    // bird.velocity.y = bird.velocity.y + bird.acceleration.y;
    bird.velocity.x += bird.acceleration.x;
    bird.velocity.y += bird.acceleration.y;

    bird.velocity.x = constrain(bird.velocity.x, bird.minVelocity.x, bird.maxVelocity.x);
    bird.velocity.y = constrain(bird.velocity.y, bird.minVelocity.y, bird.maxVelocity.y);

    bird.x = bird.x + bird.velocity.x;
    bird.y = bird.y + bird.velocity.y;

    // draw bird
    push();
    fill(255, 0, 0);
    noStroke
    ellipse(bird.x, bird.y, bird.size);
    pop();
}