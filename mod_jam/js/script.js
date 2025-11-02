/**
 * Mod Jam
 * Joyce Angelina Lam
 * 
 * This is my mod jam submission!
 * 
 * TO DO:
 * - rework the random movement of the flies
 * - change the audio to fit the new change
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";

/** 
 * GLOBAL VARIABLES 
*/

// Score
let score = 0;
let flyScoreAmount = 1;
let superFlyScoreAmount = 2;
let butterflyScoreAmount = 1;

// Our frog
const bat = {
    // The bat's body has a position and size
    body: {
        x: 325,
        y: 500,
        size: 150
    },

    // The bat's wings possition and size
    wings: {
        left:{
            w: 90,
            h:175,
        },

        right:{
            w: 90,
            h:175,
        },
    },

    // The bat's eyes position and size
    eyes:{
        left:{
            x: 275,
            y: 450,
            size: 20,
        },
       
        right:{
            x: 375,
            y: 450,
            size: 20,
        },
    },

    mouth:{
        x: undefined,
        y: 480,
        size: 40,
    },

    velocity: 0,
    speed: 10,
    state: "idle",   
};

let flapAngle = 0;
let flapSpeed = 5;


const paddle = {
    // Position will be defined by randomiser
    x: 0,
    y: 200,
    speed: 3,

    // Dimensions
    width: 100,
    height: 20,
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 12,
    speed: 3
};

const superFly = {
    x: 0,
    y: 150,
    size: 10,
    speed: 4,
};

// Our monarch butterfly
const butterfly = {
    x: 0,
    y: 250,
    size:15,
    speed: 2 
};

// The current state of the game
// let state = "title screen";
let state = "game screen";

// Timer variables
let timeLimit= 100000; // 60 seconds
let countDown;

// graph variables
let graphX = 50;
let graphAmplitude = 70;
let graphPeriod = 300;

// draw number of stars
const numStars = 100;
let stars = [];

// moon size and position
const moon = {
    x: 50,
    y: 300,
    size: 100,
    angle: 10,
    speed: 1, // should be 0.05
    radius: 350,
};



/** 
 * AUDIO FILES 
 * 
 * titleMusic from https://freesound.org/people/Mrthenoronha/sounds/528773/
 *  game screen music from https://freesound.org/people/Mrthenoronha/sounds/528717/
 *  frog croak fromhttps://freesound.org/people/TheKingOfGeeks360/sounds/744309/
 *  tongue slurp from https://freesound.org/people/Stroopwafels112/sounds/560597/
 * win music from https://freesound.org/people/Mrthenoronha/sounds/518305/
 * lose music from https://freesound.org/people/Argenisflores/sounds/633215/
*/
let titleMusic;
let gameMusic;
let frogCroak;
let tongueSlurp;
let winMusic;
let loseMusic;

// Preload function to load audio files before the program starts
function preload() {
    // Load the sound files

    //load title music and set volume
    titleMusic = loadSound("assets/sounds/titleScreen.wav");
    titleMusic.setVolume(0.5); // lower title music (50%)

    //load game music and set volume
    gameMusic = loadSound("assets/sounds/gameScreen.wav");
    gameMusic.setVolume(0.3); // lower game music (40%)

    //load frog croak sound and set volume
    frogCroak = loadSound("assets/sounds/frogCroak.wav");
    frogCroak.setVolume(1.5); // increase croak sound (150%)

    //load tongue slurping sound and set volume
    tongueSlurp = loadSound("assets/sounds/tongueSlurp.wav");
    tongueSlurp.setVolume(0.5); // lower slurp sound (50%)

    //load win music and set volume
    winMusic = loadSound("assets/sounds/winScreen.wav");
    winMusic.setVolume(0.5); // lower win music (50%)

    //load lose music and set volume
    loseMusic = loadSound("assets/sounds/loseScreen.wav");
    loseMusic.setVolume(0.5); // lower lose music (50%)
}



/** 
 * MAIN PROGRAM    
*/

// Creates the canvas and initializes the fly
function setup() {
    createCanvas(640, 480);

    //sine and cosine
    angleMode(DEGREES);

    // Make a fixed set of stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: random(width),
            y: random(height),
            size: random(2, 5)
        });
    }

    // Give the fly its first random position
    resetFly();
    resetSuperFly();
    resetButterfly();

    //Give the paddle it's first random position
    resetBird();
}

