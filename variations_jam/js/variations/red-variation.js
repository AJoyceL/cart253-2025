/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

//Player values
const player = {
    x: 25,
    y: 350,
    size: 50,

    velocity: 0,
    speed: 3,
}

//Altar  values
let altarOne = undefined;
let altarTwo = undefined;

//camera
let camX = 0;
let camY = 0;




/**
 * This will be called just before the red variation starts
 */
function redSetup() {
    //Calls both altar scrolls
    altarOne = createAltars(1);
    altarTwo = createAltars(2)

    // reset the altars position
    resetAltar(altarOne);
    resetAltar(altarTwo);
}

/**
 * This will be called every frame when the red variation is active
 */
function redDraw() {
    background('#fa94e0ff');

    // Handles camera position == follows the player => reference p5
    camX = lerp(camX, player.x - width/2, 0.1); // smoother with lerp
    camX = constrain(camX, 0, 1300 - width); // limit the camra within the world
     
    push();
    translate(-camX, -camY);
    image(redBg, 0, 0, 1300, height); // calls the background img

    // Background
    drawBg(); // draws main background

    // speech altar
    drawAltars(altarOne);
    drawAltars(altarTwo);

    // player
    moveRedPlayer();
    drawPlayer();
    redPlayerOverlap();
    pop();

    //draws the speech box
    drawSpeechBox();
}

/**
 * This will be called whenever a key is pressed while the red variation is active
 */
function redKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu"; //esc button
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

function drawBg() {
    push();
    // draws the pavement
    image(redPaveImg, 0, 400, 1300, 100);

    // draws the stone
    image(redStoneImg, 0, 400, 1300, 25);
    pop();
}

// draws the speech box
function drawSpeechBox() {
    push();
    fill(247, 152, 183, 150);
    stroke(0, 0, 0, 150);
    strokeWeight(3);
    rect(75, 25, 350, 150);
    pop();
}


/**
 * Player functions
*/
function moveRedPlayer() {
    // move player on the X axis (left and right)
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        player.x -= 5;
    }

    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        player.x += 5;
    }
    
    // Constrain the player to the canvas
    player.x = constrain(player.x, player.size / 2, 1300 - player.size / 2);
}

function drawPlayer() {
    push();
    fill("#1366e2ff")
    noStroke();
    rect(player.x, player.y, player.size)
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

// player and altar overlap
// overlap const taken from conditionals/creature-loves-massage
function redPlayerOverlap() {
    // calls for speech
    const interaction = speech.speech_interactions[0].red_var;

    //calls for the alatr arrays
    const altarsArray = [altarOne, altarTwo];

    //Horizontal overlap => text appears when the player overlaps with the altar
    for (let a of altarsArray) {
        const distance = dist(player.x, player.y, a.x, a.y);
        const altarOverlap = (distance < player.size/2);

        //triggers respective speech
        if(altarOverlap) {
            collided = true; //speech true
            if(a === altarOne) {
                preffixText = random(interaction.prefix);
                resetAltar(a);
            }

            if(a === altarTwo) {
                suffixText = random(interaction.sufix);
                resetAltar(a);
            }
            

        }
    }
}

//Resets the altar
function resetAltar(altar) {
    altar.x = random(100, 1250); //reset scroll position
}