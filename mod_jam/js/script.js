/**
 * Mod Jam
 * Joyce Angelina Lam
 * 
 * This is my mod jam submission!
 * 
 * TO DO:
 * - GAME OVER SCREEN: timer runs out and didn't catch enough flies
 * 
 * - WIN SCREEN: congratulations for completing all levels
 * 
 * - TIMER: countdown timer for limiting the game time
 * 
 *  - SCORING SYSTEM: points for catching flies, points deducted for hitting enemies
 * > ENEMIES: flies that deduct points when hit
 * 
 * - NEW MOVEMENT: frog moves by keyboard (WASD or arrow keys) + flies moves randomly (look up different movement types)
 * 
 * - NEW AUDIO/VISUAL EFFECTS: new sound effects for catching flies, hitting enemies, launching tongue, background music
 * 
 * POSSIBLY:
 *  * - multiple levels: each level has a   different goal and time limit (if possible + different backgrounds and music)
 * - health system: lose health when you hit an enemy, gain health when you catch a fly?
 *  * - different types of flies: some are worth more points, some move faster, some move in different patterns
 * - different types of enemies: some take more than one hit to defeat, some move faster, some move in different patterns
 *
 * Made with p5
 * https://p5js.org/
 */

"use strict";
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

let state = "title screen"; // Can be: title screen, game screen

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

/** 
 * Draws the title screen or game screen based on the state
 */
function draw() {
    if (state === "title screen") {
        titleScreen();
        if (titleMusic && !titleMusic.isPlaying()) {
            titleMusic.loop();
        }
    }
    else if (state === "game screen") {
        gameScreen();
        if (titleMusic && titleMusic.isPlaying()) {
            titleMusic.stop();
        }
        if (gameMusic && !gameMusic.isPlaying()) {
            gameMusic.loop();
        }
    }
}    


/**
 * Audio files used:
 * - titleMusic from https://freesound.org/people/Mrthenoronha/sounds/523725/
 * - game screen music from https://freesound.org/people/Mrthenoronha/sounds/512161/
 */
let titleMusic;
let gameMusic;

function preload() {
    titleMusic = loadSound("assets/sounds/titleScreen.wav");
    gameMusic = loadSound("assets/sounds/gameScreen.wav");
}


//Start game when a key is pressed
function keyPressed() {
    if (state === "title screen" && (key === ' ' || keyCode === 32)) {
    state = "game screen";

}
}

/** 
 * Draws the game screen
 */
function gameScreen(){
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawScore();
}

/**
 * Function to diplay a title screen
 * with instructions to start the game
 * => found example on CodePal
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


/** GAME SCREEN FUNCTIONS   */

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
    }
}

/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}

/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

/**
 * Moves the frog to the mouse position on x
 */
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
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

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
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

/**
 * Handles the tongue overlapping the fly
 */
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
}

// scores
function drawScore(){
    push();
    textSize(100);
    textAlign(CENTER, CENTER);
    text(score, 50, 50);
    pop();
}


/**
 * Launch the tongue on click (if it's not launched yet)
 */
function mousePressed() {
    if (frog.tongue.state === "idle") {
        frog.tongue.state = "outbound";
    }
}