// Draws the title screen or game screen based on the state
function draw() {
    // Check the state and draw the correct screen
    if (state === "title screen") {
        titleScreen();
        if (titleMusic && !titleMusic.isPlaying()) {
            titleMusic.loop();
        }
        if(winMusic && winMusic.isPlaying()){
            winMusic.stop();
        }
        if(loseMusic && loseMusic.isPlaying()){
            loseMusic.stop();
        }
    }

    // Draw the game screen
    else if (state === "game screen") {
        gameScreen();
        if (titleMusic && titleMusic.isPlaying()) {
            titleMusic.stop();
        }
        if (gameMusic && !gameMusic.isPlaying()) {
            gameMusic.loop();
        }
        if (frogCroak && !frogCroak.isPlaying()) {
            frogCroak.play();
        }
    }
    // Draw the win screen 
    else if (state === "win screen") {
        winScreen();
        if (gameMusic && gameMusic.isPlaying()) {
            gameMusic.stop();
        }
        if (winMusic && !winMusic.isPlaying()) {
            winMusic.play();
        }
    }
    // Draw the game over screen
    else if (state === "lose screen") {
        loseScreen();
        if (gameMusic && gameMusic.isPlaying()) {
            gameMusic.stop();
        }
        if (loseMusic && !loseMusic.isPlaying()) {
            loseMusic.play();
        }
        if(frogCroak && frogCroak.isPlaying()){
            frogCroak.stop();
        }
    }
}    



/**
 *  INPUT FUNCTIONS
 * 
 * - keyPressed() => press spacebar
*/

// Start game when a key is pressed
// Game state changes whenever key is pressed
// Tongue is triggered when key is pressed 
function keyPressed() {
    // If the spacebar is pressed, start the game
    if (state === "title screen" && (key === ' ' || keyCode === 32)) {
        state = "game screen";
        score = 0; // reset score
        countDown = timeLimit; // reset timer
    }

    // Launch the bat if spacebar is pressed and tongue is idle
    if (bat.state === "idle" && (key === ' ' || keyCode === 32)) {
        bat.state = "outbound";
        if (tongueSlurp) {
            tongueSlurp.play();
        }
        return false; // prevent default browser scrolling on space
    }

    // Reset to title screen from win screen
    if (state === "win screen" && (key === ' ' || keyCode === 32)) {
        state = "title screen";
        score = 0; // reset score
        countDown = timeLimit; // reset timer
    }
    
    // Reset to title screen from game over
    if (state === "lose screen" && (key === ' ' || keyCode === 32)) {
        state = "title screen";
        score = 0; // reset score
        countDown = timeLimit; //reset timer
    }
}



/**
 * TITLE SCREEN FUNCTIONS
 * 
 * - titleScreen() + introduction text
 * found example on CodePal
*/
function titleScreen() {
    push();
    textAlign(CENTER, CENTER);

    // Title
    textSize(50);
    textStyle(BOLD);
    textFont("Monospace");
    fill("#b9def3ff");
    background("#04053dff");
    text("Catch The flies", width / 2, height / 2 - 100);

    // Instruction
    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("Catch the flies by pressing the spacebar to launch your tongue!", width / 2, height / 2);
    text("Make sure to catch as many as you can before the timer runs out!", width / 2, height / 2 + 25);
    text("But only the black ones! The red ones are poisonous!", width / 2, height / 2 + 50);
    text("Move your frog by pressing your left and right arrow!", width / 2, height / 2 + 75);
    text("Good luck on your first hunt, little froggie!", width / 2, height / 2 + 125);

    // Start game action
    textSize(25);
    textStyle(BOLD);
    textFont("Monospace");
    text("Press spacebar to start", width / 2, height / 2 + 150);
    pop();
}



/**
 * WIN SCREEN FUNCTIONS
 * 
 * (to be implemented)
*/
 function winScreen() {
    push();
    textAlign(CENTER, CENTER);

    // Win declaration
    textSize(50);
    textStyle(BOLD);
    textFont("Monospace");
    fill("#b9def3ff");
    background("#04053dff");
    text("Congratulations!", width / 2, height / 2 - 100);

    // Ending text
    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("You caught enough flies to win the game!", width / 2, height / 2);
    text("You are now full!", width / 2, height / 2 + 25);
    text("See you next time you feed!", width / 2, height / 2 + 50);

    //Game action
    textSize(25);
    textStyle(BOLD);
    textFont("Monospace");
    text("Press spacebar to play again", width / 2, height / 2 + 150);
    pop();
}



