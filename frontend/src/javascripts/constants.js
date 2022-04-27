import { lsInUse, gameLogic } from '../javascripts/stateStore';

let crntPlayer = () => {return gameLogic.value.players[gameLogic.value.whosTurnIndex]};
let gameLogs = () => {return gameLogic.value.gameLogs};
let logSpecialCardColor = () => {return 'gold'};
const logColor = () => {return 'red'}; // for when I make a log function
let freeParkingMoney = () => {return 100}
export { crntPlayer, gameLogs, logColor, logSpecialCardColor, freeParkingMoney }