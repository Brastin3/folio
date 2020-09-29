var canvas;
var x;
var y;
var xs = 4;
var ys = 4;
var s_logo;
var mode = 1;
var bg;
var darkmode = false;
var pg;
var canvaswidth = 100;
var canvassheight =100;

var shapes = [];
function preload(){
  s_logo=loadImage("cool/dvd.png");
}



function setup(){
  
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  //canvas.elt.style.position = "fixed"
  x=width/2;
  y=height/2;
  xs=4;
  ys=4;
  bg=color(33, 111, 237);
  for(var i = 0;i<20;i++){
    shapes.push(new Shape(i));
  }
  pg = createGraphics(width/20, height/20);
  document.body.style.overflow_x = 'hidden';
  //pg.colorMode(HSB,255,255,255,1);
  //colorMode(HSB,255,255,255,1);
}

function draw(){
  
  if(mode==1){
    pg.background(0);
    pg.background(255,0,5);
    background(0);

    if(y<0||y+175>height){
      ys=-ys;
    }
    if(x<0||x+400>width){
      xs=-xs;
    }
    x+=xs;
    y+=ys;
    if(darkmode){
      //tint(33, 111, 237);
    }else{
      //  tint(255,255,255);
    }
    //image(s_logo,x,y);
  }
  if(mode==2){
    fill(255);
    textSize(72);
    text(char(int(random(0,256))),random(0,width),random(0,height));
  }

  for(var i = 0;i<shapes.length;i++){
    shapes[i].show(pg);
    //console.log("dingding");
  }
  //text("yeet",200,500);
  //filter(BLUR,10);
  pg.filter(BLUR,4);
  image(pg, 0, 0,windowWidth,windowHeight);
  
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  if(y<0||y+175>height){
    y=0
  }
  if(x<0||x+400>width){
    x=0
  }
}

function keyPressed(){

  if(key=='1'){
    mode=1;
  }
  if(key=='2'){
    mode=2;
  }
  if(key=='3'){
    this.moveTo(20,20);
  }

}

function toggleDarkLight() {
  var body = document.getElementById('body');
  var currentClass = body.className;
  body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
  darkmode=!darkmode;
  if(darkmode){
    bg=color(33, 39, 48);
  }else{
    bg=color(33, 111, 237);
  }

}


class Shape {

  
  x = random(0,width/20);
  y = random(0,height/20);
  time = random(0,60);
  size = 20;
  c = 255;
  state = 0;
  xspeed = random(-0.1,0.1);;
  yspeed = random(-0.1,0.1);;
  border = 20;

  
  constructor( index){
    colorMode(HSB,255,255,255);
    
    this.c=color(128+(128/20)*index,255,255,0.5);
    //this.c=color(255,255,128+(128/10)*index,255,255);
  }

  show(graphics){
    pg.colorMode(HSB,255,255);
    this.time+=0.2;
    graphics.noStroke();
    //graphics.stroke(255);
    pg.fill(this.c);
    //graphics.fill(255,0,255);
    pg.ellipse(this.x,this.y,this.size,this.size);
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    if(this.time>60){
   
      this.time=0;
      this.xspeed = random(-0.1,0.1);
      this.yspeed = random(-0.1,0.1);
      //this.c = color(random(0,360),255,255);
    }
    if(this.x>width/20+this.border){
      this.x=-this.border;
    }
    if(this.y>height/20+this.border){
      this.y=-this.border;
    }
    if(this.x<-this.border){
      this.x=width/20+this.border;
    }
    if(this.y<-this.border){
      this.y=height/20+this.border;
    }
  }
}