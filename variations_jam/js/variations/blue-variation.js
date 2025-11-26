/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


/**
 * GLOBAL VALUES
*/
//imgs background objects values
let yellows = [];
let reds = [];
let blues = [];
let lilacs = [];
let pebbles = [];
let trees = [];
let flowerCount = 8;

//fairies img value
let currentFairy = null;

//night value
let nightTime = 0; //0 = day, 1 = night
let nightSpeed = 0.0005; //speed of time
let nightDirection = 1; // makes it darker or lighter
let night = false;

//grid size
let gridSize = 50; //50x50 pixels per grid square
let cols, rows; //columns and rows

//player values
let bPlayer = {
    x: 25,
    y: 450,
    size: 100,
    speed: 3,
    img: null,
}



/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    bPlayer.img = sheepDown; //calls for the player default img
    //calls for grid layout to calculate the closes value
    cols = floor(width / gridSize);
    rows = floor(height / gridSize);

    // generate and shuffle grid
    let squares = randomGridPos(); 

    // assign flowers, pebbles and trees their position
    for (let i = 0; i < flowerCount; i++) {
        yellows.push(createFlowers(squares[i]));
        reds.push(createFlowers(squares[i + flowerCount]));
        blues.push(createFlowers(squares[i + flowerCount * 2]));
        lilacs.push(createFlowers(squares[i + flowerCount * 3]));
        pebbles.push(createFlowers(squares[i + flowerCount * 4]));
        trees.push(createFlowers(squares[i + 18 * 5]));
    }
}

/**
 * This will be called every frame when the blue variation is active
 */
function blueDraw() {
    background("#0d6126ff");
    image(grassLand, 0, 0, width, height);//draws the grass floor

    //draw flowers
    drawFlowers();
    moveBluePlayer();
    drawBluePlayer();
    bPlayerOverlap();

    //handles the night cycle
    if(night === true) {
        drawNight();
    }

    //calls for intro
    if(intro) {
        bIntro();
        night = false;
        bPlayer.img - sheepDown;
    }

    //calls for speech
    if(showText && blueSpeech) {
        //draws the speech box
        push();
        fill(172, 180, 137, 200);
        noStroke();
        rect(50, 25, 400, 100);
        pop();

        //draws the speech
        push();
        fill("black");
        textSize(18);
        textWrap(WORD);
        textAlign(CENTER, TOP);
        text(blueSpeech, width/2 - 150, height/2 - 200, 250);
        pop();

        //draws the fairy
        if(currentFairy){
            push();
            image(currentFairy, 350, 30, 100, 100);
            pop();
        }
    }
    if(collided) {
        showText = true;
        blueSpeech = flowerText;
    }
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";

        //reset night cycle
        nightTime = 0; 
        night = false;

        //reset player position
        bPlayer.x = 25; 
        bPlayer.y = 450;

        //reset speech
        collided = false;
        showText = false;
        intro = true;
        blueSpeech = "";
        flowerText = "";
        currentFairy = null;

        //reset flower
        yellows = [];
        reds = [];
        blues = [];
        lilacs = [];
        pebbles = [];
        trees = [];
    }
}

/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function blueMousePressed() {

}


/**
 * Intro
*/
function bIntro() {
    //draws the speech box
    push();
    fill(172, 180, 137, 200);
    noStroke();
    rect(50, 25, 400, 100);
    pop();

    //draws intro text
    push();
    fill("black");
    textSize(20);
    textStyle(BOLD);
    textFont("Courier New");
    textWrap(WORD);
    textAlign(CENTER, CENTER);
    text("move player with Left/Right/Up/Down arrow or A/S/D/W key", width/2 - 150, height/2 - 175, 300);
    pop();
}


/**
 * Grid layout
*/
function randomGridPos() {
    let squares = [];
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++) {
            squares.push({col: i, row: j});
        }
    }
    shuffle(squares, true); //shuffles in place the arrays
    return squares;
}

/**
 * Forest background and object functions
*/
//handles night and day cycle
function drawNight() {
    nightTime += nightSpeed * nightDirection;
    nightTime = constrain(nightTime, 0, 1);
   
    //handles night and day cycle
    if(nightTime >= .9) {
        nightDirection = -1;
    }
    if(nightTime <= 0) {
        nightDirection = 1;
    }

    //colour overlay that gets stronger over time
    let r = lerp(13, 0, nightTime);
    let g = lerp(97, 0, nightTime);
    let b = lerp(38, 128, nightTime);

    //opacity
    let fade = lerp(0, 200, nightTime);

    //draws
    push();
    fill(r, g, b, fade);
    noStroke();
    rect(0, 0, width, height);
    pop();
}

