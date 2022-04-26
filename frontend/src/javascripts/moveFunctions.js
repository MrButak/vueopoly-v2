import { lsInUse, gameLogic } from '../javascripts/stateStore';
import * as consts from '../javascripts/constants';
// let crntPlayer = () => {return gameLogic.value.players[gameLogic.value.whosTurnIndex]};
// let gameLogs = () => {return gameLogic.value.gameLogs};

let rollDiceH = () => {
    let diceOne = Math.floor(Math.random() * 6 + 1);
    let diceTwo = Math.floor(Math.random() * 6 + 1);
    return [diceOne, diceTwo];
};

let movePlayerH = (moveCount, prevPosition) => {

    let crntPlayer = consts.crntPlayer();

    if(moveCount + prevPosition < 41) {
        crntPlayer.position += moveCount;
        return;
    };

    crntPlayer.position = moveCount - (40 - crntPlayer.position);
    passGo();
};

let passGo = () => {
    
    let crntPlayer = consts.crntPlayer();
    let gameLogs = consts.gameLogs();

    let gameLog = {log: `${crntPlayer.name} passed Go! Collect $200`, color: consts.logColor()};
    crntPlayer.money += 200;
    gameLogs.push(gameLog);
    console.log(gameLogs);
};

export { rollDiceH, movePlayerH };