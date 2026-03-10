/*
* Title: Project 2 - Experimental Clock
* Author: Josiah Dudden
* Date: March 2026
* Simple Description: TODO
* Instructions: N/A
*/

let showcaseMode = 0 //0: use time of day like usual. 1: open every eye, close them with the mouse
let hr, m, sec = 0

let bigEyes = []
let mediumEyes = []
let smallEyes = []

let bigOpenOrder = []
let mediumOpenOrder = []
let smallOpenOrder = []

let openBigEyes = []
let openMediumEyes = []
let openSmallEyes = []


function setup() {
  createCanvas(600, 600);
  ellipseMode(RADIUS)
  rectMode(CENTER)
  angleMode(DEGREES)
  textAlign(CENTER, CENTER)
  textSize(8)

  //initialize all eyes in their positions
  //hours
  for(a = 0; a < 360; a += 30){
    bigEyes.push(new Eye(a, 1))
  }
  //minutes
  for(a = 0; a < 360; a += 6.11){
    mediumEyes.push(new Eye(a, 2))
  }
  //seconds
  for(a = 0; a <= 360; a += 6.11){
    smallEyes.push(new Eye(a, 3))
  }
  
  //each eye has an ID built in, here we shuffle an array of each of their IDs to randomize the opening order
  for(i = 0; i < bigEyes.length; i++) {
    bigOpenOrder.push(i)
  }
  for(i = 0; i < mediumEyes.length; i++) {
    mediumOpenOrder.push(i)
  }
  for(i = 0; i < smallEyes.length; i++) {
    smallOpenOrder.push(i)
  }
  shuffle(bigOpenOrder, true)
  shuffle(mediumOpenOrder, true)
  shuffle(smallOpenOrder, true)
}

function draw() {
  background(0);
  
  //move the origin to the center
  translate(width/2, height/2)
  
  if(!showcaseMode) {
    [hr, m, sec] = [hour(), minute(), second()] 
    if (hr > 12) {
      hr = hr % 12
    }
    
    // fill(255)
    // text(hr + ":" + m + ":" + sec, 0, -250) 
  }
  else { //display all
    sec = 59
    m = 59
    hr = 12
  }
  
  //center
  push()
  
  noStroke()
  fill("#ff2424")
  ellipse(0, 0, 70) 
  
  fill(0)
  ellipse(0, 0, 35)
  
  noFill()
  stroke(0)
  ellipse(0, 0, 40)
  ellipse(0, 0, 45)
  ellipse(0, 0, 50)
  ellipse(0, 0, 55)
  ellipse(0, 0, 60)
  ellipse(0, 0, 65)
  
  pop()
  
  //hours
  if (hr === 1) {
    openBigEyes = []
    openBigEyes.push(bigOpenOrder[0])
  }
  else if (openBigEyes.length === hr - 1) {
    openBigEyes.push(bigOpenOrder[hr])
  }
  else if (openBigEyes.length < hr - 1) {
    for(i = 0; i < hr; i++) {
      openBigEyes.push(bigOpenOrder[i])
    }
  }
  //minutes
  if (m === 0) {
      openMediumEyes = []
  }
  else if (openMediumEyes.length === m - 1) {
    openMediumEyes.push(mediumOpenOrder[m])
  }
  else if (openMediumEyes.length < m - 1) {
    for(i = 0; i < m; i++) {
      openMediumEyes.push(mediumOpenOrder[i])
    }
  }
 
  //seconds  
  if (sec === 0) {
      openSmallEyes = []
  }
  else if (openSmallEyes.length === sec - 1) {
    openSmallEyes.push(smallOpenOrder[sec])
  }
  else if (openSmallEyes.length < sec - 1) {
    for(i = 0; i < sec; i++) {
      openSmallEyes.push(smallOpenOrder[i])
    }
  }
    
  for (let eye of bigEyes) {
    eye.update(openBigEyes, 1)
    eye.display()
  } 
  for (let eye of mediumEyes) {
    eye.update(openMediumEyes, 2)
    eye.display()
  } 
  for (let eye of smallEyes) {
    eye.update(openSmallEyes, 3)
    eye.display()
  } 
}

