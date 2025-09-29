/**
 * Art Jam: Sefl Portrait
 * Joyce Angelina Lam
 * 
 * Taking inspiration from the works of Pablo Picasso and cubism/abstract to create a self portrait.
 * 
 * Features:
 * - Background colour changes when mouseX is < 375 or > 425, the default colour is lavender at 400
 * - Pupil that follows the mouse using map() within the eye using constrain()
 * - Eye that blink using conditionals and looping
 */

"use strict";

//Object for the background
let sky = {
    //fill : base colour of the background
    fill: "#cc99ff",

    fills: {
        //a dark navy colour
        left: "#191966",

        //a saffron yellow
        right: "#ffff33",
    }
};

//Object for the eyes
let eye = {
    x: 400,
    y: 400,
    w: 100,
    h: 50,
};

//Object for blinking
let blink = {
    speed: 0.1,
    maxH: 50,
    minH: 25,
    growing: false,
};

//Object for the pupil
let pupil = {
    w: 25,
    h: 25,
};


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
    background(sky.fill);

    //Function for the conditionals
    checkPupil();

    //Base functions to draw the portrait
    drawFace();
    drawHair();
    drawEyes();
    drawPupils();
    drawGlasses();

    // Make the eyes blink
    eye.h -= blink.speed;
    eye.h = constrain(eye.h, blink.minH, blink.maxH);

    //Loop the blinking
    if (eye.h === 25){
        eye.h = 50;
    }
}

// Function to check the mouseX position and change the background colour
// when the mouseX is < 350 or > 450
function checkPupil() {
    //Changing the background colour when mouseX is < 350 or > 450
    //Took the base script from the Creature Loves Massage conditionals exercise
    const mouseIsMoving = (mouseX != 0 || mouseY != 0)

    if(mouseIsMoving) {
        if(mouseX < 375) {
            background(sky.fills.left);
        }
        else if (mouseX > 425) {
            background(sky.fills.right);
        }
        else{
            background(sky.fill);  //When MouseX is between 350 and 450
        }
    }

    else {
        background(sky.fill); //The default background colour
    }  
}

// Draw the face --used vertex()
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

// Draw the hair -- used vertex()
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
    ellipse(eye.x, eye.y, eye.w, eye.h);
    fill(255, 255, 255);
    pop();
}

// Draw the pupil + make it follow the mouse using map()
function drawPupils() {
    push();
    fill(50, 20, 20);
    noStroke();

    //Map the pupil position to follow the mouse
    let maxOffsetX = (eye.w - pupil.w) / 2;
    let maxOffsetY = (eye.h - pupil.h) / 2;

    let offsetX = map(mouseX, 0, width, -maxOffsetX, maxOffsetX);
    let offsetY = map(mouseY, 0, height, -maxOffsetY, maxOffsetY);
    
    //Constrain the offsets to stay within the eye
    offsetX = constrain(offsetX, -maxOffsetX, maxOffsetX);
    offsetY = constrain(offsetY, -maxOffsetY, maxOffsetY);

    ellipse(eye.x + offsetX, eye.y + offsetY, pupil.w, pupil.h);
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
