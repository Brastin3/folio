var canvas;
var mode = 1;
var bg;
var darkmode = false;
var pg;
var canvaswidth = 100;
var canvassheight =100;

var shapes = [];

var blobsize = 20;
var blobcount = 20;

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style("z-index","-1");
  canvas.elt.style.position = "fixed"
  bg=color(33, 111, 237);
  for(var i = 0;i<blobcount;i++){
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
//does this work please work aaa

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
  

  
  constructor(index){
    colorMode(HSB,255,255,255);
    this.x = random(0,width/20);
    this.y = random(0,height/20);
    this.time = random(0,60);
    this.size = blobsize;
    this.c = 255;
    this.state = 0;
    this.xspeed = random(-0.1,0.1);;
    this.yspeed = random(-0.1,0.1);;
    this.border = 20;
    this.c=color(128+(128/blobcount)*index,255,255,0.5);
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

