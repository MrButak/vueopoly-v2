import { lsInUse, gameLogic } from '../javascripts/stateStore';

let crntPlayer = () => {return gameLogic.value.players[gameLogic.value.whosTurnIndex]};
let gameLogs = () => {return gameLogic.value.gameLogs};
const logColor = () => {return 'red'};
export { crntPlayer, gameLogs, logColor }