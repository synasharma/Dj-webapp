song="";
lw_x="";
rw_x="";
lw_y="";
rw_y="";
lw_score="";
rw_score="";
function preload()
{
song=loadSound("HP.mp3");
}

function setup()
{
canvas=createCanvas(600,500);
canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',getPoses);
}

function modelLoaded()
{
    console.log("Posenet is intialized!");
}

function play()
{
    song.play();
    song.setVolume(1); //Volume ranges from 0-1//
    song.rate(1); //Rate changes between 0.5,1 (Normal),1.5,2,2.5//
}

function stop()
{
    song.stop();
}

function pause()
{
    song.pause();
}

function getPoses(result)
{
    if (result.length>0)
    {
        console.log(result);
        lw_x=result[0].pose.leftWrist.x;
        rw_x=result[0].pose.rightWrist.x;
        lw_y=result[0].pose.leftWrist.y;
        rw_y=result[0].pose.rightWrist.y;
        console.log("left Wrist x value: "+lw_x);
        console.log("left Wrist y value: "+lw_y);
        console.log("right Wrist x value: "+rw_x);
        console.log("right Wrist y value: "+rw_y);
        lw_score=result[0].pose.keypoints[9].score;
        console.log("lw_score is: ",lw_score);
        rw_score=result[0].pose.keypoints[10].score;
        console.log("rw_score is: ",rw_score);
    }
}

function draw()
{
image(video,0,0,600,500);
fill('blue');
stroke('black');
if (lw_score>0.2)
{
    circle(lw_x,lw_y,20);
    removeDecimals=floor(lw_y);
    console.log(removeDecimals);
    volume=removeDecimals/500;
    console.log("volume: ",volume);
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume: " + volume;
}
if(rw_score>0.2)

{
    circle(rw_x,rw_y,20);
    if(rw_y>0 && rw_y<100) //range 1(0-100)//
    {
    song.rate(0.5);
    document.getElementById("speed").innerHTML="Speed: 0.5x";
    }

    else if(rw_y>100 && rw_y<200) //range 2(100-200)//
    {
    song.rate(1);
    document.getElementById("speed").innerHTML="Speed: 1x";
    }

    else if(rw_y>200 && rw_y<300) //range 3(200-300)//
    {
    song.rate(1.5);
    document.getElementById("speed").innerHTML="Speed: 1.5x";
    }

    else if(rw_y>300 && rw_y<400) //range 4(300-400)//
    {
    song.rate(2);
    document.getElementById("speed").innerHTML="Speed: 2x";
    }

    else if(rw_y>400 && rw_y<500) //range 5(400-500)//
    {
    song.rate(2.5);
    document.getElementById("speed").innerHTML="Speed: 2.5x";
    }
}
}