class Eye {
  constructor(angle, ring) {
    this.y = 0

    switch(ring){ //ring number is distance from center: 3 is farthest
      case 1:
        this.x = 135
        this.l = 70
        this.ring = 1
        this.rotSpeed = 0.3
        this.id = bigEyes.length
        break;
      case 2:
        this.x = 210
        this.l = 35
        this.ring = 2
        this.rotSpeed = -0.15
        this.id = mediumEyes.length
        break;
      case 3:
        this.x = 260
        this.l = 30
        this.ring = 3
        this.rotSpeed = 0.1
        this.id = smallEyes.length
        break;
    }
    this.h = this.l / 1.5
    this.openFactor = 0
    
    this.pupilRadius = this.l / 8.5
    this.pupilX = this.x
    this.pupilY = this.y
    this.pupilMax = this.pupilRadius * 0.7

    this.rotation = angle
    
    //eye open/shut bool
    this.isActive = false
  }
  
  //massive thank you to the professor for helping with and providing the eye's cursor tracking math
  update(openList, ring) {
    //mouse coords in context of world origin
    let rxWorld = mouseX - width/2;
    let ryWorld = mouseY - height/2;
    
    // mxLocal, myLocal are mouse coords in the SAME local space as this eye
    let total = this.rotation;
    let mxLocal =  rxWorld * cos(-total) - ryWorld * sin(-total);
    let myLocal =  rxWorld * sin(-total) + ryWorld * cos(-total);
 
    let dx = mxLocal - this.x;
    let dy = myLocal - this.y;
    
    let distToMouse = sqrt(dx * dx + dy * dy);
    // let mapped = map(distToMouse, 0, max(width, height), this.pupilMax, this.pupilMax, true);

    //snap to the edge unless mouse is inside the eye's radius
    if (distToMouse > this.pupilRadius * 0.9) {
      let scale = this.pupilMax / distToMouse;
      dx *= scale;
      dy *= scale;
      
      this.pupilX = this.x + dx;
      this.pupilY = this.y + dy;
    } 
    else {
      this.pupilX = mxLocal;
      this.pupilY = myLocal;
    }
    
    switch(ring) {
      case 1:
        for(let id of openBigEyes) {
          if (this.id === id) {
            this.isActive = true
          }
        }
        if (openBigEyes.length === 1)
          if (this.id != openBigEyes[0]) {
            this.isActive = false
          }
        break;
      case 2:
        for(let id of openMediumEyes) {
          if (this.id === id) {
            this.isActive = true
          }         
        }
        if (openMediumEyes.length === 0) {
            this.isActive = false
        }
        else if (openMediumEyes.length === 59){
          this.isActive = true
        }
        break;
      case 3:
        for(let id of openSmallEyes) {
          if (this.id === id) {
            this.isActive = true
          }
        }
        if (openSmallEyes.length === 0) {
            this.isActive = false
        }
        else if (openSmallEyes.length === 59){
          this.isActive = true
        }
        break;
    }
    
    if (showcaseMode) {
      if (mouseIsPressed) { 
        this.isActive = false
      }
      else {
        this.isActive = true
      }
    }
    
    if (this.isActive) {
      this.openFactor = lerp(this.openFactor, 1, 0.05)
    }
    else {
      this.openFactor = lerp(this.openFactor, 0, 0.04)
    }   
    
    this.rotation = this.rotation + this.rotSpeed
  }
  
  display() {
    push()
    noStroke()
    rotate(this.rotation)
    
    //clipping mask covers full eye shape
    beginClip();
    bezier(this.x - this.l / 2, this.y, this.x - this.l * 0.2, (this.h / 2) * this.openFactor, this.x + this.l * 0.2, (this.h / 2) * this.openFactor, this.x + this.l / 2, this.y)
    bezier(this.x - this.l / 2, this.y, this.x - this.l * 0.2, (this.h / 2) * -this.openFactor, this.x + this.l * 0.2, (this.h / 2) * -this.openFactor, this.x + this.l / 2, this.y)
    endClip();
    
    //eye fill
    fill("#ff2424")
    rect(this.x, this.y, this.l, this.h)
    
    //concentric rings
    noFill();
    stroke(0);
    ellipse(this.x, this.y, this.l * 0.23)
    ellipse(this.x, this.y, this.l * 0.30)
    ellipse(this.x, this.y, this.l * 0.38)
    ellipse(this.x, this.y, this.l * 0.46)

    //white of the eye
    fill(0)
    noStroke()
    ellipse(this.x, this.y, this.pupilRadius * 1.7)
    
    //pupil
    fill("#ff2424")
    ellipse(this.pupilX, this.pupilY, this.pupilRadius)
                
    pop()
  }
}