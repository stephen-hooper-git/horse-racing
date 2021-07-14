'use strict';

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

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
        this.x += Math.random() * 10
        this.x = Math.floor(this.x)
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
let numberOfHorses = 5

let colors = ['red', 'orange', 'yellow', 'white', 'blue', 'indigo', 'violet', 'black', 'brown', 'pink', 'azure']

for (let h = 0; h < numberOfHorses; h++) {
    horses[h] = new Horse(colors[h])
}

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

drawAllHoles();
