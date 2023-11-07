import { XMAX, BASE_Y } from './const.js';

class AbstractEntity {
    hPos = 100;
    roadPos = 0;
    toDraw(game) {
        return this.drawYPos(game) > 0;
    }

    draw(game, ctx) {
        if (!this.toDraw(game)) return;
        this.drawOnCanvas(game, ctx);
    }
}


export class PlayerCar extends AbstractEntity {
    speed = 0;
    turnSpeed = 1;

    upsert(currentT, previousT) {
        let movedSinceLast = Math.floor((currentT - previousT) * this.speed);
        this.roadPos = this.roadPos + movedSinceLast;
    }

    drawYPos(game) {
        return BASE_Y;
    }

    drawOnCanvas(game, ctx) {
        ctx.fillStyle = 'pink';
        ctx.fillRect(this.hPos, this.drawYPos(game), 10, 10);
    }
}

export class OtherCar extends PlayerCar {

    drawYPos(game) {
        let diffToPlayer = this.roadPos - game.player.roadPos;
        return BASE_Y - diffToPlayer;
    }

    drawOnCanvas(game, ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.hPos, this.drawYPos(game), 10, 10);
    }
}

export class StartStripe extends AbstractEntity {
    roadPos = 30;
    color1 = 'beige';
    color2 = 'chartreuse';

    drawYPos(game) {
        let diffToPlayer = this.roadPos - game.player.roadPos;
        return BASE_Y - diffToPlayer;
    }

    drawOnCanvas(game, ctx) {
        let BOXSIZE = 5;
        let START = 50;
        let END = 50;
        let LENGTH = XMAX - START - END;

        for (let j = 0; j < 4; j++) {
            for (let i = 0; i < LENGTH / BOXSIZE; i++) {
                ctx.fillStyle = ((i+j) % 2) == 1 ? this.color1 : this.color2;
                ctx.fillRect(START + i * BOXSIZE, j*BOXSIZE + this.drawYPos(game), BOXSIZE, BOXSIZE);
            }
        }
    }
}

export class FinishStripe extends StartStripe {

    constructor(roadPos) {
        super();
        this.roadPos = roadPos;
        this.color1 = 'gold';
        this.color2 = 'fuchsia';
    }

    evalWin(game) {
        return game.player.roadPos > this.roadPos;
    }

}



