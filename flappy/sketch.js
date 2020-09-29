
var bx;
var by;
var ys;
var fs;

var p1x;
var p2x;
var p1y;
var p2y;

var score;
var highscore = 0;

var gs;

var gamespeed = 20;

var pipeup;
var pipedown;

function preload(){
  pipeup=loadImage("data/pipe.png");
  pipedown=loadImage("data/pipe2.png");
}

function setup(){
  createCanvas(800,480);
  reset();
  noSmooth();
}

function draw(){
  noStroke();
  bx=width/3;
  if(gs){
    ys++;
    if(ys>10){
      ys=10;
    }
    fs--;
    if(fs<0){
      fs=0;
    }

    by+=ys;
    by-=fs;

    p1x-=gamespeed;
    p2x-=gamespeed;

    if(p1x+100<0){
      p1x=width;
      p1y=int(random(120,height-120));
      //score++;
    }
    if(p2x+100<0){
      p2x=width;
      p2y=int(random(120,height-120));
      //score++;
    }
    if(by<0){
      by=0;
    }
    gamespeed+=0.001;
  }
  //background(0);
  fill(46, 165, 234);
  rect(0,0,width,height);
  fill(255);



  image(pipedown,p1x,p1y-100,96,-384);
  image(pipedown,p2x,p2y-100,96,-384);
  image(pipeup,p1x,p1y+100,96,384);
  image(pipeup,p2x,p2y+100,96,384);
  if(!gs){
    fill(0,100);
    rect(0,0,width,height);

  }
  fill(255);
  ellipseMode(CENTER);
  ellipse(bx,by,40,40);

  if(bx>p1x&&bx<p1x+100&&by<p1y-100+15&&by>0){
    reset();
  }else
  if(bx>p1x&&bx<p1x+100&&by>p1y+100-15&&by<height){
    reset();
  }else
  if(bx>p2x&&bx<p2x+100&&by<p2y-100+15&&by>0){
    reset();
  }else
  if(bx>p2x&&bx<p2x+100&&by>p2y+100-15&&by<height){
    reset();
  }else if(by>height){
    reset();
  }else if(int(bx/gamespeed)==int((p1x)/gamespeed)||int(bx/gamespeed)==int((p2x)/gamespeed)){
    score++;
  }

  textSize(36);
  textAlign(LEFT);
  text(score,10,40);
  textAlign(RIGHT);
  textSize(24);
  text("High "+highscore,width-10,30);

  fill(255);
}

function reset(){
  p1x=width;
  p2x=width+(width+100)/2;
  p1y=int(random(120,height-120));
  p2y=int(random(120,height-120));
  by=height/2;
  if(score>highscore){
    highscore=score;
  }
  score=0;
  gs=false;
  gamespeed=10;
}

function keyPressed(){
  fs=20;
  ys=0;
  gs=true;
}

function mousePressed(){
  fs=20;
  ys=0;
  gs=true;
}