/**
 * GAME OVER SCREEN FUNCTIONS
 */

function loseScreen() {
    push();
    textAlign(CENTER, CENTER);
    fill("#b9def3ff");
    background("#04053dff");

    //Lose declaration
    textStyle(BOLD);
    textFont("Monospace");
    textSize(50);
    text("Time's up!", width/2, height/2 - 100);
    
    // Ending text
    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("You didn't catch enough flies!", width/2, height/2);
    text("You went hungry...", width/2, height/2 + 25);
    text("Better luck next time!", width/2, height/2 + 50);

    //Game action
    textSize(25);
    textStyle(BOLD);
    textFont("Monospace");
    text("Press space to return to title", width/2, height/2 + 100);
    pop();
}


/** 
 * GAME SCREEN FUNCTIONS   
*/

// Draws the game screen
function gameScreen(){
    // Functions for the sky
    drawSky();
    // for loop to draw stars
    // for (let i = 0; i < numStars; i++){
    //     drawStar();
    // }
    drawStar();
    drawMoon();
    moveMoon();
    
    // Functions for the flies
    moveFly();
    drawFly();
    moveSuperFly();
    drawSuperFly();
    moveButterfly();
    drawButterfly();

    // Functions for the bat
    flapAngle = sin(frameCount * flapSpeed) * 30; // Calls for the wings flapping
    moveBat();
    drawBat();
    checkBatFlyOverlap();
    checkBatSuperFlyOverlap();
    checkBatButterflyOverlap();

    // Funcitons for the bird
    drawBird();
    moveBird();
    checkBatBounce();

    drawTimer(); 
    drawScore();
  
    // Check for timer running out
    if (countDown <= 0 && score < 5) {
        countDown = 0;
        state = "lose screen";
    }
}

// Draws the timer at the top left corner ===> took example from CodePal, will have to rework it later
function drawTimer() {
    push();
    textSize(32);
    textAlign(LEFT, TOP);
    fill(255); 
    
    let currentTime = int(millis() / 1000);
    countDown = timeLimit - currentTime;

    text(`${countDown}s`, 20, 20);
    pop();
}


    /** BACKGROUND */
// Draws the star field. taken from the starfield project.
function drawStar() {
    const x = random(0, width);
    const y = random(0, height);
    const diameter = random(2, 5);

    //transition of vanishing stars when the sky is affected
    let sky = map(moon.angle, 130, 180, 0, 1, true);
    let fade = map(sky, 0, 1, 255, 0);

    push();
    fill(255, fade);
    noStroke();
    for (let s of stars){
        ellipse(s.x, s.y, s.size);
    }
    pop();


}

function drawMoon() {
    push();
    noStroke();
    fill("#CECECE");
    ellipse(moon.x, moon.y, moon.size);
    pop();
}

function moveMoon() {
    // Move the moon
    moon.angle += moon.speed;

    // Travel in an arc
    let centerX = width/2;
    let centerY = height + 50;

    // Calculate position
    moon.x = centerX + cos(moon.angle) * moon.radius;
    moon.y = centerY - sin(moon.angle) * moon.radius;

    // Reset moon
    if (moon.angle > 180) {
        moon.angle = 0;
    }
}

function drawSky(){
    // background colours
    let nightColour = color("#02022cff"); 
    let morningColour = color("#5badddff");

    // Transition the sky
    let sky = map(moon.angle, 130, 180, 0, 1, true);

    // lerpColor from p5 reference
    let currentSky = lerpColor(nightColour, morningColour, sky);

    background(currentSky);
}


    /** FLY */
    //Reference from p5 (noted the link in changes.md)

// Moves the fly according to its speed using sine
// Resets the fly if it gets all the way to the right
function moveFly() {
    // Move the fly horizontally
    fly.x += fly.speed;

    // Use graphX as a horizontal offset / phase for the sine
    fly.y = fly.baseY + sin(((fly.x + graphX) / graphPeriod) * 360) * graphAmplitude;

    // Keep the fly visible on the canvas vertically
    fly.y = constrain(fly.y, fly.size / 2, height - fly.size / 2);

    // Handle the fly going off the canvas to the right
    if (fly.x > width + fly.size) {
        resetFly();
    }
}

