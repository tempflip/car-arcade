import { XMAX, YMAX } from './const.js';

export class GameLoop {
    game;
    ctx;
    interval;

    constructor(game, ctx) {
        this.game = game;
        this.ctx = ctx;
        console.log('hello!!!', this);
    }

    passInterval(interval) {
        this.interval = interval;
    }

    gameLoop() {
        this.game.upsertGame();

        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, XMAX, YMAX);

        drawLanes(this.game, this.ctx);
        this.game.staticEntities.forEach(el => {
            el.draw(this.game, this.ctx);
        });

        this.game.player.draw(this.game, this.ctx);
        this.game.otherCars.forEach(car => {
            car.draw(this.game, this.ctx);
        });

        drawNumbers(this.game, this.ctx);

        if (this.evalWin()) {
            clearInterval(this.interval);
            console.log('ah sooooo!');
        }

    }

    evalWin() {
        return this.game.evalWin();
    }
    
}


const drawLanes = (game, ctx) => {
    const markerSize = 50;
    for (let i = -2; i <= YMAX / markerSize; i++) {
        let leftEnd = 30;
        let rightEnd = 200;
        ctx.fillStyle = (i) % 2 == 0 ? 'red' : 'white';

        let yStart = i * markerSize + (game.player.roadPos % (markerSize * 2));
        ctx.fillRect(leftEnd, yStart, 20, markerSize);
        ctx.fillRect(rightEnd, yStart, 20, 20);

    }
}

const drawNumbers = (game, ctx) => {
    ctx.fillStyle = 'violet';
    ctx.font = '10px monospace';
    ctx.fillText(`SPEED : ${game.player.speed}`, 20, 20);
    ctx.fillText(`POS : ${game.player.roadPos}`, 200, 20);

}