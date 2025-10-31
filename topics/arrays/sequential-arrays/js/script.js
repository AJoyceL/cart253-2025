/**
 * Speech! Speech!
 * Author Name
 * 
 * interactive speech-playing interface!
 */

"use strict";

//  The speech itself
let speech = ["Veni.", "Vidi.", "Vici.","Sensi malum."];
// Which sentence in speech to display
let speechIndex = 0;

/**
 * Create canvas
*/
function setup() {
    createCanvas(600, 100);

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(0);

    // Get the current line of speech
    let currentLine = speech[speechIndex];

    // Display the line
    push();
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text(currentLine, width/2, height/2);
    pop();
}

/**
 * Advances the speech
 */
function mousePressed(){
    // Next line
    speechIndex = speechIndex +1;

    if (speechIndex >= speech.length){
        // sytart over
        speechIndex = 0;
    }
}