/*
* Title: Project 1 - Form Generator
* Author: Josiah Dudden
* Date: Feb 2026
* Simple Description: A scene inspired by the ending of a game called "Z.A.T.O. // I Love the World and Everything In It". This project depicts a radio tower in a gloomy sky with upwards falling snow, which can be zoomed out to brighten the sky into sunrise colors, and to transmit a message.
* Instructions: Drag the mouse side to side to zoom in/out and change the color of the sky. Leave the scene fully zoomed out for a short time to display a message
*/

//the point at which the tower will zoom towards
let transX = 630
let transY = 240

//snowflake object array
let snowflakes = []

let transmission = ".-.- - . .--- .-.- .-.. ..-- -... .-.. ..--" //russian morse code for "ЯТЕЙЯЛЮБЛЮ" meaning "I LOVE YOU"
let waitedTime = 0
let waitLength = 120 //time to wait before showing message, in frames
let opacity = 0

function setup() {
  createCanvas(600, 600);
  rectMode(CORNER)
  angleMode(DEGREES)
  
  //iteration count = snowflake count
  for(i = 0; i < 30; i++){
    snowflakes.push(new Snowflake());
  }
  
  //initialize background colors
  darkSky = [color("#424550"), color("#4d5063"), color("#4d5063"), color("#424550"), color("#424550"), color("#2b2d2f")]
  brightSky = [color("#F6B2C0"), color("#fec4ac"), color("#FDD2C2"), color("#FBDACB"), color("#FBE9DE"), color("#FBEDCB")]
}

function draw() {  
  //link sky brightness to mouse position
  lerpValue = map(mouseX, 100, 500, 0, 1, true)
  
  //draw sky
  noStroke();
  fill(lerpColor(darkSky[0], brightSky[0], lerpValue))
  rect(0, 0, width, height/6)
  fill(lerpColor(darkSky[1], brightSky[1], lerpValue))
  rect(0, 100, width, height/6)
  fill(lerpColor(darkSky[2], brightSky[2], lerpValue))
  rect(0, 200, width, height/6)
  fill(lerpColor(darkSky[3], brightSky[3], lerpValue))
  rect(0, 300, width, height/6)
  fill(lerpColor(darkSky[4], brightSky[4], lerpValue))
  rect(0, 400, width, height/6)
  fill(lerpColor(darkSky[5], brightSky[5], lerpValue))
  rect(0, 500, width, height/6)
  
  //scale tower based on mouse position
  let towerScale = map(mouseX, 100, 500, 1, 0.6, true)
  
  //draw the tower
  push();
  translate(transX, transY); //move the scaling point
  scale( towerScale);
  drawTower(190 - transX, 165 - transY); //coords are the base of the top left of the tower
  pop();
  
  //show transmission if tower is fully zoomed out, after a short wait
  if (mouseX >= 500){
    //wait before drawing text
    waitedTime++
    
    //control opacity after waiting, will not exceed 255
    if (waitedTime >= waitLength){
      if (opacity <= 255){
        opacity += 3
      }
      else {
        opacity = 255 
      }
      
    fill(0, opacity)
    textSize(25)
    text(transmission, 20, 230)
    }
  }
  else if (mouseX < 500){
    
    waitedTime = 0
    
    if (opacity >= 0){
      opacity -= 25
    }
    else {
      opacity = 0
    }
    
    fill(0, opacity)
    textSize(25)
    text(transmission, 20, 230)
  }
  
  
  //update snowflakes
  let t = frameCount / 60;
  
  for (let flake of snowflakes){
    flake.update(t);
    flake.display();
  }
}

function mousePressed() {
  print("MouseX = " + mouseX + " MouseY = " + mouseY);
}

//My tower design with Professor's scaling solution, many thanks!
function drawTower(x, y) {
  //re-arranged from what you had to draw from the top down

  stroke(0);
  strokeWeight(1);
  //noFill();
  fill(0);

  //viewing deck
  //top
  rect(x, y, 210, 10);
  //bottom
  rect(x, y + 75, 210, 10);
  //left
  rect(x + 20, y + 5, 8, 70);
  //right
  rect(x + 180, y + 5, 8, 70);

  //tower body
  //left
  rect(x + 50, y + 85, 10, 1200);
  //right
  rect(x + 150, y + 85, 10, 1200);

  //handrail
  rect(x + 28, y + 55, 155, 3);
  for(i = 0; i < 9; i++){
    dMod = i * 17;
    rect(x + 28 + dMod, y + 56, 0.5, 20);
  }
  
  // "ladder"
  noFill();
  rect(x + 90, y + 85, 5, 1200);
  fill("black");
  
  //Criss Cross Pattern
  //Suggestion to try lines instead of rectangles

  push();

  beginClip(); //this clipping is a good idea - I extended the bounds to allow for scaling, might be nice to tie in with scale mapping
  rect(x + 50, y + 85, 110, 1200);
  endClip();

  //to the RIGHT and down
  let xBox = (130 * sqrt(2)) / 2; //based on original design of rectangle length = 130px
  let n = 20; //a guess really
  for (let i = -1; i < n; i++) {
    let interval = 60 * i; //some of these numbers are just a guess from your original drawing sketch.
    strokeWeight(4);
    line(x + 50 + 10, y + 85 + interval, x + 150, y + 85 + xBox + interval);
  }

  //to the LEFT and down (same numbers etc.)
  xBox = (130 * sqrt(2)) / 2; //based on original design of rectangle length = 130px
  n = 20;
  for (let i = -1; i < n; i++) {
    interval = 60 * i;
    strokeWeight(4);
    line(x + 150, y + 85 + interval, x + 50 + 10, y + 85 + xBox + interval);
  }

  pop();
  
  //building under the tower
  fill("grey")
  rect(x - 50, y + 520, 600, 600)
}

//special thanks for the Snowflakes example on the p5.js website for object help
class Snowflake {
  constructor() {
    //initialize snowflake variables
    this.pos = createVector(random(-40, width + 10), random(height, height*2 + 50)) //randomize position within looping bounds
    this.velocity = createVector(random(0.2, 0.6), random(-0.25, -0.7)) //randomize velocity slightly
    this.size = random(5, 9)
  }
  
  update(time) {
    //update position
    this.pos.add(this.velocity)
    
    //loop snowflake position once it leaves bounds of canvas
    if (this.pos.x > width + 10){
      this.pos.x = -50;
    }
    if (this.pos.y < -10) {
      this.pos.y = height + 50
    }
  }
  
  display() {
    //draw snowflake
    fill("white");
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
  }
}