const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
 
class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

const snakeParts = []
let tailLength = 0;

// let tileCount = 20;
let size = 20
let headX = 10;
let headY = 10;

let appleX = 2;
let appleY = 3;

let xVelocity = 0;
let yVelocity = 0;

let width = 500;
let height = 500;

let array = border(width, height)

let check = true;
let score = 0;





function drawGame(check){
    check = CheckPositionSnake(array)
    if(check ==true){
        drawBoard(width,height)
        drawSnake()
        drawApple()
        updateSnakePosition()
        CheckPositionAppleHead()
        setTimeout(drawGame,160)
    }
    
}


function drawBoard(width, height){
    
    canvas.width = width 
    canvas.height = height 
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,width,height)
    ctx.strokeStyle = "grey";
    
    let w = canvas.width ;
    let h = canvas.height ;
    for(var x = -0.5;x<w;x+=size){
        ctx.strokeRect(x,0,0.1,h)
    }
    for(var y = -0.5; y<h;y+=size){
        ctx.strokeRect(0,y,w,0.1)
    }
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    // return canvas.toDataURL();
    for(let i=0;i<=array.length-1;i++){
        for(let j=0;j<=1;j++){
            ctx.fillStyle = 'brown'
            
        }
    }   
    
}

function drawSnake(){

    ctx.fillStyle = 'green'
    ctx.fillRect(headX* size, headY*size, size, size)

    ctx.fillStyle = 'blue'
    for(let i = 0;i<snakeParts.length;i++){
        // console.log(snakeParts)
        let part = snakeParts[i];
        // console.log(part.x, part.y)
        ctx.fillRect(part.x*size, part.y*size, size, size)
    }
    snakeParts.push(new SnakePart(headX,headY))
    // console.log(snakeParts)
    if(snakeParts.length>tailLength){
        snakeParts.shift();
    }
}

function updateApplePosition(){
    appleX = Math.floor(Math.random()*(size-1)+1);
    appleY = Math.floor(Math.random()*(size-1)+1);
    return [appleX, appleY]
}

// x = updateApplePosition()[0];
// console.log(x)

function drawApple(){
    ctx.fillStyle = 'yellow';
    ctx.fillRect(appleX*size, appleY*size, size,size)
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    if(event.code == "KeyW"){
        yVelocity = -1;
        xVelocity = 0;
    }
    if(event.code == "KeyA"){
        yVelocity = 0;
        xVelocity = -1;
    }
    if(event.code == "KeyD"){
        yVelocity = 0;
        xVelocity = 1;
    }
    if(event.code == "KeyS"){
        yVelocity = 1;
        xVelocity = 0;
    }
}

function updateSnakePosition(){
    headX = headX+xVelocity;
    headY = headY+yVelocity;
}

function CheckPositionAppleHead()
{   
    if(headX==appleX && headY==appleY){
        console.log("OK");
        appleX = updateApplePosition()[0];
        appleY = updateApplePosition()[1];
        score++
        Score()
        // document.getElementById("score").innerHTML = score
        tailLength++  

    }
}


function border(width, height){
    let array = []
    for(let i=0;i<=width/size;i++){
        for(let j=0;j<=height/size;j++){
            if(i==0 || j==0){
                array.push([i-1,j-1])
            }
            if(i==width/size-1 || j==height/size-1){
                array.push([i+1,j+1])
            }
        }
    }
    
    return array
    
}

function Score(){
    document.getElementById("score").innerHTML = score
    return score
}

function CheckPositionSnake(array){
    for(let i=0;i<=array.length-1;i++){
        if (headX==array[i][0] && headY==array[i][1]){
            check = false
            return check
        }
    }  
    return true
}

drawGame(check)