// Draws the fly as a black circle
function drawFly() {
    push();
    noStroke();
    fill("#e0af27ff");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

// Resets the fly to the left with random Y and sine
function resetFly() {
    fly.x = -fly.size; // start just off-screen for smooth entry
    // baseY is the center line of the sine wave (keeps the wave on screen)
    fly.baseY = random(50, 300);
    // set initial y to match the sine calculation so it doesn't jump
    fly.y = fly.baseY + sin((fly.x / graphPeriod) * 360) * graphAmplitude;
}


    /** SUPERFLY */
    //Reference from p5 (noted the link in changes.md)

// Moves the superfly according to its speed using sine
// Resets the superFly if it gets all the way to the right
function moveSuperFly() {
    // Move the fly horizontally
    superFly.x += superFly.speed;

    // Use graphX as a horizontal offset / phase for the sine
    superFly.y = superFly.baseY + sin(((superFly.x + graphX) / graphPeriod) * 360) * graphAmplitude;

    // Keep the fly visible on the canvas vertically
    superFly.y = constrain(superFly.y, superFly.size / 2, height - superFly.size / 2);

    // Handle the fly going off the canvas to the right
    if (superFly.x > width + superFly.size) {
        resetSuperFly();
    }
}

// Draws the fly as a black circle
function drawSuperFly() {
    push();
    noStroke();
    fill("#e0af27ff");
    ellipse(superFly.x, superFly.y, superFly.size);
    pop();
}

// Resets the fly to the left with random Y and sine
function resetSuperFly() {
    superFly.x = -superFly.size; // start just off-screen for smooth entry
    // baseY is the center line of the sine wave (keeps the wave on screen)
    superFly.baseY = random(50, 300);
    // set initial y to match the sine calculation so it doesn't jump
    superFly.y = superFly.baseY + sin((superFly.x / graphPeriod) * 360) * graphAmplitude;
}


    /** BUTTERFLY */
    //Reference from p5 (noted the link in changes.md)

//Draw the butterfly as an orange circle
function drawButterfly() {
    push();
    noStroke();
    fill("#ff5100ff");
    ellipse(butterfly.x, butterfly.y, butterfly.size);
    pop();
}

// Moves the butterfly according to its speed using cosine
// Resets the butterfly if it gets all the way to the right
function moveButterfly() {
    // Move the fly horizontally
    butterfly.x += butterfly.speed;

    // Use graphX as a horizontal offset / phase for the sine
    butterfly.y = butterfly.baseY + cos(((butterfly.x + graphX) / graphPeriod) * 360) * graphAmplitude;

    // Keep the fly visible on the canvas vertically
    butterfly.y = constrain(butterfly.y, butterfly.size / 2, height - butterfly.size / 2);

    // Handle the fly going off the canvas to the right
    if (butterfly.x > width + butterfly.size) {
        resetButterfly();
    }
}

// Resets the fly to the left with random Y and cosine
function resetButterfly() {
    butterfly.x = -butterfly.size; // start just off-screen for smooth entry
    // baseY is the center line of the sine wave (keeps the wave on screen)
    butterfly.baseY = random(50, 300);
    // set initial y to match the sine calculation so it doesn't jump
    butterfly.y = butterfly.baseY + cos((butterfly.x / graphPeriod) * 360) * graphAmplitude;
}


    /** PADDLE/BIRD */

// Draws the paddle 
function drawBird() {
    // Draw bird's body
    push();
    noStroke();
    fill("#5f3b0dff");
    ellipse(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();

    // Draw bird's wings
    push();
    noStroke();
    fill("#5f3b0dff");
    translate(paddle.x, paddle.y);
    
    pop();
}

function moveBird() {
    // Move the paddle
    paddle.x += paddle.speed;
    // Handle the paddle going off the canvas
    if (paddle.x > width) {
        resetBird();
    }
}    

function resetBird() {
    paddle.x =  -paddle.width;
    paddle.y = random(50, 300);
}

    /** FROG */

// Moves the frog to the keyIsDown(left and right) position on x
function moveBat() {
    // Handles the bat moving left
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        bat.body.x -= 10;
        bat.wings.left.x -= 10;
        bat.wings.right.x -= 10;
        bat.eyes.left.x -= 10;
        bat.eyes.right.x -= 10;
    }

    // Handles the bat moving right
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        bat.body.x += 10;
        bat.wings.left.x += 10;
        bat.wings.right.x += 10;
        bat.eyes.left.x += 10;
        bat.eyes.right.x += 10;
    }
    // Constrain the bat to the canvas
    bat.body.x = constrain(bat.body.x, 0 + bat.body.size / 2, width - bat.body.size / 2);

    // Handles the bat shooting upwards
    // If the bat is idle, it doesn't do anything
    if (bat.state === "idle") {
        // Do nothing
    }
    // If the bat is outbound, it moves up
    else if (bat.state === "outbound") {
        bat.body.y += -bat.speed;
        // The bat bounces back if it hits the top
        if (bat.body.y <= 0) {
            bat.state = "inbound";
        }
    }
    // If the bat is inbound, it moves down
    else if (bat.state === "inbound") {
        bat.body.y += bat.speed  ;
        // The bat stops if it hits the bottom
        if (bat.body.y >= height) {
            bat.state = "idle";
        }
    }
}

