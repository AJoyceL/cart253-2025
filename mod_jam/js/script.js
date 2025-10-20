/**
 * Mod Jam
 * Joyce Angelina Lam
 * 
 * This is my mod jam submission!
 * 
 * TO DO:
 * - GAME OVER SCREEN: timer runs out and didn't catch enough flies
 * 
 * - TIMER: countdown timer for limiting the game time
 * 
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

// The current state of the game
let state = "title screen"; // Can be: title screen, game screen

// Timer variables
let time= 120;
let timer = false;


/** 
 * AUDIO FILES 
 * 
 * titleMusic from https://freesound.org/people/Mrthenoronha/sounds/523725/
 *  game screen music from https://freesound.org/people/Mrthenoronha/sounds/512161/
 *  frog croak fromhttps://freesound.org/people/TheKingOfGeeks360/sounds/744309/
 *  tongue slurp from https://freesound.org/people/Stroopwafels112/sounds/560597/
 * win music from https://freesound.org/people/Mrthenoronha/sounds/518305/
*/
let titleMusic;
let gameMusic;
let frogCroak;
let tongueSlurp;
let winMusic;

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
}



/** 
 * MAIN PROGRAM    
*/

// Creates the canvas and initializes the fly
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
}

// Draws the title screen or game screen based on the state
function draw() {
    // Check the state and draw the correct screen
    if (state === "title screen") {
        titleScreen();
        if (titleMusic && !titleMusic.isPlaying()) {
            titleMusic.loop();
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
}    



/**
 *  INPUT FUNCTIONS
 * 
 * - keyPressed()
 * - keyIsDown()
*/

// Start game when a key is pressed
function keyPressed() {
    // If the spacebar is pressed, start the game
    if (state === "title screen" && (key === ' ' || keyCode === 32)) {
    state = "game screen";
    time = 120;    // reset to 2 minutes
    timer = true;  // start countdown
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
    }
    
    // Reset to title screen from game over
    if (state === "game over" && (key === ' ' || keyCode === 32)) {
    state = "title screen";
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
 * GAME SCREEN FUNCTIONS   
*/

// Draws the game screen
function gameScreen(){
    background("#87ceeb");
    moveFly();
    drawFly();
    moveFrog();
    moveTongue();
    drawFrog();
    checkTongueFlyOverlap();
    drawTimer(); 
    drawScore();

    // countdown while running (deltaTime is milliseconds since last frame)
    if (timer && time > 0) {
        time -= deltaTime / 1000.0; // convert ms to seconds
        if (time <= 0 || score <= 5) {
            time = 0;
            timer = false;
            // choose how to handle end-of-time:
            state = "game over"; 
        }
    }
}

// Draws the timer at the top left corner ===> took example from CodePal, will hvae to rework it later
function drawTimer() {
    push();
    textSize(32);
    textAlign(LEFT, TOP);
    fill(0); 

    // round up so the display shows 2:00 -> 1:59 only after a full second passes
    const totalSeconds = Math.ceil(time);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const paddedSeconds = (seconds < 10) ? '0' + seconds : seconds;
    const timeString = minutes + ':' + paddedSeconds;

    text(timeString, 20, 20); // top-left, adjust x,y if needed
    pop();
}

// Moves the fly according to its speed
// Resets the fly if it gets all the way to the right
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
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

 // Resets the fly to the left with a random y
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
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
    if (score >= 1) {
        state = "win screen";
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
 * GAME OVER SCREEN FUNCTIONS
 * 
 * (to be implemented)
 */

function gameOverScreen() {
    push();
    background("#222");
    fill("#fff");
    textAlign(CENTER, CENTER);

    textSize(48);
    text("Time's up!", width/2, height/2 - 40);
    text("You didn't catch enough flies!", width/2, height/2);
    text("You went hungry...", width/2, height/2 + 40);

    textSize(20);
    text("Press space to return to title", width/2, height/2 + 20);
    pop();
}