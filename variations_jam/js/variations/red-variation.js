/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

const player = {
    x: 25,
    y: 350,
    size: 50,

    velocity: 0,
    speed: 3,
}

let blocks = {
    one : {
        x: 150,
        y: 340,
        s: 60,
        fill: "#bbbbff",
    },
    two: {
        x: 600,
        y: 340,
        s: 60,
        fill: "#bbffeeff",
    },
}

//camera
let camX = 0;
let camY = 0;




/**
 * This will be called just before the red variation starts
 */
function redSetup() {
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


    // player
    moveRedPlayer();
    drawPlayer();
    redPlayerOverlap();

    // speech block
    drawBlock();

    pop();
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
    // draws the dirt
    push();
    fill('#591669ff');
    noStroke();
    rect(0, 400, 2000, 100);

    // draws the grass
    fill('#cf48b2ff');
    noStroke();
    rect(0, 400, 2000, 25);
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
 * Block functions
*/
function drawBlock() {
    push();
    fill(blocks.one.fill);
    noStroke();
    rect(blocks.one.x, blocks.one.y, blocks.one.s);

    fill(blocks.two.fill);
    noStroke();
    rect(blocks.two.x, blocks.two.y, blocks.two.s);
    pop();
}

// player and block overlap
// overlap const taken from conditionals/creature-loves-massage
function redPlayerOverlap() {
    // calls for speech
    const interaction = speech.speech_interactions[0].red_var;

    //calls for the blok arrays
    const blocksArray = [blocks.one, blocks.two];

    //Horizontal overlap => text appears when the player overlaps with the alter
    for (let b of blocksArray) {
        //text font
        textFont(novem);
        const distance = dist(player.x, player.y, b.x, b.y);
        const alterOverlap = (distance < player.size/2);

        //triggers respective speech
        if(alterOverlap) {
            collided = true;
            if(b === blocks.one) {
                preffixText = random(interaction.prefix);
            }

            if(b === blocks.two) {
                suffixText = random(interaction.sufix);
            }
        }
    }
    console.log(showText);
}