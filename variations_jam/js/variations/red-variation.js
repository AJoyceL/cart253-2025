/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

let clouds = [];

const player = {
    x: 25,
    y: 350,
    size: 50,

    velocity: 0,
    speed: 3,
    state: "idle",
}

let blocks = {
    one : {
        x: 150,
        y: 300,
        w: 60,
        h: 20,
        fill: "#bbbbff",
    },
    two: {
        x: 600,
        y: 300,
        w: 60,
        h: 20,
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
    // draws clouds
    // for (let i = 0; i < 10; i++) {
    //     let cloud = {
    //         x: random(width),
    //         y: random(10, 350),
    //         size: random(60, 100),
    //     };
    //     clouds.push(cloud);
    // };
    for(let i = 0; i< 10; i++) {
        clouds.push({
            x: random(2000),
            y: random(10, 350),
            size: random(60, 100),
        });
    }
}

/**
 * This will be called every frame when the red variation is active
 */
function redDraw() {
    background('#fa94e0ff');

    // Handles camera position == follows the player => reference p5
    camX = lerp(camX, player.x - width/2, 0.1); // smoother with lerp
    camX = constrain(camX, 0, 2000 - width); // limit the camra within the world
     
    push();
    translate(-camX, -camY);

    // Background
    drawBg(); // draws main background
    for (let c of clouds) {
        drawCloud(c.x, c.y, c.size);     // draws clouds
    }

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

function drawCloud(x, y, size) {
    // draws cloud
    push();
    fill('#ffdbf7ff');
    noStroke();
    ellipse(x, y, size, size* .6);
    ellipse(x - size * .4, y + 5, size * .7, size * .5);
    ellipse(x - size * .4, y + 5, size * .7, size * .5);
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
    player.x = constrain(player.x, player.size / 2, 2000 - player.size / 2);

   // handle the player jump
    if(player.state === "idle" && (keyIsDown(' ') || keyIsDown(32))) { //spacebar
        player.state = "jump";
        return false; //stop browser from scrolling
    } 

   if(player.state === "idle") {
    // idle, does nothing
   }

   else if(player.state === "jump") {
    player.y += -player.speed;

    // player falls back
    if (player.y <= 250) {
        player.state = "fall";
    }
   }

   else if(player.state === "fall") {
        player.y += player.speed;

        //stops when player reaches platform
        if(player.y >= 350) {
            player.state = "idle";
        }
   }

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
    rect(blocks.one.x, blocks.one.y, blocks.one.w, blocks.one.h);

    fill(blocks.two.fill);
    noStroke();
    rect(blocks.two.x, blocks.two.y, blocks.two.w, blocks.two.h);
    pop();
}

// player and block overlap
// taken from Mod Jam checkBatBounce
function redPlayerOverlap() {
    if(player.state !== "jump") return; 
    
    const interaction = speech.speech_interactions[0];

    //player 
    const px = player.x;
    const py = player.y;
    const ps = player.size/2;

    const blocksArray = [blocks.one, blocks.two];

    //vertical collision
    for (let b of blocksArray) {
        const hit = px < b.x + b.w &&
                    px + ps > b.x &&
                    py < b.y + b.h &&
                    py + ps > b.y;

        if(hit) {
            player.state = "fall";
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