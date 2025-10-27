/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

/**
 * create canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * draws gradient
*/
function draw() {
    background(0);

    let y = 0;

    for (let x = 0; x <= width; x+= 2){
        const shade = map(x, 0, width, 0, 255);

        push();
        stroke(shade);
        line(x, y, x, height);
        pop();

        
        y += random(0, 2);
    }
}