//handles creating flowers
function createFlowers(square) {
    let maxX = min(gridSize - 50, width - square.col * gridSize - 50);
    let maxY = min(gridSize - 50, height - square.row * gridSize - 50);

    return {
        x: square.col * gridSize + random(0, maxX),
        y: square.row * gridSize + random(0, maxY), 
        inside: false, 
    };
}

//draws the flowers
function drawFlowers() {
    //draws yellow flowers
    for (let yellow of yellows) {
        push();
        image(yellowF, yellow.x, yellow.y, 50, 50);
        pop();
    }
    
    //draws red flowers
    for (let red of reds) {
        push();
        image(redF, red.x, red.y, 50, 50);
        pop();
    }

    //draws blue flowers
    for (let blue of blues) {
        push();
        image(blueF, blue.x, blue.y, 50, 50);
        pop();
    }

    //draws lilacs
    for (let lilac of lilacs) {
        push();
        image(lilacF, lilac.x, lilac.y, 50, 50);
        pop();
    }

    //draws pebbles
    for (let pebble of pebbles) {
        push();
        image(pebbleF, pebble.x, pebble.y, 50, 50);
        pop();
    }
    
    //draws trees
    for (let tree of trees) {
        push();
        image(treeImg, tree.x, tree.y, 100, 100);
        pop();
    }
}


/**
 * Player Functions
*/
function moveBluePlayer(){
    //handles player moving horizontally
    if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        bPlayer.x -= bPlayer.speed;
        bPlayer.img = sheepLeft; //calls for player img change
        night = true; //trigger night cycle
        intro = false; //remove intro text
    }
    if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        bPlayer.x += bPlayer.speed;
        bPlayer.img = sheepRight; //calls for player img change
        night = true; //trigger night cycle
        intro = false; //remove intro text
    }

    //handles them move vertically
    if(keyIsDown(UP_ARROW) || keyIsDown(87)) {
        bPlayer.y -= bPlayer.speed;
        bPlayer.img = sheepUp; //calls for player img change
        night = true; //trigger night cycle
        intro = false; //remove intro text
    }
    if(keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        bPlayer.y += bPlayer.speed;
        bPlayer.img = sheepDown; //calls for player img change
        night = true; //trigger night cycle
        intro = false; //remove intro text
    }

    //limit horizontal movement  within the canvas
    bPlayer.x = constrain(bPlayer.x, bPlayer.size / 2, 475 - bPlayer.size / 2);
    //limit vertical movement  within the canvas
    bPlayer.y = constrain(bPlayer.y, bPlayer.size / 2, 475 - bPlayer.size / 2);
}

//draws theb blue player
function drawBluePlayer(){
    push();
    noStroke();
    noFill();
    image(bPlayer.img, bPlayer.x, bPlayer.y, bPlayer.size, bPlayer.size);
    pop();
}

//handles the overlap
function bPlayerOverlap() {
    //calls for speech
    const interaction = speech.speech_interactions[0].blue_var;
    const flowerFairy = interaction.flower_fairy; //flower fairy speech
    const thornFairy = interaction.thorn_fairy; //thorn fairy speech
    const lunaFairy = interaction.luna_fairy; //luna fairy speech

    //calls for the flower arrays
    const flowerArrays = [
        ...yellows,
        ...reds,
        ...blues,
        ...lilacs,
        ...pebbles,
        ...trees
    ];

    //object overlap
    for(let f of flowerArrays) {
        const distance = dist(bPlayer.x, bPlayer.y, f.x, f.y);
        const flowerOverlap = (distance < bPlayer.size/2);

        //handles overlap speech trigger
        if(flowerOverlap && !f.inside) {
            collided = true; //speech true
            f.inside = true; // mark player entry, prevents overlap registry until exit

            //night restriction to the luna fairy
            let chosenFairy;

            if(nightTime>= .6) {
                chosenFairy = lunaFairy;
            }
            else {
                //randomly pick 1 of the 3 speech arrays
                const choices = [flowerFairy, thornFairy];
                chosenFairy = random(choices);
            }

            // pick a random line from that fairy
            flowerText = random(chosenFairy);

            //set the current fairy img depending on which speech is triggered
            if(chosenFairy === flowerFairy) {
                currentFairy = flowerF; //calls for theflower fairy
            }
            else if(chosenFairy === thornFairy) {
                currentFairy = thornF; //calls for thorn fairy
            }
            else if(chosenFairy === lunaFairy) {
                currentFairy = lunaF; //calls for luna fairy
            }
            else {
                currentFairy = null;
            }

            break; 
        }
        if(!flowerOverlap) { //to detect exit, unlock the trigger
            f.inside = false;
        }
    }
}