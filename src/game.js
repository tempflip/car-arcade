import { GameLoop } from './gameLoop.js';
import { PlayerCar, OtherCar, StartStripe, FinishStripe } from './entities.js';

class Game {
    startTime;
    player;
    lastUpsert = 0;

    otherCars = [];
    staticEntities = [];
    winEntity;

    constructor() {
        this.startTime = Date.now();
        this.player = new PlayerCar();
        let finishStripe = new FinishStripe(100);

        this.staticEntities.push(new StartStripe());
        this.staticEntities.push(finishStripe);
        this.winEntity = finishStripe;


        let oc1 = new OtherCar();
        oc1.roadPos = 150;
        oc1.speed = 9;
        oc1.hPos = 150;

        let oc2 = new OtherCar();
        oc2.roadPos = 300;
        oc2.speed = 11;
        oc2.hPos = 100;

        this.otherCars.push(oc1);
        this.otherCars.push(oc2);
    }

    get t() {
        return (Date.now() - this.startTime) / 1000;
    }

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

    evalWin() {
        return this.winEntity.evalWin(this);
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
    let gameLoop = new GameLoop(game, ctx);

    document.addEventListener('keydown', (ev) => {
        if (!KEYMAP[ev.key]) return;
        KEYMAP[ev.key](game);
    })
    document.addEventListener('keyup', (ev) => {
        game.resetTurn();
    });

    let gameInterval = setInterval(()=>{ gameLoop.gameLoop(); }, 100);
    gameLoop.passInterval(gameInterval);


    // if (GAMELOOP.evalWin(game)) {
    //     clearInterval(gameInterval);
    //     console.log("%%@$@$@DSD im won");
    // }
    
}
main();