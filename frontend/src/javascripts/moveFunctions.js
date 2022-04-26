import { lsInUse, gameLogic } from '../javascripts/stateStore';
import * as consts from '../javascripts/constants';

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
    passGoH();
};

let passGoH = () => {
    
    let crntPlayer = consts.crntPlayer();
    let gameLogs = consts.gameLogs();
    let gameLog = {log: `${crntPlayer.name} passed Go! Collect $200`, color: consts.logColor()};
    crntPlayer.money += 200;
    // TODO create a seperate function to handle logs
    gameLogs.push(gameLog);
};

let getCrntPropH = () => {

    
    let crntPlayer = consts.crntPlayer();
    let crntPropIndex = gameLogic.value.vueopoly.properties.findIndex((prop) => prop.position == crntPlayer.position)
    let crntProp = gameLogic.value.vueopoly.properties[crntPropIndex];
    return crntProp;
};

export { rollDiceH, movePlayerH, getCrntPropH };