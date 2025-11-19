/**
 * This menu file contains the code to run *only* the menu part of the program.
 * Note how it has its own draw, menuDraw(), and its own keyPressed, menuKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */

const menuText = `
(1) Bow At The Altar
(2) Within My Mind
(3) Forest Fae
`

/**
 * Display the main menu
 */
function menuDraw() {
    background('#609ee6ff');

    push();
    fill('#22115fff');

    textFont("Verdana");
    textStyle(BOLD);
    textSize(50);
    textAlign(CENTER, CENTER);
    text("Talk To Me", width/2, height/2 -100);

    textFont("Arial");
    textSize(32);
    textAlign(LEFT, CENTER);
    text(menuText, width / 2 - 150, height / 2 + 50);
    pop();

    //to verify if the alignment
    // noFill();
    // stroke(255, 0, 0);
    // rect(width/2 - 150, height/2 -10, 300, 40);  // Red area
    // rect(width/2 - 150, height/2 + 30, 300, 40);  // Green area
    // rect(width/2 - 150, height/2 + 70, 300, 40); // Blue area
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
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 - 10 && mouseY < height/2 + 30) {
        state = "red-variation";
        redSetup();
    };

    // variaiton two
    if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 + 30 && mouseY < height/2 + 70) {
        state = "green-variation";
        greenSetup();
    };

    // variation three
      if (mouseX > width/2 - 150 && mouseX < width/2 + 150 && mouseY > height/2 + 70 && mouseY < height/2 + 110) {
        state = "blue-variation";
        blueSetup();
    };
  
}
