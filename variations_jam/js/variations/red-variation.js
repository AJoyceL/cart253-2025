/**
 * This file contains the code to run *only* the red variation part of the program.
 * Note how it has its own draw, redDraw(), and its own keyPressed, redKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

let clouds = [];


/**
 * This will be called just before the red variation starts
 */
function redSetup() {
    // draws clouds
    for (let i = 0; i < 10; i++) {
        let cloud = {
            x: random(width),
            y: random(10, 350),
            size: random(60, 100),
        };
        clouds.push(cloud);
    } 
}

/**
 * This will be called every frame when the red variation is active
 */
function redDraw() {
    background('#fa94e0ff');

    // Background
    drawBg(); // draws main background
    for (let c of clouds) {
        drawCloud(c.x, c.y, c.size);     // draws clouds
    }
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
    rect(0, 400, 1000, 100);

    // draws the grass
    fill('#cf48b2ff');
    noStroke();
    rect(0, 400, 1000, 25);
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