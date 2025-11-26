/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

//Player values
const rPlayer = {
    x: 25,
    y: 350,
    size: 50,

    velocity: 0,
    speed: 3,
    img: null,
}

//Altar values
let altarOne = undefined;
let altarTwo = undefined;
let altarThree = undefined;

//camera
let camX = 0;
let camY = 0;

//speech values
let prefixText = "";
let sufixText = "";
let middleText = "";
let redSpeech = '';



/**
 * This will be called just before the red variation starts
 */
function redSetup() {
    //calls for oracle default img
    rPlayer.img = oracleRight;
    //Calls both altar scrolls
    altarOne = createAltars(1);
    altarTwo = createAltars(2);
    altarThree = createAltars(3);

    // reset the altars position
    resetAltar(altarOne);
    resetAltar(altarTwo);
    resetAltar(altarThree);
}

/**
 * This will be called every frame when the red variation is active
 */
function redDraw() {
    background('#fa94e0ff');

    // Handles camera position == follows the rPlayer => reference p5
    camX = lerp(camX, rPlayer.x - width/2, 0.1); // smoother with lerp
    camX = constrain(camX, 0, 1300 - width); // limit the camra within the world
     
    push();
    translate(-camX, -camY);
    image(redBg, 0, 0, 1300, height); // calls the background img

    // Background
    drawRedBg(); // draws main background

    // speech altar
    drawAltars(altarOne);
    drawAltars(altarTwo);
    drawAltars(altarThree);

    // rPlayer
    moveRedPlayer();
    drawPlayer();
    redPlayerOverlap();  
    pop();

    //draws the speech box
    drawRedSpeechBox();

    //draws the introduction
    if(intro) {
        redIntro();
    }

    //Calls for speech
    if(showText && redSpeech) {
        push();
        fill("black");
        textSize(18);
        textFont(novem);
        textWrap(WORD);
        textAlign(LEFT, TOP);
        text(redSpeech, width/2 - 150, height/2 - 200, 300);
        pop();
    }
    if(collided) {
        showText = true;
        intro = false;
        redSpeech = prefixText + " " + middleText + " " + sufixText;
    }    
}

/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu"; //esc button
        
        //reset game
        rPlayer.x = 25; //rPlayer position
        //cam position
        camX.x = 0;
        camX.y = 0;
        //speech
        prefixText = "";
        middleText = "";
        sufixText = "";
        redSpeech = "";
        showText = false;
        collided = false;
        intro = true;
    }
}

/**
 * This will be called whenever the mouse is pressed while the red variation is active
 */
function redMousePressed() {

}

/**
 * Background functions
*/

function drawRedBg() {
    push();
    // draws the pavement
    image(redPaveImg, 0, 400, 1300, 100);

    // draws the stone
    image(redStoneImg, 0, 400, 1300, 25);
    pop();
}

// draws the speech box
function drawRedSpeechBox() {
    push();
    fill(247, 152, 183, 150);
    stroke(0, 0, 0, 150);
    strokeWeight(3);
    rect(75, 25, 350, 175);
    pop();
}

/**
 * Introduction/rules
 * let the Player know how to play
*/
function redIntro() {
    push();
    fill("black");
    textSize(20);
    textFont("Courier New");
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text("move player with Left/Right arrow or A/D key", width/2 - 150, height/2 - 150, 300);
    pop();
}


/**
 * Player functions
*/
function moveRedPlayer() {
    // move rPlayer on the X axis (left and right)
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        rPlayer.x -= 5;
        rPlayer.img = oracleLeft; // calls for the cat sprite
    }

    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        rPlayer.x += 5;
        rPlayer.img = oracleRight; // calls for the cat sprite
    }
    
    // Constrain the rPlayer to the canvas
    rPlayer.x = constrain(rPlayer.x, rPlayer.size / 2, 1300 - rPlayer.size / 2);
}

//draws the red player
function drawPlayer() {
    push();
    fill("#1366e2ff")
    noStroke();
    image(rPlayer.img, rPlayer.x, rPlayer.y, rPlayer.size, rPlayer.size)
    pop();
}

/**
 * Altars functions
*/
//creates the altars base values
function createAltars(altars) {
    let altar = {
        x: random(200, 1300 - 200),
        y: 340,
        size: 50,
        altar: altars,
    };
    return altar;
}

// draws the altars
function drawAltars(altars) {
    push();
    noStroke();
    image(altarImg, altars.x, altars.y, altars.size);
    pop();
}

// Player and altar overlap
// overlap const taken from conditionals/creature-loves-massage
function redPlayerOverlap() {
    // calls for speech
    const interaction = speech.speech_interactions[0].red_var;

    //calls for the alatr arrays
    const altarsArray = [altarOne, altarTwo, altarThree];

    //Horizontal overlap => text appears when the rPlayer overlaps with the altar
    for (let a of altarsArray) {
        const distance = dist(rPlayer.x, rPlayer.y, a.x, a.y);
        const altarOverlap = (distance < rPlayer.size/2);

        //triggers respective speech
        if(altarOverlap) {
            collided = true; //speech true
            if(a === altarOne) {
                prefixText = random(interaction.prefix);
                resetAltar(a);
            }

            if(a === altarTwo) {
                middleText = random(interaction.middle);
                resetAltar(a);
            }

            if(a === altarThree) {
                sufixText = random(interaction.sufix);
                resetAltar(a);
            }
        }
    }
}

//Resets the altar
function resetAltar(altar) {
    altar.x = random(100, 1250); //reset scroll position
}