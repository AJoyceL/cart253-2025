/**
 * This file contains the code to run *only* the green variation part of the program.
 * Note how it has its own draw, greenDraw(), and its own keyPressed, greenKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

/**
 * GLOBAL VALUES
*/

//speech values
let greenSpeech = '';

//panicked mind values
let panicked = [];


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

    // handles the panic
    for(let panic of panicked) {
        movePanic(panic);
        drawPanic(panic);
    }

    //draws the speech box
    drawGreenSpeechBox();

    //draws the introduction
    if (intro) {
        greenIntro();
    }
    //calls for speech
    if(showText && greenSpeech) {
        push();
        fill("white");   
        textSize(30);
        textWrap(WORD);
        textAlign(LEFT, TOP);
        textFont(firstTime);
        text(greenSpeech,  width/2 - 150, height/2 + 100, 320);
        pop();  
    }; 
}

/**
 * This will be called whenever a key is pressed while the green variation is active
 */
function greenKeyPressed(event) {
    if (event.keyCode === 27) { //esc button
        state = "menu";
        //reset game
        panicked = [];
        showText = false;
        greenSpeech = "";
        intro = true;
    }

    if(event.keyCode === 32) { //spacebar
        const interaction = speech.speech_interactions[0].green_var;
        greenSpeech = random(interaction.doubt);
        showText = true;
        intro = false;

        //triggers the panic
        for(let i = 0; i < 10; i++) {
            const morePanic = createPanic();
            panicked.push(morePanic);
        }
    }
}

/**
 * This will be called whenever the mouse is pressed while the green variation is active
 */
function greenMousePressed() {

}


/**
 * Intro
*/
function greenIntro() {
    intro= true;
    push();
    fill("white");   
    textSize(30);
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    textFont("Courier New");
    text("press space", width/2 - 150, height/2 + 150, 300);
    pop();
}



/** 
 * Background functions
*/

///Generate the speech box for the speech
function drawGreenSpeechBox() {
    push();
    fill(0, 0, 0, 200);
    stroke(255, 255, 255, 200);
    strokeWeight(1);
    rect(50, 325, 400, 150);
    pop();
}

//generate everything related to the panic
function createPanic() {
    //generate panic
    let panic = {
        x: random(225, 275),
        y: random(225, 275),
        w: random(200, 400),
        h: random(200, 400),
        shaking: random(2, 8),
    };
    return panic;
}

//handles the panic movement/animation
function movePanic(panic) {
    panic.x += random(-panic.shaking, panic.shaking);
    panic.y += random(-panic.shaking, panic.shaking);
}

//handles drawing the ellipses
function drawPanic(panic) {
    push();
    stroke("white");
    strokeWeight(random(.5,2));
    noFill();
    ellipse(panic.x, panic.y, panic.w, panic.h);
    pop();
}
