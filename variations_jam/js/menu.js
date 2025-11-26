/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
(1) God's Messenger
(2) Within My Mind
(3) Forest Fae
`

/**
 * Display the main menu
 */
function menuDraw() {
    background('#6fc6eeff');
    varBg();

    push();
    fill('#62bbe4ff');
    textFont(chunky);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Talk To Me", width/2, height/2 -100);

    textSize(20);
    textAlign(CENTER, CENTER);
    textLeading(50);
    text(menuText, width / 2, height / 2 + 50);
    pop();

    //to verify if the alignment
    // noFill();
    // stroke(255, 0, 0);
    // rect(width/2 - 200, height/2 -20, 400, 40);  // Red area
    // rect(width/2 - 200, height/2 + 30, 400, 40);  // Green area
    // rect(width/2 - 200, height/2 + 80, 400, 40); // Blue area
}

/**
 * Listen to the keyboard
 */
function menuKeyPressed(event) {
    switch (event.keyCode) {
        case 49: // 1
            state = "red-variation";
            redSetup();
            break;

        case 50: // 2
            state = "green-variation";
            greenSetup();
            break;

        case 51: // 3
            state = "blue-variation";
            blueSetup();
            break;
    }
}

/**
 * This will be called whenever the mouse is pressed while the menu is active
 */
function menuMousePressed() {
    // variation one
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 - 20 && mouseY < height/2 + 30) {
        state = "red-variation";
        redSetup();
    };

    // variaiton two
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 + 30 && mouseY < height/2 + 70) {
        state = "green-variation";
        greenSetup();
    };

    // variation three
      if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 + 80 && mouseY < height/2 + 110) {
        state = "blue-variation";
        blueSetup();
    };
  
}

function varBg() {
    push();
    fill('#f1ede4ff')
    stroke("#1b1b1bff");
    strokeWeight(5);
    rect(25, 25, 450, 450, 10);
    pop();

    push();
    // stroke("black");
    // strokeWeight(10);
    noStroke();
    fill("#1b1b1bff");
    rect(52, 252, 397, 20, 5);
    rect(52, 302, 397, 20, 5);
    rect(52, 352, 397, 20, 5);

    fill('#e2dbcaff')
    noStroke();
    rect(50, 230, 400, 40, 5); //red var
    rect(50, 280, 400, 40, 5); //green var
    rect(50, 330, 400, 40, 5); // blue var


    pop();
}