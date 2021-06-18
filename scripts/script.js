'use strict';

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

let horses = []
let winner = null

let colors = ['red', 'orange', 'yellow', 'white', 'blue', 'indigo', 'violet', 'black', 'brown', 'pink', 'azure']

for (let h = 0; h < 8; h++) {
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
