const canvas = document.querySelector(".snakeGame");
const ctx = canvas.getContext("2d");
const scale = 10;

const rows = canvas.height / scale;
const column = canvas.width / scale;

var snake;

//function to draw fruit 
//let small box represent a fruit in this case
function Fruit() {
    this.x;
    this.y;
  
    this.pickLocation = function() {
      this.x = (Math.floor(Math.random() *
        column - 1) + 1) * scale;
      this.y = (Math.floor(Math.random() *
        rows - 1) + 1) * scale;
    }
  
    this.draw = function() {
      ctx.fillStyle = "white";
      ctx.fillRect(this.x, this.y, scale, scale)
    }
}

//draw snake
function drawSnake(){
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale*1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];


    this.draw = function(){
        ctx.fillStyle='green';  //set color for snake 

        for (let i=0; i<this.tail.length; i++){     //increase length of snake start from tail
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);  
    }

    this.update = function(){       //function for updating the snake

        for (let i=0; i<this.tail.length-1; i++){
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total -1] = {x: this.x, y:this.y};

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x < 0){
            this.x = canvas.width;
        }
        if(this.y < 0){
            this.y = canvas.height;
        }
        if(this.x > canvas.width){
            this.x = 0;
        }
        if(this.y > canvas.height){
            this.x = 0;
        }
    }

    this.changeDirection = function(direction){
        switch(direction){
            case 'Left': 
                this.xSpeed = -scale*1;
                this.ySpeed = 0;
                break;
            case 'Right': 
                this.xSpeed = scale*1;
                this.ySpeed = 0;
                break;
            case 'Up': 
                this.xSpeed = 0;
                this.ySpeed = -scale*1;
                break;
            case 'Down': 
                this.xSpeed = 0;
                this.ySpeed = scale*1;
                break;
        }
    }

    //function inscrease size of snake
    this.eat = function(fruit){
        if(this.x == fruit.x && this.y == fruit.y){
            this.total++;
            return true;
        }
        return false
    }

    //function for check collision and end game 
    this.checkCollision= function(){
        for(var i=0; i<this.tail.length; i++){
            if(this.x == this.tail[i].x && this.y == this.tail[i].y){
                this.total = 0;
                this.tail=[];
                alert('You lost and Press OK to continue the playing')
            }
        }
    }
}

(function setup(){
    snake = new drawSnake();
    fruit = new Fruit();

    fruit.pickLocation();

    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        fruit.draw();
        snake.update();
        snake.draw();

        //improve performance of snake 
        //if snake touch the box it will increase size
        if(snake.eat(fruit)){
            fruit.pickLocation();
        }
        snake.checkCollision();     //will end game after snake collision
        document.querySelector('.score').innerHTML = snake.total;
    }, 250);
}());

//use keyboard to control the performance
window.addEventListener('keydown', ((evt) => {
    console.log(evt);
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction)
}))
