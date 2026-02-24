/*
 * Title: HW3 - Digital Coin Flip
 * Author: Josiah Dudden
 * Date: Jan 2026
 * Simple Description: A fair coin with a unique design which flips when a key is pressed
 * Instructions: Press any key to flip the coin.
 */

let flipResult = "heads"; //to be set to either "heads" or "tails"
let isFlipping = false;
let flipTimer = 0;
let coinRadius = 125;
let r = coinRadius;

// for scorekeeping
let headsCount = 0;
let tailsCount = 0;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
}

function draw() {
  background("#228c49");

  fill("black");
  textSize(20);
  text("Press any key to flip the coin!", 200, 40);

  textSize(18);
  text("Total Heads: " + headsCount, 100, 360);
  text("Total Tails: " + tailsCount, 300, 360);

  //base coin
  strokeWeight(1);
  fill("#ffd773");
  ellipse(200, 200, r);
  strokeWeight(0.3);
  fill("#5C55A4");
  ellipse(200, 200, r * 0.75);

  if (isFlipping === false) {
    if (flipResult == "heads") {
      displayHeads();
    } 
    else if (flipResult == "tails") {
      displayTails();
    }
  } 
  else {
    animateFlip();
  }
}

function displayHeads() {
  //ideas: sunrise with CE-esque mountains
  push();
  clip(mask);

  fill("#556CB8");
  ellipse(200, 200, 100);

  //sunset colors
  noStroke();

  fill("#FF4611");
  ellipse(210, 215, 100);

  fill("#FF6012");
  ellipse(210, 215, 80);

  fill("#FF923F");
  ellipse(210, 215, 60);

  fill("#FFD22F");
  ellipse(210, 215, 40);

  fill("#F9FF96");
  ellipse(210, 215, 20);

  stroke(0);

  //mountains
  translate(0, -15); //moving the mountains higher after i wasn't happy with their original position

  fill("black");
  triangle(230, 235, 180, 350, 350, 350);

  fill("white");
  rotate(45);
  rect(325, -10, 18, 140);

  rotate(-45);
  fill("black");
  triangle(170, 200, 75, 350, 300, 350);

  rotate(45);
  fill("white");
  rect(260, 20, 18, 100);

  rotate(-90);
  rect(-8, 343, 18, 100);
  rect(-38, 278, 18, 140);
  rect(-68, 278, 18, 140);

  pop();
}

function displayTails() {

  fill("#191261");
  ellipse(200, 200, r * 0.75);

  push();
  clip(mask);

  //moon
  fill("#b3b3b3");
  ellipse(210, 215, 20);

  fill("#828181");
  noStroke();
  ellipse(203, 205, 3);
  ellipse(212, 217, 3);
  ellipse(220, 207, 3);
  stroke(0);

  //sky bullshit
  push();
  noFill();
  stroke(255);
  strokeWeight(4);
  arc(210, 215, 40, 40, 240, 0);
  arc(210, 215, 50, 50, 25, -20);
  arc(210, 215, 60, 60, 270, 50);
  arc(210, 215, 70, 70, 250, 70);
  arc(210, 215, 80, 80, 25, -50);
  arc(210, 215, 90, 90, 240, 0);
  arc(210, 215, 100, 100, 190, 280);
  pop();

  //mountains
  translate(0, -15); //moving the mountains higher after i wasn't happy with their original position

  fill("black");
  triangle(230, 235, 180, 350, 350, 350);

  fill("white");
  rotate(45);
  rect(325, -10, 18, 140);

  rotate(-45);
  fill("black");
  triangle(170, 200, 75, 350, 300, 350);

  rotate(45);
  fill("white");
  rect(260, 20, 18, 100);

  rotate(-90);
  rect(-8, 343, 18, 100);
  rect(-38, 278, 18, 140);
  rect(-68, 278, 18, 140);

  pop();
}

function animateFlip() {
  //tweak the "height" of the coin
  smallestRadius = 55;

  if (flipTimer <= 20) {
    r = lerp(r, smallestRadius, 0.14);
  } else if (flipTimer > 20 && flipTimer < 45) {
    r = lerp(r, coinRadius, 0.16);
  } else {
    r = coinRadius; //reset back to original size
    isFlipping = false;

    if (flipResult === "heads") {
      headsCount++;
    } else if (flipResult === "tails") {
      tailsCount++;
    }
  }

  flipTimer++;
}

function keyPressed() {
  if (isFlipping === false) {
    rand = Math.round(random());
    if (rand === 0) {
      flipResult = "heads";
    } else if (rand === 1) {
      flipResult = "tails";
    } else {
      print("Error: flipResult = " + flipResult);
    }

    //begin the flip animation
    flipTimer = 0;
    isFlipping = true;
  }
}

function mousePressed() {
  print("MouseX = " + mouseX + " MouseY = " + mouseY);
}

function mask() {
  ellipse(200, 200, r * 0.75);
}
