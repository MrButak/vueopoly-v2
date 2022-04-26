import { lsInUse, gameLogic } from '../javascripts/stateStore';

let crntPlayer = () => {return gameLogic.value.players[gameLogic.value.whosTurnIndex]};
let gameLogs = () => {return gameLogic.value.gameLogs};
const logColor = () => {return 'red'}; // for when I make a log function
export { crntPlayer, gameLogs, logColor }