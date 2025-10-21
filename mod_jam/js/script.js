/**
 * Mod Jam
 * Joyce Angelina Lam
 * 
 * This is my mod jam submission!
 * 
 * TO DO:
 *  - SCORING SYSTEM: points deducted for hitting enemies
 * > ENEMIES: flies that deduct points when hit
 * 
 * - NEW MOVEMENT: flies moves randomly (look up different movement types)
 * 
 * - NEW AUDIO/VISUAL EFFECTS: new sound effects for catching flies, hitting enemies, launching tongue, background music
 * 
 * POSSIBLY:
 *  * - multiple levels: each level has a   different goal and time limit (if possible + different backgrounds and music)
 * - health system: lose health when you hit an enemy, gain health when you catch a fly?
 *  * - different types of flies: some are worth more points, some move faster, some move in different patterns
 * - different types of enemies: some take more than one hit to defeat, some move faster, some move in different patterns
 * - use function trisolaris example to build lilipads in the lake
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

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 10,
    speed: 3
};

// Our monarch butterfly
const butterfly = {
    x: 0,
    y: 250,
    size:15,
    speed: 2 
};

// The current state of the game
let state = "title screen";

// Timer variables
let timeLimit= 45; // seconds
let countDown;

// graph variables
let graphX = 50;
let graphAmplitude = 70;
let graphPeriod = 300;


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

    // Give the fly its first random position
    resetFly();
    resetButterfly();

    //sine and cosine
    angleMode(DEGREES);
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
 * - keyPressed() - press spacebar
*/

// Start game when a key is pressed
function keyPressed() {
    // If the spacebar is pressed, start the game
    if (state === "title screen" && (key === ' ' || keyCode === 32)) {
        state = "game screen";
        score = 0; // reset score
        countDown = timeLimit; // reset timer
    }

    // Launch the tongue if spacebar is pressed and tongue is idle
    if (frog.tongue.state === "idle" && (key === ' ' || keyCode === 32)) {
        frog.tongue.state = "outbound";
        if (tongueSlurp) {
            tongueSlurp.play();
        }
        return false; // prevent default browser scrolling on space
    }

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
    textSize(50);
    textStyle(BOLD);
    textFont("Monospace");
    fill("#b9def3ff");
    background("#04053dff");
    text("Catch The flies", width / 2, height / 2 - 100);

    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("Catch the flies by pressing the spacebar to launch your tongue!", width / 2, height / 2);
    text("Make sure to catch as many as you can before the timer runs out!", width / 2, height / 2 + 25);
    text("But only the black ones! The red ones are poisonous!", width / 2, height / 2 + 50);
    text("Move your frog by pressing your left and right arrow!", width / 2, height / 2 + 75);
    text("Good luck on your first hunt, little froggie!", width / 2, height / 2 + 125);

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
    textSize(50);
    textStyle(BOLD);
    textFont("Monospace");
    fill("#b9def3ff");
    background("#04053dff");
    text("Congratulations!", width / 2, height / 2 - 100);

    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("You caught enough flies to win the game!", width / 2, height / 2);
    text("You are now full!", width / 2, height / 2 + 25);
    text("See you next time you feed!", width / 2, height / 2 + 50);

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
    textStyle(BOLD);
    textFont("Monospace");
    fill("#b9def3ff");
    background("#04053dff");

    textSize(50);
    text("Time's up!", width/2, height/2 - 100);
    
    textSize(20);
    textStyle(NORMAL);
    textFont("Monacospace");
    text("You didn't catch enough flies!", width/2, height/2);
    text("You went hungry...", width/2, height/2 + 25);
    text("Better luck next time!", width/2, height/2 + 50);

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
    background("#87ceeb");
    moveFly();
    drawFly();
    moveButterfly();
    drawButterfly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
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
    fill(0); 
    
    let currentTime = int(millis() / 1000);
    countDown = timeLimit - currentTime;

    text(`${countDown}s`, 20, 20);
    pop();
}

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
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

// Resets the fly to the left with random Y and sine
function resetFly() {
    fly.x = -fly.size; // start just off-screen for smooth entry
    // baseY is the center line of the sine wave (keeps the wave on screen)
    fly.baseY = random(100, height - 150);
    // set initial y to match the sine calculation so it doesn't jump
    fly.y = fly.baseY + sin((fly.x / graphPeriod) * 360) * graphAmplitude;
}

//Draw the butterfly as an orange circle
function drawButterfly() {
    push();
    noStroke();
    fill("#ff5100ff");
    ellipse(butterfly.x, butterfly.y, butterfly.size);
    pop();
}

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

function resetButterfly() {
    butterfly.x = -butterfly.size; // start just off-screen for smooth entry
    // baseY is the center line of the sine wave (keeps the wave on screen)
    butterfly.baseY = random(100, height - 150);
    // set initial y to match the sine calculation so it doesn't jump
    butterfly.y = butterfly.baseY + cos((butterfly.x / graphPeriod) * 360) * graphAmplitude;
}


// Moves the frog to the keyIsDown(left and right) position on x
function moveFrog() {
    if (keyIsDown(LEFT_ARROW) || keyCode === (65)) {
        frog.body.x -= 10;
    }
    if (keyIsDown(RIGHT_ARROW) || keyCode === (68)) {
        frog.body.x += 10;
    }
    // Constrain the frog to the canvas
    frog.body.x = constrain(frog.body.x, 0 + frog.body.size / 2, width - frog.body.size / 2);
}

// Handles moving the tongue based on its state
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;
    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }
    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }
    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;
        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
        }
    }
}

// Displays the tongue (tip and line connection) and the frog (body)
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue
    push();
    stroke("#ff0000");
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

// Handles the tongue overlapping the fly
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size/2 + fly.size/2);
    if (eaten) {
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //increase score
        score = score + flyScoreAmount;
    }
    // Check for win condition
    if (score >= 5) {
        state = "win screen";
    }
}

// scores
function drawScore(){
    push();
    textSize(50);
    textAlign(RIGHT , TOP);
    text(score, width - 20, 20);
    pop();
}

