song="";
lw_x="";
rw_x="";
lw_y="";
rw_y="";

function preload()
{
song=loadSound("HP.mp3");
}

function setup()
{
canvas=createCanvas(500,400);
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

function draw()
{
image(video,0,0,500,400);
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
    }
}