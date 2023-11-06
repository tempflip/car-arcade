const XMAX = 320;
const YMAX = 200;

const BASE_Y = 150;

const gameLoop = (game, ctx) => () => {
    game.upsertGame();

    // console.log('sp', game.speed);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, XMAX, YMAX);

    drawLanes(game, ctx);
    drawCar(game, ctx);
    drawNumbers(game, ctx);

    game.otherCars.forEach(car => {
        ctx.fillStyle = 'blue';
        let diffToPlayer = car.roadPos - game.player.roadPos;
        ctx.fillRect(car.hPos, BASE_Y - diffToPlayer, 10, 10);            
    });
}

const drawLanes = (game, ctx) => {
    const markerSize = 50;
    for (let i  = -2; i <= YMAX / markerSize; i ++) {
        let leftEnd = 30;
        let rightEnd = 200;
        ctx.fillStyle = (i) % 2 == 0 ? 'red' : 'white';

        let yStart = i*markerSize +(game.player.roadPos % (markerSize*2));
        ctx.fillRect(leftEnd, yStart, 20, markerSize);
        ctx.fillRect(rightEnd, yStart, 20, 20);

    }
}

const drawCar = (game, ctx) => {
    ctx.fillStyle = 'pink';
    ctx.fillRect(game.player.hPos, BASE_Y, 10, 10);
}

const drawNumbers = (game, ctx) => {
    ctx.fillStyle = 'violet';
    ctx.font = '10px monospace';
    ctx.fillText(`SPEED : ${game.player.speed}`, 20, 20);
    ctx.fillText(`POS : ${game.player.roadPos}`, 200, 20);

}

export const GAMELOOP = {
    gameLoop : gameLoop
}