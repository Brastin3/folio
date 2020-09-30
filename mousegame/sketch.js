var sx;
var sy;
var sd;
var time;
var score;
var stage;
var maxtime;
var ingame = false;
var starttime;
var prevgame;
var mode=0;
var clicked;
var hovered;
var high = 0;
var hoveredonce;
var hovertimerw;
function setup(){
  createCanvas(windowWidth,windowHeight);
  noStroke();
  textAlign(CENTER);
}

function draw(){
  textSize(24);
  background(33, 111, 237);
  bg();

  if(!ingame){
    fill(255);
    textSize(16);
    text("Display size: "+width+"x"+height,width/2,height/2+100);
    textSize(24);
    if(prevgame){
      text("Click to play",width/2,height/2-40);
      textSize(36);
      text("Your score: "+score,width/2,height/2-80);
      textSize(24);
      text("Highest score this session: "+high,width/2,40);
      if(mode==0){
        text("If this mode is too slow for you, try rapid mode.",width/2,80);
      }
      if(width<300||height<400){
        textSize(12);
        text("You have an awfully small display size.\n"+width+"x"+height,width/2,height/2+40);
        textSize(24);
      }else{
        textSize(18);
        if(score>40){
          text("You are incredibly good at this!",width/2,height/2+60);
        }else if(score>30){
          text("You are very good!",width/2,height/2+60);
        }else if(score>20){
          text("You did well!",width/2,height/2+60);
        }else if(score>10){
          text("Keep it up!",width/2,height/2+60);
        }else{
          text("Keep practicing.",width/2,height/2+60);
        }
        textSize(24);
      }
    }else{
      text("Click to play",width/2,height/2);
    }

    //text("Stay inside mode",width/3,height/2)
    rect(width/2-100);

    fill(255);
    rect(width/2-200,height-90,400,60,4);
    if(mouseX>width/2-200&&mouseX<width/2+200&&mouseY>height-90&&mouseY<height-30){
      rect(width/2-200-4,height-90-4,408,68,8);
    }
    fill(33, 111, 237);
    var s = "";
    var d = "";
    if(mode==0){
      s = "Mode: Regular";
      d = "Keep the mouse in the square until time runs out.";
    }
    if(mode==1){
      s = "Mode: Click the Square";
      d = "Click the square once before the time runs out.";
    }
    if(mode==2){
      s = "Mode: Rapid Mode";
      d = "No waiting for the timer to run out.";
    }
    if(mode==3){
      s = "Mode: Very Difficult Mode";
      d = "Reduced square size, fast timer, and less ui.";
      fill(255,100,100);
    }


    text(s,width/2,height-50);
    fill(255);
    textSize(16);
    text(d,width/2,height-110);
    textSize(24);
    if(mouseIsPressed&&height>300&&width>300){
      if(!(mouseX>width/2-200&&mouseX<width/2+200&&mouseY>height-90&&mouseY<height-30)){
        ingame=true;
        resetgame();
      }

    }
  }

  if(ingame){

    if((hoveredonce&&!hovered&&(mode==0||mode==1))||(map(time,0,maxtime,0,width)<width/4&&!hovered)&&(mode==0||(mode==1)&&!clicked)){
      fill(255, 79, 87);
      rect(int(sx-sd*2),int(sy-sd*2),int(sd*4),int(sd*4));
    }
    fill(39, 57, 71);
    rect(0,0,width,30);
    fill(79, 175, 234);
    time=maxtime-(millis()-starttime);
    if(map(time,0,maxtime,0,width)<width/4){
      fill(255,200,200)
    }
    rect(0,0,map(time,0,maxtime,0,width),30);

    fill(255);
    if(mouseX>=sx-sd&&mouseX<=sx+sd&&mouseY>=sy-sd&&mouseY<=sy+sd){
      fill(172, 255, 71);
      if(mouseIsPressed){
        clicked=true;
      }
      hovered=true;
      hoveredonce=true;
    }else{
      hovered=false;
    }
    if(mode==1&&clicked){
      fill(79, 175, 234);
      if(!hovered){
        timerend();
      }
    }
    if(mode==2&&hovered){
      fill(79, 175, 234);
      timerend();
    }
    rect(int(sx-sd),int(sy-sd),int(sd*2),int(sd*2));

    fill(255);
    if(hovered||clicked&&mode==1){
      text(score,sx,sy-sd-20);
      var t = map(time,0,maxtime,0,sd);
      hovertimerw=ease(hovertimerw,t,0.5);
      t=hovertimerw;
      rect(int(sx-t),int(sy-t),int(t*2),int(t*2));
    }

    text(score,width/2,24);
    textAlign(RIGHT);
    text("Square size: "+int(sd*2)+"px",width-10,24);
    textAlign(CENTER);
    if(time<=0){
      timerend();
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
}

function resetgame(){
  stage=0;
  score=0;
  maxtime=4000;
  time=4000;
  starttime=millis();
  sx=random(0+50,width-50);
  sy=random(0+50,height-50);
  sd=80;
  hovertimerw=sd;
  if(mode==3){
    maxtime=3000;
    time=3000;
    sd=60;
  }
}

function timerend(){
  if((mode==0||mode==3)&&mouseX>=sx-sd&&mouseX<=sx+sd&&mouseY>=sy-sd&&mouseY<=sy+sd){
    updatesquare();
  }else if(mode==1&&clicked){
    updatesquare();
  }else if (mode==2&&hoveredonce){
    updatesquare();
  }else{
    ingame=false;
    prevgame=true;
    if(score>high){
      high=score;
    }
    hoveredonce=false;
  }
}

function updatesquare(){
  sx=random(0+50,width-50);
  sy=random(0+100,height-50);
  sd=sd*0.95;
  maxtime=maxtime-250;

  if(mode!=3){
    if(maxtime<1250){
      maxtime=1250;
    }
    if(sd<5){
      sd=5;
    }
  }else{
    if(maxtime<1000){
      maxtime=1000;
    }
    if(sd<4){
      sd=4;
    }
  }
  time=maxtime;
  starttime=millis();
  score++;
  clicked=false;
  hoveredonce=false;
  hovertimerw=sd;
}


function ease(x,tx, e){
  x +=(tx - x)*e;
  return x;
}

function mousePressed(){
  if(!ingame){
    if(mouseX>width/2-200&&mouseX<width/2+200&&mouseY>height-90&&mouseY<height-30){
      mode++;
      if(mode>3){
        mode=0;
      }
    }
  }else{

  }
}

function bg(){
  fill(18, 91, 209);
  for(var i =0;i<int(width/100)+2;i++){
    for(var j =0;j<int(height/100)+2;j++){
      if(j%2==0){
        if(i%2==0){
          rect(i*100+offset(),j*100+offset(),100,100);
        }else{
          rect(i*100+offset(),(j+1)*100+offset(),100,100);
        }

      }
    }
  }
}

function offset(){
  if(!ingame){
    return (millis()/20)%100-100;
  }else{
    return 0;
  }

}
