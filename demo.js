var conten = document.getElementById('content');
var startPage = document.getElementById('startPage');
var start = document.getElementById('start');
var  img =document.getElementById('img');
var loser =document.getElementById('loser');
var loserScore =document.getElementById('loserScore');
var close =document.getElementById('close');
var score = document.getElementById('score-span');
var num = 0;
var snakeMove;//定时器
var speed = 200;//速度
window.onload=function () {

    start.onclick = function () {
        startPage.style.display = 'none';
        init();
        img.src = "img/pause.png";
        score.innerHTML="0";
    }//start
    img.onclick = function () {
        var a = img.src.substr(img.src.length-5);
        img.src = a =="e.png"?"img/start.png":"img/pause.png";
        console.log(a);
        if(a=="e.png"){
            clearInterval(snakeMove);
        }
        else {
            snakeMove = setInterval((()=>{
            move()
        }),speed)

        }
    }//img
    close.onclick=function () {
        loser.style.display='none';
        img.src = "img/start.png";
        startPage.style.display = 'block'
    }//close
}
function init() {
    //地图
    this.napW =parseInt(getComputedStyle(content).width);
    this.napH =parseInt(getComputedStyle(content).height);
    this.mapDiv = content;
    //食物
    this.foodW = 20;
    this.foodH = 20;
    this.foodX = 0;
    this.foodY = 0;
    //蛇
    this.snakeW = 20;
    this.snakeH = 20;
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
    //游戏属性
    this.direct = 'right';//默认方向
    this.left = false;
    this.right =false;
    this.up = true;
    this.down = true;

    startGame();
}
function startGame() {
    food();
    snake();
    snakeMove = setInterval((()=>{
        move()
    }),speed)
    bindEvent();
}
function food() {
    var food = document.createElement('div');
    food.style.width = this.foodW + 'px' ;
    food.style.height = this.foodH + 'px' ;
    food.style.position = 'absolute';
    this.foodX = Math.floor( Math.random() * (this.napW/20 -1));
    this.foodY = Math.floor( Math.random() * (this.napH/20 -1));
    food.style.left = this.foodX * 20 + 'px';
    food.style.top = this.foodY * 20 + 'px';
    this.mapDiv.appendChild(food).setAttribute('class','food');
}
function snake() {
    for (var i=0;i<this.snakeBody.length;i++){
        var snake = document.createElement('div');
        snake.style.height = this.snakeH + 'px';
        snake.style.width = this.snakeW + 'px';
        snake.style.position = "absolute" ;
        snake.style.left = this.snakeBody[i][0] * 20 +'px';
        snake.style.top = this.snakeBody[i][1] * 20 +'px';
        snake.classList.add(this.snakeBody[i][2]);
        if(this.snakeBody[i][2]=='head'){
            if(this.direct=="left"){
                snake.style.transform="rotate(180deg)"
            }
            if(this.direct=="down"){
                snake.style.transform="rotate(90deg)"
            }
            if(this.direct=="right"){
                snake.style.transform="rotate(0)"
            }
            if(this.direct=="up"){
                snake.style.transform="rotate(-90deg)"
            }
        }
        this.mapDiv.appendChild(snake).classList.add('snake')
    }
}
function move() {
    for( var i = this.snakeBody.length-1;i>0;i--){
         this.snakeBody[i][0] = this.snakeBody[i-1][0];
         this.snakeBody[i][1] = this.snakeBody[i-1][1];
    }
    switch (this.direct) {
        case 'right': this.snakeBody[0][0]+=1;break;
        case 'left': this.snakeBody[0][0]-=1;break;
        case 'up': this.snakeBody[0][1]-=1;break;
        case 'down': this.snakeBody[0][1]+=1;break;

    }
    if(this.foodX == this.snakeBody[0][0] && this.foodY == this.snakeBody[0][1]){
       var snakeEndX = this.snakeBody[this.snakeBody.length -1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length -1][1];
        switch (this.direct) {
            case 'right': this.snakeBody.push([snakeEndX + 1,snakeEndY,'body']);break;
            case 'left': this.snakeBody.push([snakeEndX - 1,snakeEndY,'body']);break;
            case 'up': this.snakeBody.push([snakeEndX ,snakeEndY - 1,'body'] );break;
            case 'down': this.snakeBody.push([snakeEndX ,snakeEndY + 1,'body']);break;

        }




        num += 1;
         score.innerHTML = num;
        removeClass('food');
        food();
    }
    if( this.snakeBody[0][0] < 0 || this.snakeBody[0][1] < 0 || this.snakeBody[0][0] >this.napW/20 - 1 || this.snakeBody[0][1] >this.napH/20 - 1){
        console.log("游戏结束");
        loser.style.display='block';
        removeClass('food');
        removeClass('snake');
        clearInterval(snakeMove);
        loserScore.innerHTML = num ;
        return;

    }
    var  snakeHX = this.snakeBody[0][0];
    var  snakeHY = this.snakeBody[0][1];
    for(var i = this.snakeBody.length -1;i>0;i--){
        if(this.snakeBody[i][0] == snakeHX && this.snakeBody[i][1] == snakeHY) {
            console.log("游戏结束")
            loser.style.display='block';
            clearInterval(snakeMove);
            removeClass('food');
            removeClass('snake');
            loserScore.innerHTML = num ;
            return;
        }
    }
    removeClass('snake');
    snake();

}
function removeClass(ClassName) {
    var ele =document.getElementsByClassName(ClassName);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
    
}
function bindEvent() {
    document.onkeydown = function (e) {
        var code = e.keyCode;
        setDerict(code);
        if (code == 32 || code ==13 || code==108){
                var a = img.src.substr(img.src.length-5);
                img.src = a =="e.png"?"img/start.png":"img/pause.png";
                console.log(a);
                if(a=="e.png"){
                    clearInterval(snakeMove);
                }
                else {
                    snakeMove = setInterval((()=>{
                        move()
                    }),speed)

            }
        }
        }
}
function  setDerict(code) {
    switch (code) {
        case 37: if(this.left){
            this.direct = 'left';
            this.left = false ;
            this.right = false;
            this.up = true;
            this.down = true;}
            break;
        case 38: if(this.up){
            this.direct = 'up';
            this.left = true ;
            this.right = true;
                this.up = false;
            this.down = false;}
            break;
        case 39: if(this.right){
            this.direct = 'right';
            this.left = false ;
            this.right = false;
            this.up = true;
            this.down = true;}
            break;
        case 40:
            if(this.down){
            this.direct = 'down';
            this.left = true ;
            this.right = true;
            this.up = false;
            this.down = false;}
            break;
    }

}