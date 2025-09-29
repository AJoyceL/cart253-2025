/**
 * Art Jam: Sefl Portrait
 * Joyce Angelina Lam
 * 
 * Taking inspiration from the works of Pablo Picasso and cubism/abstract to create a self portrait.
 * 
 * TO DO LIST:
 * - use mouseX and mouseY to make the pupils follow the mouse
 * within a certain limit. ie the inside of the eye
 * - look up a p5 function I've never used
 */

"use strict";

//Variables for the background
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

//Variables for the eyes
let eye = {
    x: 400,
    y: 400,
    w: 100,
    h: 50,
};

// Variables for blinking
let blink = {
    speed: 0.1,
    maxH: 50,
    minH: 20,
    growing: false,
};

//Variables for the pupil
let pupil = {
    w: 25,
    h: 25,
};

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(600, 900);
    noCursor();
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
    if (eye.h === 20){
        eye.h = 50;
    }



    //Limit the  pupil movement to within the eye
    //Ask Phil or Pippin later
}

function checkPupil() {
    //Changing the background colour when mouseX is < 350 or > 450
    //Took the base script from the Creature Loves Massage conditionals exercise
    const mouseIsMoving = (mouseX != 0 || mouseY != 0)

    if(mouseIsMoving) {
        if(mouseX < 350) {
            background(sky.fills.left);
        }
        else if (mouseX > 450) {
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
    ellipse(eye.x, eye.y, eye.w, eye.h);
    fill(255, 255, 255);
    pop();
}

// Draw the pupils
function drawPupils() {
    push();
    fill(50, 20, 20);
    noStroke();
    ellipse(mouseX, mouseY, pupil.w, pupil.h);
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


//Example found on ChatGPT
// let eyeX = 200;
// let eyeY = 200;
// let eyeRadius = 50;
// let pupilRadius = 10;
// let maxOffset = 20;

// function setup() {
//   createCanvas(400, 400);
// }

// function draw() {
//   background(220);

//   // Draw eye (white part)
//   fill(255);
//   stroke(0);
//   ellipse(eyeX, eyeY, eyeRadius * 2);

//   // Vector from eye center to mouse
//   let dx = mouseX - eyeX;
//   let dy = mouseY - eyeY;

//   // Limit movement to maxOffset
//   let dist = sqrt(dx * dx + dy * dy);
//   if (dist > maxOffset) {
//     dx = (dx / dist) * maxOffset;
//     dy = (dy / dist) * maxOffset;
//   }

//   let pupilX = eyeX + dx;
//   let pupilY = eyeY + dy;

//   // Draw pupil
//   fill(0);
//   noStroke();
//   ellipse(pupilX, pupilY, pupilRadius * 2);
// }
