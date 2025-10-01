/**
 * Plain events
 * Joyce Angelina Lam
 * 
 * experiemnting with event handling in Plain JS
 * 
 * INFO: USE MOZILLA DEVELOPER NETWORK FOR REFERENCE
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/  addEventListener
 */

"use strict";

//Information about the current and posssible background fills
const bg = {
    fill: "#000000",
    fills: {
        black: "#000000",
        white: "#FFFFFF",
    },

   switchKey: 32 //Spacebar
}

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {
    createCanvas(400, 400);

    //Listen foir keypresses
    window.addEventListener("keydown",changeBG);
}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {
    background(bg.fill);
}

function changeBG(event) {
    //Check if the key pressed is the spacebar
    if(event.keyCode === bg.switchKey) {
        if(bg.fill === bg.fills.black) {
            bg.fill = bg.fills.white;
        } 
        else {
            bg.fill = bg.fills.black;
        }
    }
}


//"mousedown" "mouseup" "mousemove" "mouseenter" "mouseleave" "dblclcick"
//"keydown" "keyup" "keypress"