// Handles the bat's bounce when hitting the paddle
function checkBatBounce () {
    if(bat.state !== "outbound") return;

    //bat's body
    const tx = bat.body.x;
    const ty = bat.body.y;
    const tr = bat.body.size/2;

    //paddle rect 
    const px = paddle.x;
    const py = paddle.y;
    const pw = paddle.width;
    const ph = paddle.height;

    //overlap test
    const hit = tx + tr > px && tx - tr < px + pw && ty + tr > py && ty - tr < py + ph;

    if (hit) {
        bat.state = "inbound";
        bat.body.y = py + tr - 1;

    }
}


// Displays the tongue (tip and line connection) and the frog (body)
function drawBat() {
    // Draw the frog's body
    push();
    fill(0);
    stroke(255);
    ellipse(bat.body.x, bat.body.y, bat.body.size);
    pop();

    // Draw mouth
    // push();
    // fill(255);
    // noStroke();
    // translate(bat.body.x, bat.body.y);
    // ellipse(bat.mouth.x, bat.mouth.y, bat.mouth.size);
    // pop();

    // Reference from p5 to draw arc
    // Draw left wing
    push();
    fill(0);
    stroke(255);
    translate(bat.body.x, bat.body.y);
    rotate(flapAngle);
    arc(-120, -25, 100, bat.wings.left.w, bat.wings.left.h, 360);
    pop();

    // Draw right wing
    push();
    fill(0);
    stroke(255);
    translate(bat.body.x, bat.body.y);
    rotate(-flapAngle);
    arc(120, -25, 100, bat.wings.left.w, bat.wings.right.h, 360);
    pop();

    // Draw the eyes
    push();
    fill(255);
    noStroke();
    translate(bat.body.x, bat.body.y);
    ellipse(-30, -70, bat.eyes.left.size);
    ellipse(30, -70, bat.eyes.right.size);
    pop();
}

// Handles the tongue overlapping the fly
function checkBatFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(bat.body.x, bat.body.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < bat.body.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        bat.state = "inbound";
        //increase score
        score = score + flyScoreAmount;
    }
    // Check for win condition
    if (score >= 5) {
        state = "win screen";
    }
}

// Handles the tongue overlapping the superFly
function checkBatSuperFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(bat.body.x, bat.body.y, superFly.x, superFly.y);
    // Check if it's an overlap
    const eaten = (d < bat.body.size/2 + superFly.size/2);
    if (eaten) {
        // Reset the fly
        resetSuperFly();
        // Bring back the tongue
        bat.state = "inbound";
        //increase score
        score = score + superFlyScoreAmount;
    }
    // Check for win condition
    if (score >= 5) {
        state = "win screen";
    }
}

// Handles the tongue overlapping the butterfly
function checkBatButterflyOverlap() {
    // Get distance from tongue to butterfly
    const d = dist(bat.body.x, bat.body.y, butterfly.x, butterfly.y);
    // Check if it's an overlap
    const eaten = (d < bat.body.size/2 + butterfly.size/2);
    if (eaten) {
        // Reset the butterfly
        resetButterfly();
        // Bring back the tongue
        bat.state = "inbound";
        //increase score
        score = score - butterflyScoreAmount;
    }

    //Check for the losing condition
    if (score <= -2) {
        state = "lose screen";
    }
}

    /** SCORE*/
    
function drawScore(){
    push();
    textSize(50);
    fill(255);
    textAlign(RIGHT , TOP);
    text(score, width - 20, 20);
    pop();
}

