/*
* Title: Homework 5 - Dots Dots Dots
* Author: Josiah Dudden
* Date: Feb 2026
* Simple Description: A canvas of dots with a random color scheme that grows into view over time. Dots hold random size and color, and moving the mouse near them will invert their color and turn them into a ring
* Instructions: Move the mouse, click to regenerate canvas
*/

let dots = []

//array of possible color schemes to be chosen upon redraw 
let colorSchemes = ["warm", "cool", "rainbow", "purple"]

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES)
  
  colorScheme = random(colorSchemes)
  
  //loop that creates the dots
  for (i = 0; i < 500; i++) {
    dots.push(new Dot());
  }
}

function draw() {
  background(220)
  switch(colorScheme) {
    case "warm":
      background("#ffe9c9")
      break;
    case "cool":
      background("#a7dbc4")
      break;
    case "rainbow":
      background("#D7D9FF")
      break;
    case "purple":
      background("#caa7db")
      break;
  }
  
  let t = frameCount / 60;
  
  for (let dot of dots){
    dot.update(t);
    dot.display();
  }
}

class Dot {
  constructor() {
    this.pos = createVector(random(0, width), random(0, height))
    this.goalSize = random(8, 20)
    this.size = 0
    
    //set color scheme according to random choice earlier
    switch(colorScheme) {
      case "warm":
        this.col = lerpColor(color(255, 0, 0), color(255, 255, 0), random())
        break;
        
      case "cool":
        this.col = lerpColor(color(0, 255, 0), color(0, 0, 255), random())
        break;
        
      case "rainbow":
        let colorChoices = [color(255, 0, 0), color(0, 255, 0), color(0, 0, 255), color(255, 255, 0), color(255, 0, 255), color(0, 255, 255)]
        this.col = random(colorChoices)
        break;
        
      case "purple":
        this.col = lerpColor(color(150, 0, 255), color(255, 0, 200), random())
        break;
        
      default:
        print("Invalid Color Scheme!")
        throw Error
    }
    
    //dots to appear in pieces
    this.spawnTimer = random(0, 600)
    this.isActive = false
    
    //for color logic
    this.isFilled = true
    this.isInverted = false
  }
  
  update(time) {
    this.spawnTimer--
    if (this.spawnTimer <= 0){
      this.isActive = true
    }
    
    if (this.isActive) {
      this.size = lerp(this.size, this.goalSize, 0.1)
    }
    
    //get mouse distance
    let mousePos = createVector(mouseX, mouseY)
    let mouseDist = this.pos.dist(mousePos)
        
    if (mouseDist < 75){
      //inverts the color, formatted this way such that it only runs once
      if (!this.isInverted) {
        this.col.setRed(255 - red(this.col))
        this.col.setGreen(255 - green(this.col))
        this.col.setBlue(255 - blue(this.col))
        this.isInverted = true
      }
      
      this.isFilled = false
    }
    else {
      if (this.isInverted) {
        this.col.setRed(255 - red(this.col))
        this.col.setGreen(255 - green(this.col))
        this.col.setBlue(255 - blue(this.col))
        this.isInverted = false
      }
      this.isFilled = true
    }
  }
  
  display() {
    
    //draw dots
    if (this.isActive){
      if (this.isFilled){
        fill(this.col)  
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size) 
      }
      else {
        noFill()
        stroke(this.col)
        strokeWeight(3)
        ellipse(this.pos.x, this.pos.y, this.size) 
      }
    }
  }
}

//reset canvas
function mousePressed() {
  dots = [] 
  setup();
}