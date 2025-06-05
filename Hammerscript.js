var canvas=document.querySelector('canvas');
var c=canvas.getContext('2d');
function resizecanvas(){
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    centerx=canvas.width/2;
    centery=canvas.height/2;
}
resizecanvas();
window.addEventListener('resize',resizecanvas);
const scoreDisplay=document.getElementById('scoreDisplay');
const restart=document.getElementById('restart');
const radii=350;
const stop=document.getElementById('stop');
let running=true;

let angle=0;
let direction=1;
let animation;
const x=500;
const y=225;
function rotateline(){
    c.clearRect(0,0,canvas.width,canvas.height);
    c.save();
    c.translate(500,200);
    c.rotate(angle);
    c.beginPath();
    c.moveTo(0,0);
    c.lineTo(300,0);
    c.strokeStyle='blue';
    c.lineWidth=3;
    c.stroke();
    c.restore();
    c.beginPath();
    c.arc(500,200,10,0,Math.PI*2,false);
    c.fillStyle='red';
    c.fill();
    c.stroke();
    let angleinDeg=Math.round((angle*180)/Math.PI);
    c.beginPath();
    c.arc(x,y,radii,0,angle,false);
    c.strokeStyle='green';
    c.lineWidth=5;
    c.stroke();
    c.beginPath();
    c.arc(x,y,radii,0,Math.PI,false);
    c.strokeStyle='lightgray';
    c.lineWidth=2;
    c.stroke();
    c.fillStyle='black';
    c.font='16px sans-serif';
    c.fillText(`Angle: ${angleinDeg}`,x-25,y+100);
    angle+=0.005*direction;
    if (angle>=Math.PI || angle<=0){
        direction*=-1;
    }

    animation= requestAnimationFrame(rotateline);
}
rotateline();
stop.addEventListener('click',function(){
    cancelAnimationFrame(animation);

    let angleinDeg=Math.round((angle*180)/Math.PI);
    let diff=Math.abs(angleinDeg-90);
    let score=Math.max(0,Math.round(100-diff));
    scoreDisplay.textContent=`Score: ${score}`;
});
restart.addEventListener('click',function(){
    cancelAnimationFrame(animation);
    angle=0;
    direction=1;
    scoreDisplay.textContent='Score: - ';
    rotateline();
})
