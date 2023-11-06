const XMAX = 320;
const YMAX = 200;


const gameLoop = (game, ctx) => () => {
    game.upsertGame();

    console.log('sp', game.speed);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, XMAX, YMAX);

    drawLanes(game, ctx);
    drawCar(game, ctx);

}

const drawLanes = (game, ctx) => {
    const markerSize = 50;
    for (let i  = -2; i <= YMAX / markerSize; i ++) {
        let leftEnd = 30;
        let rightEnd = 200;
        ctx.fillStyle = (i) % 2 == 0 ? 'red' : 'white';

        let yStart = i*markerSize +(game.roadPos % (markerSize*2));
        ctx.fillRect(leftEnd, yStart, 20, markerSize);
        ctx.fillRect(rightEnd, yStart, 20, 20);

    }
}

const drawCar = (game, ctx) => {
    ctx.fillStyle = 'pink';
    ctx.fillRect(game.hPos, 100, 10, 10);
}

export const GAMELOOP = {
    gameLoop : gameLoop
}