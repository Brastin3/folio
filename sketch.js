var canvas;
var mode = 1;
var bg;
var darkmode = false;
var pg;
var canvaswidth = 100;
var canvassheight =100;

var shapes = [];

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  canvas.elt.style.position = "fixed"
  bg=color(33, 111, 237);
  for(var i = 0;i<20;i++){
    shapes.push(new Shape(i));
  }
  pg = createGraphics(width/20, height/20);
  document.body.style.overflow_x = 'hidden';
}

function draw(){
  observer.observe(document.querySelector('nav'));
  if(mode==1){
    pg.background(0);
    pg.colorMode(RGB);
    pg.background(24, 32, 51);
    pg.colorMode(HSB);
    background(0);
  }
  for(var i = 0;i<shapes.length;i++){
    shapes[i].show(pg);
  }
  pg.filter(BLUR,4);
  image(pg, 0, 0,width,height+20);
  
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}
//does this work


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

  
  constructor(index){
    colorMode(HSB,255,255,255);
    this.c=color(128+(128/20)*index,255,255,0.5);
  }

  show(){
    pg.colorMode(HSB,255,255);
    this.time+=0.2;
    pg.noStroke();
    pg.fill(this.c);
    pg.ellipse(this.x,this.y,this.size,this.size);
    this.x+=this.xspeed;
    this.y+=this.yspeed;
    if(this.time>60){
   
      this.time=0;
      this.xspeed = random(-0.1,0.1);
      this.yspeed = random(-0.1,0.1);
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

const observer = new IntersectionObserver( 
  ([e]) => e.target.toggleAttribute('stuck', e.intersectionRatio < 1),
  {threshold: [1]}
);

