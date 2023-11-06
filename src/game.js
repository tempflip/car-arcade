import { GAMELOOP } from './gameLoop.js';

class Car {
    hPos = 100;
    speed = 10;
    roadPos = 0;
    turnSpeed = 1;  
    
    upsert(currentT, previousT) {
        let movedSinceLast = Math.floor((currentT - previousT) * this.speed);
        console.log('##', currentT,previousT, movedSinceLast);
        this.roadPos = this.roadPos + movedSinceLast;
    }
}

class Game {
    startTime;
    player;
    lastUpsert = 0;

    otherCars = [];

    constructor() {
        this.startTime = Date.now();
        this.player = new Car();

        let oc = new Car();
        oc.roadPos = 150;
        oc.speed = 9;
        oc.hPos = 150;

        this.otherCars.push(oc);
    }

    get t() {
        return (Date.now() - this.startTime) / 1000;
    }

    // get roadPos() {
    // return Math.floor(this.t * this.speed);
    // }

    turn(isRight) {
        if (isRight) {
            this.player.hPos = Math.floor(this.player.hPos + this.player.turnSpeed);
        } else {
            this.player.hPos = Math.floor(this.player.hPos - this.player.turnSpeed);
        }
        this.player.turnSpeed = this.player.turnSpeed * 1.03;
    }

    resetTurn() {
        this.player.turnSpeed = 1;
    }

    upsertGame() {
        let tt = this.t;
        this.player.upsert(tt, this.lastUpsert);
        this.otherCars.forEach(car => {
            car.upsert(tt, this.lastUpsert);
        });
        this.lastUpsert = tt;
    }

    speedUp(isUp) {
        if (isUp) {
            this.player.speed++;
        } else {
            this.player.speed--;
        }
    }


};

const turn = (isRight) => (game) => {
    game.turn(isRight)
}

const speedUp = (isUp) => (game) => {
    game.speedUp(isUp);
}

const KEYMAP = {
    'ArrowUp': speedUp(true),
    'ArrowDown': speedUp(false),
    'ArrowLeft': turn(false),
    'ArrowRight': turn(true)
}

const main = () => {
    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');
    let game = new Game();

    document.addEventListener('keydown', (ev) => {
        if (!KEYMAP[ev.key]) return;
        KEYMAP[ev.key](game);
    })
    document.addEventListener('keyup', (ev) => {
        game.resetTurn();
    });

    setInterval(GAMELOOP.gameLoop(game, ctx), 300);
}
main();