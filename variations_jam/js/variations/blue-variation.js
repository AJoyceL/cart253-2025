/**
 * This file contains the code to run *only* the blue variation part of the program.
 * Note how it has its own draw, blueDraw(), and its own keyPressed, blueKeyPressed().
 * This keeps the stuff the menu needs to do *separate* from the rest of the program.
 */


/**
 * GLOBAL VALUES
*/
//imgs values
let yellows = [];
let reds = [];
let blues = [];
let lilacs = [];
let pebbles = [];
let trees = [];
let flowerCount = 5;

/**
 * This will be called just before the blue variation starts
 */
function blueSetup() {
    //handles flowers and pebble position
    for (let i = 0; i < flowerCount; i++) {
        yellows.push(createFlowers());
        reds.push(createFlowers());
        blues.push(createFlowers());
        lilacs.push(createFlowers());
        pebbles.push(createFlowers());

    }
    //handles the trees position
    for(let i = 0; i < 5; i++) {
        trees.push(createTrees());
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
}

/**
 * This will be called whenever a key is pressed while the blue variation is active
 */
function blueKeyPressed(event) {
    if (event.keyCode === 27) {
        state = "menu";
    }
}

/**
 * This will be called whenever the mouse is pressed while the blue variation is active
 */
function blueMousePressed() {

}

function createFlowers() {
    return {
        x: random(0, width - 75),
        y: random(0, height - 75),
    };
}

function createTrees() {
    return {
        x: random(0, width - 100),
        y: random(0, height - 100),
    };
}

function drawFlowers() {
    //draws yellow flowers
    for (let yellow of yellows) {
        push();
        image(yellowF, yellow.x, yellow.y, 75, 75);
        pop();
    }
    
    //draws red flowers
    for (let red of reds) {
        push();
        image(redF, red.x, red.y, 75, 75);
        pop();
    }

    //draws blue flowers
    for (let blue of blues) {
        push();
        image(blueF, blue.x, blue.y, 75, 75);
        pop();
    }

    //draws lilacs
    for (let lilac of lilacs) {
        push();
        image(lilacF, lilac.x, lilac.y, 75, 75);
        pop();
    }

    //draws pebbles
    for (let pebble of pebbles) {
        push();
        image(pebbleF, pebble.x, pebble.y, 75, 75);
        pop();
    }
    
    //draws trees
    for (let tree of trees) {
        push();
        image(treeImg, tree.x, tree.y, 200, 200);
        pop();
    }
}