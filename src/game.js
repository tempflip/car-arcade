import {GAMELOOP} from './gameLoop.js';

class Game {
    startTime;
    hPos = 100;
    speed = 10;
    roadPos = 0;
    lastUpsert = 0;

    constructor() {
        this.startTime = Date.now();
    }

    get t() {
        return (Date.now() - this.startTime) / 1000;
    }

    // get roadPos() {
        // return Math.floor(this.t * this.speed);
    // }

    upsertGame() {
        console.log
        let tt = this.t;
        let movedSinceLast = Math.floor((tt - this.lastUpsert) * this.speed);
        this.roadPos = this.roadPos + movedSinceLast;

        console.log('movedSinceLast', movedSinceLast);
        console.log('this.roadPos', this.roadPos);
        this.lastUpsert = tt;
    }

};

const turn = (isRight) => (game) => {
    if (isRight) {
        game.hPos++;
    } else {
        game.hPos--;
    }
}

const speedUp = (isUp) => (game) => {
    if (isUp) {
        game.speed++;
    } else {
        game.speed--;
    }
}

const KEYMAP = {
    'ArrowUp' : speedUp(true),
    'ArrowDown' : speedUp(false),
    'ArrowLeft': turn(false),
    'ArrowRight': turn(true)
}

const main = () => {
    const canvas = document.querySelector('#can');
    const ctx = canvas.getContext('2d');
    let game = new Game();

    console.log('st');
    document.addEventListener('keydown', (ev) => {
        if (!KEYMAP[ev.key]) return;
        KEYMAP[ev.key](game);
    })

    setInterval(GAMELOOP.gameLoop(game, ctx), 100);
}
main();