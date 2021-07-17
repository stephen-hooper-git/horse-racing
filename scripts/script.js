'use strict';

// Set an external flag to allow animations to continue
let continueAnimating = true;

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Starting point for ball
let x = canvas.width / 2;
let y = canvas.height - 30;

let ballRadius = 10; // 10

// add a small value to x and y after every frame has been drawn
// to make it appear that the ball is moving
let dx = 10;
//let dy = -13;
let dy = -10;

//let gravity = 0.2;
let gravity = 0;

let holeRadius = 20;

let column1 = canvas.width / 9 * 2 - holeRadius
let column2 = canvas.width / 9 * 3 - holeRadius
let column3 = canvas.width / 9 * 4 - holeRadius
let column4 = canvas.width / 9 * 5 - holeRadius
let column5 = canvas.width / 9 * 6 - holeRadius
let column6 = canvas.width / 9 * 7 - holeRadius
let column7 = canvas.width / 9 * 8 - holeRadius

let row1 = canvas.height / 15
let row2 = canvas.height / 6
let row3 = canvas.height / 4
let row4 = canvas.height / 3
let row5 = canvas.height / 2.4
let row6 = canvas.height / 2

class Horse {
    constructor(colour) {
        this.colour = colour
        this.box = document.createElement("div")
        this.box.style = 'width:100px;height:100px;position:relative'
        document.getElementById('track').appendChild(this.box)
        this.box.style.backgroundColor = colour
        this.x = 0
    }
    move() {
        // this.x += Math.random() * 10
        this.x += Math.random() * 2
        this.x = Math.floor(this.x)
        this.box.style.left = this.x + "px"
        if (this.x > 800) { winner = this }
    }
    moveHorseWithBall(distance) {
        // this.x += Math.random() * 10
        // this.x = Math.floor(this.x)
        this.x += distance
        this.box.style.left = this.x + "px"
        if (this.x > 800) { winner = this }
    }
}

class Player {
    constructor(colour) {
        this.colour = colour
        this.box = document.createElement("div")
        this.box.style = 'width:100px;height:100px;position:relative'
        document.getElementById('track').appendChild(this.box)
        this.box.style.backgroundColor = colour
        this.box.style.color = 'white'
        this.box.innerHTML = 'PLAYER 1'
        this.x = 0
    }
    //move() {
    //    this.x += Math.random() * 10
    //    this.x = Math.floor(this.x)
    //    this.box.style.left = this.x + "px"
    //    if (this.x > 800) { winner = this }
    //}
    movePlayerWithBall(distance) {
        // this.x += Math.random() * 10
        // this.x = Math.floor(this.x)
        this.x += distance
        this.box.style.left = this.x + "px"
        if (this.x > 800) { winner = this }
    }
}

class Hole {
    constructor(width, x, y, fill, stroke) {
        this.width = width;
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.stroke = stroke;
    }

