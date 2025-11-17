/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/


/**
 * This will be called just before the green variation starts
 */
function greenSetup() {

}

/**
 * This will be called every frame when the green variation is active
 */
function greenDraw() {
    background("#091b2bff");
    drawGreenSpeechBox();
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) { //esc button
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {

}


/**
 * Background functions
*/

function drawGreenSpeechBox() {
    push();
    fill(0, 0, 0, 200);
    stroke(255, 255, 255, 200);
    strokeWeight(1);
    rect(50, 325, 400, 150);
    pop();
}

function drawGreenSpeech() {
    if(keyPressed('')) {
        collided = true;
        
    }
}