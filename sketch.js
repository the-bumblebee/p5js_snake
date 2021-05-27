const BLOCK_SIZE = 20;
const DIMEN = 600
const N_BLOCKS = Math.floor(DIMEN / BLOCK_SIZE);
let snake;
let score = 0;
let snakeDirection = {
  x: 1,
  y: 0
};

let food;

function setup() {
  canvas = createCanvas(DIMEN, DIMEN);
  frameRate(12);
  snake = new Snake();
  food = generateCoordinates();
}

function draw() {
  background(22, 33, 62);
  snake.update();
  snake.draw();
  snake.checkCollision();
  snake.setDirection(snakeDirection);
  if (snake.consume(food)) {
    score += 1;
    while (true) {
      let flag = 0;
      food = generateCoordinates();
      for (const block of snake.tail) {
        if (food.x === block.x && food.y === block.y) {
          flag = 1
          break;
        }
      }
      if (flag == 0)
        break;
    }
    console.clear();
    console.log("Score:" + score);
  }
  drawFood(food);
}

function keyPressed() {
  if (keyCode === UP_ARROW && snake.speed.y === 0) 
    // snake.setDirection(0, -1);
    snakeDirection = {
      x: 0,
      y: -1
    }
  else if (keyCode === DOWN_ARROW && snake.speed.y === 0)
    // snake.setDirection(0, 1);
    snakeDirection = {
      x: 0,
      y: 1
    }
  else if (keyCode === RIGHT_ARROW && snake.speed.x === 0)
    // snake.setDirection(1, 0);
    snakeDirection = {
      x: 1,
      y: 0
    }
  else if (keyCode === LEFT_ARROW && snake.speed.x === 0)
    // snake.setDirection(-1, 0);
    snakeDirection = {
      x: -1,
      y: 0
    }
}

function generateCoordinates() {
  const x = floor(random(N_BLOCKS)) * BLOCK_SIZE;
  const y = floor(random(N_BLOCKS)) * BLOCK_SIZE;
  return {x, y};
}

function drawFood(food) {
  fill(0, 200, 0);
  rect(food.x, food.y, BLOCK_SIZE, BLOCK_SIZE);
}

class Snake {

  constructor()  {
    this.tail = [{
      x: 60,
      y: 300
    },
    {
      x: 40,
      y: 300
    },
    {
      x: 20,
      y: 300
    }];

    this.speed = {
      x: 1,
      y: 0
    }
  }

  _helper() {
    let head = {
      x: this.tail[0].x + this.speed.x * BLOCK_SIZE,
      y: this.tail[0].y + this.speed.y * BLOCK_SIZE
    };

    if (head.x >= DIMEN)
      head.x = 0;
    
    if (head.y >= DIMEN)
      head.y = 0;

    if (head.x < 0)
      head.x = (N_BLOCKS - 1) * BLOCK_SIZE;

    if (head.y < 0)
      head.y = (N_BLOCKS - 1) * BLOCK_SIZE;

    this.tail.unshift(head);
  }

  update() {
    this._helper();
    this.tail.pop();
  }

  draw() {
    fill(200);
    for (const block of this.tail)
      rect(block.x, block.y, BLOCK_SIZE, BLOCK_SIZE);
  }

  consume(food) {
    if (this.tail[0].x === food.x && this.tail[0].y === food.y) {
      this._helper();
      return true;
    }
    else
      return false;
  }

  // +ve value reresents down/right
  setDirection(snakeDirection) {
    if (snakeDirection.x !== 0 && this.speed.x === 0)
      this.speed = snakeDirection;
    else if (snakeDirection.y !== 0 && this.speed.y === 0)
      this.speed = snakeDirection;
  }

  checkCollision() {
    for (let i = 1; i < this.tail.length; ++i) {
      if (this.tail[0].x === this.tail[i].x && this.tail[0].y === this.tail[i].y) {
        console.log("GAME OVER!");
        noLoop();
        break;
      }
    }
  }

}