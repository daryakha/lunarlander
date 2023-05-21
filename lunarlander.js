// screen variables
let WELCOME_SCREEN = 0;
let GAME_SCREEN = 1;
let GAME_WON_SCREEN = 2;
let GAME_LOST_SCREEN = 3;

let currentScreen = WELCOME_SCREEN;

// set variables
let x = 350;
let y = -50;
let velocity = 2;
let difficultyVelocity = 4.5;
let minHeight = 450;
let touchGround = false;
let keyActive = false;
let rotation = 0;
// set variables game counter
let counter = 0;
let gamesWon = 0;
let gamesLost = 0;

// load pictures
let planet = loadImage("planet.png");

function setup() {
  createCanvas(700, 700);
  textAlign(CENTER);
  rectMode(CENTER);
  frameRate(30);
}
function gameCounter() {
  push();
  textAlign(LEFT);
  textSize(20);
  fill(255);
  text("total: " + counter, 20, 25);
  text("won: " + gamesWon, 20, 47);
  text("lost: " + gamesLost, 20, 69);
  pop();
  resetButton(630, 30);
}
function ufo(x, y, s) {
  push();
  scale(s);
  flame();
  // legs
  push();
  translate(x - 30, y + 22);
  rotate(PI / 6.5);
  rect(0, 0, 5, 20, 5); // left
  pop();

  push();
  translate(x + 30, y + 22);
  rotate(-PI / 6.5);
  rect(0, 0, 5, 20, 5); // right
  pop();
  // alien head
  push();
  noStroke();
  fill("lime");
  ellipse(x, y - 20, 17, 30);
  circle(x, y - 28, 25);
  pop();
  if (currentScreen === GAME_WON_SCREEN) {
    push();
    // alien smile
    fill(0);
    noStroke();
    ellipse(x, y - 21, 7, 5);
    fill("lime");
    ellipse(x, y - 23, 9, 5);
    //flag
    pop();
    flag();
  }
  // left eye
  fill(0);
  push();
  translate(x - 5.5, y - 28);
  rotate(-0.3);
  ellipse(0, 0, 7, 12);
  pop();
  // right eye
  push();
  translate(x + 5.5, y - 28);
  rotate(0.3);
  ellipse(0, 0, 7, 12);
  pop();
  // dome
  push();
  noFill();
  stroke(255);
  strokeWeight(1.5);
  arc(x, y, 55, 100, PI, 0);
  pop();
  // antenna
  fill(255);
  rect(x - 40, y - 17, 3, 25);
  // body
  fill("grey");
  ellipse(x, y, 90, 35);
  fill(255);
  rect(x, y, 88, 3); // stripe
  pop();
}
function ufoBroken(x, y, s) {
  push();
  scale(s);
  // legs
  push();
  translate(x - 32, y + 22);
  rotate(PI / 2.5);
  rect(0, 0, 5, 20, 5);
  pop();

  push();
  translate(x + 32, y + 22);
  rotate(-PI / 2.5);
  rect(0, 0, 5, 20, 5);
  pop();
  // alien head
  push();
  noStroke();
  fill("lime");
  ellipse(x, y - 15, 17, 30);
  circle(x, y - 23, 25);
  pop();
  // left eye
  textSize(9.3);
  push();
  translate(x - 5.6, y - 20);
  rotate(-0.15);
  text("✖️", 0, 0);
  pop();
  // right eye
  push();
  translate(x + 5.6, y - 20);
  rotate(0.15);
  text("✖️", 0, 0);
  pop();
  // dome
  push();
  translate(x + 27.5, y);
  rotate(PI / 2);
  noFill();
  stroke(255);
  strokeWeight(1.5);
  arc(-35, 25, 55, 100, PI, 0);
  pop();
  // antenna
  fill(255);
  rect(x - 40, y - 5, 3, 25);
  push();
  translate(x - 46, y - 13);
  rotate(-0.9);
  rect(0, 0, 15, 3);
  pop();
  // body
  fill("grey");
  ellipse(x, y + 5, 90, 35);
  fill(255);
  rect(x, y + 5, 88, 3); // stripe
  pop();
}
function flame() {
  if (keyActive === true) {
    push();
    noStroke();
    fill(150, 190, 255, 70);
    rect(350, y + 25, 35, 40, 10); // outer flame
    fill(255, 255, 255, 60);
    ellipse(350, y + 25, 10, 40); // inner flame
    pop();
  }
}
function flag() {
  push();
  translate(280, 220);
  rotate(0.35);
  fill("grey");
  rect(0, 0, 3, 55); // pole
  fill(255);
  rect(-2, 0, 0.7, 54); // pole highlight
  fill(210, 25, 45);
  rect(17, -17, 30, 20); // flag
  pop();
}
function Planet1(x, y, size) {
  image(planet, x, y, size, size);
}
function playButton(x, y) {
  push();
  fill(210, 25, 45);
  stroke(255);
  rect(x, y, 150, 70, 10);

  fill(255);
  textSize(40);
  text("PLAY", x, y + 13);
  pop();
}
function resetButton(x, y) {
  push();
  fill(210, 25, 45);
  stroke(255);
  rect(x, y, 70, 35, 10);

  fill(255);
  noStroke();
  textSize(22);
  text("reset", x, y + 7);
  pop();

}
function titleText() {
  // game name
  textSize(50);
  text("ULTIMATE ALIEN INVASION", 350, 50);
  text("SIMULATOR 3000!!!", 250, 670);
  // space bar
  push();
  noFill();
  stroke(255);
  rect(590, 325, 75, 18);
  pop();
  // spacebar text
  fill("grey");
  textSize(20);
  text("press spacebar", 590, 365);
  text("to keep up", 590, 385);
}
function keyPressed() {
  if (keyCode === 32) {
    velocity = -2.5;
    keyActive = true; // activates flame
  }
}
function keyReleased() {
  velocity = 2; // reset velocity
  keyActive = false;
}
function mouseClicked() {
  if (
    currentScreen === WELCOME_SCREEN &&
    mouseX > 515 &&
    mouseX < 665 &&
    mouseY > 615 &&
    mouseY < 685
  ) {
    currentScreen = GAME_SCREEN;
    // resets
    y = - 50; // reset position ufo
    velocity = 2;
    counter = 0;
    gamesWon = 0;
    gamesLost = 0;

  } else if (
    currentScreen === GAME_WON_SCREEN && mouseX < 595 && mouseY > 47.5)
   {
    currentScreen = GAME_SCREEN;
    y = -50; // reset postion ufo
    velocity = 2; // reset velocity

  } else if (currentScreen === GAME_LOST_SCREEN && mouseX < 595 && mouseY > 47.5) 
    {
    currentScreen = GAME_SCREEN;
    y = -50; // reset postion ufo
    velocity = 2; // reset velocity

  } else if (mouseX > 595 && mouseX < 665 && mouseY > 12.5 && mouseY < 47.5) {
    currentScreen = WELCOME_SCREEN;
  }
}
function fall() {
  if (keyActive === false) {
    velocity = velocity + 0.25;
  }
  y = y + velocity;
  if (y >= minHeight) {
    touchGround = true;
    if (velocity < difficultyVelocity && touchGround === true) {
      currentScreen = GAME_WON_SCREEN;
      gamesWon = gamesWon + 1;
      counter = counter + 1;
    }else if (velocity > difficultyVelocity && touchGround === true) {
      currentScreen = GAME_LOST_SCREEN;
      velocity = 0;
      gamesLost = gamesLost + 1;
      counter = counter + 1;
    }
   
  }
  if (y < -50) {
    textSize(20);
    text("wrong way you lazy ass", 350, 280);
  }
}
function draw() {
  if (currentScreen === WELCOME_SCREEN) {
    background(0);
    for (let i = 0; i < 10; i++) {
      fill("white");
      circle(random(0, 700), random(0, 700), 4);
    }
    // rotation planet
    push();
    translate(350, 350);
    rotate(rotation);
    rotation = rotation + 0.0013;
    Planet1(-140, -140, 300);
    pop();

    playButton(590, 650);
    titleText();
  } else if (currentScreen === GAME_SCREEN) {
    background(0);
    gameCounter();
    for (let i = 0; i < 7; i++) {
      fill(255);
      circle(random(0, 700), random(0, 700), 4);
    }
    Planet1(-35, 450, 850);
    ufo(x, y, 1);
    fall();
    console.log(velocity);
    
  } else if (currentScreen === GAME_WON_SCREEN) {
    background(0);
    gameCounter();
    for (let i = 0; i < 7; i++) {
      fill("white");
      circle(random(0, 700), random(0, 700), 4);
    }
    Planet1(-220, 420, 1300);
    ufo(x - 170, 200, 2);
    textSize(20);
    text("invasion: successful", 360, 250);
    fill(0);
    textSize(18);
    text("click to play again", 350, 675);

  } else if (currentScreen === GAME_LOST_SCREEN) {
    background(0);
    gameCounter();
    for (let i = 0; i < 7; i++) {
      fill("white");
      circle(random(0, 700), random(0, 700), 4);
    }
    Planet1(-220, 420, 1300);
    ufoBroken(x - 170, 203, 2);
    textSize(20);
    fill(210, 25, 45);
    text("invasion: failed", 360, 250);
    fill(0);
    textSize(18);
    text("click to try again", 350, 675);
  }
}