    drawHole() {
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.arc(this.x, this.y, holeRadius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.fill;
        ctx.fill();
        ctx.strokeStyle = this.stroke;
        ctx.stroke();
        ctx.closePath();
    }
}

const allHoles = [
    new Hole(7, column1, row1, 'black', 'dodgerblue'),
    new Hole(7, column4, row1, 'black', 'red'),
    new Hole(7, column7, row1, 'black', 'dodgerblue'),
    new Hole(7, column2, row2, 'black', 'dodgerblue'),
    new Hole(7, column4, row2, 'black', 'red'),
    new Hole(7, column6, row2, 'black', 'dodgerblue'),
    new Hole(7, column1, row3, 'black', 'yellow'),
    new Hole(7, column3, row3, 'black', 'dodgerblue'),
    new Hole(7, column5, row3, 'black', 'dodgerblue'),
    new Hole(7, column7, row3, 'black', 'yellow'),
    new Hole(7, column2, row4, 'black', 'yellow'),
    new Hole(7, column4, row4, 'black', 'dodgerblue'),
    new Hole(7, column6, row4, 'black', 'yellow'),
    new Hole(7, column3, row5, 'black', 'yellow'),
    new Hole(7, column5, row5, 'black', 'yellow'),
    new Hole(7, column4, row6, 'black', 'yellow')
];

let horses = []
let winner = null
let numberOfHorses = 4

let colors = ['red', 'orange', 'yellow', 'blue', 'white', 'indigo', 'violet', 'black', 'brown', 'pink', 'azure']

for (let h = 0; h < numberOfHorses; h++) {
    horses[h] = new Horse(colors[h])
}

let player1 = new Player(colors[7])

function start() {
    //setInterval (moveBox,50)
    requestAnimationFrame(moveHorses)
}

function moveHorses() {
    for (let h of horses) {
        h.move()
    }
    if (winner === null) {
        requestAnimationFrame(moveHorses)
    }
    else {
        alert(`The winner is ${winner.colour}`)
    }
    /*
    if(x<900){
        requestAnimationFrame(moveHorses)
    } 
    */
}

function drawAllHoles() {
    for (let i = 0; i < allHoles.length; i++) {
        allHoles[i].drawHole();
    }
}

function drawBall() {
    // Draw ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function pythag(x1, y1, x2, y2) {

    let a = x1 - x2;
    let b = y1 - y2;

    let answer = Math.sqrt(a * a + b * b);

    return answer
}

function collisionDetection() {

    for (let i = 0; i < allHoles.length; i++) {

        // if (pythag(x + -dx, y + -dy, allHoles[i].x, allHoles[i].y) === 0) {
        if (pythag(x + -dx, y + -dy, allHoles[i].x, allHoles[i].y) < 5) {
            // alert(allHoles[i].stroke)

            if (allHoles[i].stroke === 'yellow') {
                console.log('Move 10px')
                for (let h of horses) {
                    player1.movePlayerWithBall(25)
                }
                if (winner != null) {
                    alert(`The winner is ${winner.colour}`)
                }
            }

            if (allHoles[i].stroke === 'dodgerblue') {
                console.log('Move 20px')
                for (let h of horses) {
                    player1.movePlayerWithBall(50)
                }
                if (winner != null) {
                    alert(`The winner is ${winner.colour}`)
                }
            }

            if (allHoles[i].stroke === 'red') {
                console.log('Move 30px')
                for (let h of horses) {
                    player1.movePlayerWithBall(75)
                }
                if (winner != null) {
                    alert(`The winner is ${winner.colour}`)
                }
            }






            resetTable()
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    // clear canvas content so ball does not leave a trail
    clearCanvas()

    drawAllHoles();
    drawBall();
    collisionDetection();

    // Bounce off the left and right wall (reverse the movement of the ball)
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    // Bounce off the top and bottom wall (reverse the movement of the ball)
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    dy = dy + gravity;

    // update x and y with the dx and dy variables on every frame
    // so the ball will be painted in the new position on every update
    x += dx;
    y += dy;

    if (continueAnimating) {
        // when continueAnimating is false, this new
        // request will not occur and animation stops
        requestAnimationFrame(draw);
    }
}

let throwButton = document.getElementById("throw")

// let angle = -1;
let angle = -11;

let angleIncrement = 1;

let countUp = true;

let startCounter = setInterval(angleCounter, 200);

function angleCounter() {

    if (countUp) {
        angle += angleIncrement;
    } else {
        angle -= angleIncrement;
    }


    if (angle === 10) {
        countUp = false
    } else if (angle === -10) {
        countUp = true
    }

    throwButton.innerText = angle;

}

function throwBall() {
    continueAnimating = true;
    clearInterval(startCounter);
    console.log(angle)
    dy = -16
    dx = angle
    gravity = 0.2
    //draw()
    requestAnimationFrame(draw)
}

function resetTable() {
    clearCanvas()
    drawAllHoles()


    x = canvas.width / 2;
    y = canvas.height - 30;

    drawBall()

    dy = 0
    dx = 0

    // globalID = requestAnimationFrame(draw);
    // cancelAnimationFrame(globalID)

    // To turn off animation
    continueAnimating = false;
    startCounter = setInterval(angleCounter, 200);


}

drawAllHoles();
// draw();
