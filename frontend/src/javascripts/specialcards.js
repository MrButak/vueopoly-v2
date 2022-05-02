import { lsInUse, gameLogic } from './stateStore';
import * as consts from './constants';
import * as gameFunctions from './gameFunctions'

let drawSpecialCardH = (type) => {
    let deck = gameLogic.value.vueopoly[`${type}`];
    if(deck.length < 1) {return;} // handle empty deck

    let cardIndex = Math.floor(Math.random() * deck.length);
    return deck[cardIndex];
};

let streetRepairsCostH = (specialCard) => { // x amount for house, x amount for motel
    
    let crntPlayer = consts.crntPlayer();
    let houseCharges = specialCard.buildings;
    let hotelCharges = specialCard.hotels;
    let housesOwned = 0;
    let hotelsOwned = 0;
    let totalRepairCost = 0;

    for(let i = 0; i < crntPlayer.properties.length; i++) {
        if(crntPlayer.properties[i].buildings < 1) {continue};
        if(crntPlayer.properties[i].buildings < 5) {housesOwned += crntPlayer.properties[i].buildings};
        if(crntPlayer.properties[i].buildings > 4) {hotelsOwned += 1};
    };
    totalRepairCost += (housesOwned * houseCharges) + (hotelsOwned * hotelCharges);
    return totalRepairCost;
};

let removeFundsToPlayersH = (amountPerPlayer) => {

    let crntPlayer = consts.crntPlayer();

    for(let i = 0; i < gameLogic.value.players.length; i++) {
        if(gameLogic.value.players[i].name == crntPlayer.name) {continue};
        gameLogic.value.players[i].money += amountPerPlayer;
    };
};

let keepJailCardH = (type) => {
    let crntPlayer = consts.crntPlayer();
};
// addFundsFromPlayersH

export { drawSpecialCardH, streetRepairsCostH, removeFundsToPlayersH, keepJailCardH }
