var s_logo;
var frameCount = 0;
var x;
var y;
var xs = 4;
var ys = 4;
var sans;
var c;

function preload(){
  sans=loadSound("sans.mp3");
  s_logo = loadImage("dvd.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  colorMode(HSB);
  //

  x=width/2;
  y=height/2;
  xs=4;
  ys=4;
  c = color(int(random(0,400)),255,255)
  //sans.play();
  //background(0);
}

function draw(){
  frameCount+=1;
  background(0);
  //image(s_logo,0,0);

  //fill((frameCount*2)%400,255,frameCount);
  //textSize(36);
  //textAlign(CENTER);
  if(y<0||y+175>height){
    ys=-ys;
    rcolor();
  }
  if(x<0||x+400>width){
    xs=-xs;
    rcolor();
  }
  x+=xs;
  y+=ys;
  //text("sans undertal",x+sin(frameCount/20)*50,y+cos(frameCount/20)*50);
  tint(c);
  image(s_logo,x,y)
  fill(255);
  //text("poopoo peepee",20,20);
  if(mouseIsPressed&&frameCount%10==0){
    var r = int(random(0,10));
    if(r<8){
      sans.play();
    }
  }
}

function rcolor(){
  c = color(int(random(0,400)),255,255)
  sans.play();
}
