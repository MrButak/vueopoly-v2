import { lsInUse, gameLogic } from './stateStore';
import * as consts from './constants';
import * as gameFunctions from './gameFunctions'

let drawSpecialCardH = (type) => { // CURRENTLY DEBUGGING!!
    
    let discardDeck = '';
    let deck = gameLogic.value.vueopoly[`${type}`]; // chance or community chest
    
    if(type == 'chance') {discardDeck = 'usedChance';} else{discardDeck = 'usedCommunityChest';};

    if(deck.length < 1) {console.log('empty deck. reshuffle!'); return;} // handle empty deck

    let cardIndex = Math.floor(Math.random() * deck.length);

    // place card in used deck array
    gameLogic.value[`${discardDeck}`].push(deck[cardIndex]);
    
    // remove card from deck
    gameLogic.value.vueopoly[`${type}`].splice(cardIndex, 1);
    
    // returning the card that was pushed to the used deck array
    return gameLogic.value[`${discardDeck}`][gameLogic.value[`${discardDeck}`].length - 1];
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

let keepJailCardH = (card, type) => {

    let discardDeck = '';
    if(type == 'chance') {discardDeck = 'usedChance';} else{discardDeck = 'usedCommunityChest';};

    // add card to players special card array
    let crntPlayer = consts.crntPlayer();
    crntPlayer.specialCards.push(card);
    
    // remove card from the discard deck
    let usedCardIndex = gameLogic.value[`${discardDeck}`].findIndex((crd => crd.title == card.title));
    gameLogic.value[`${discardDeck}`].splice(usedCardIndex, 1);
};
// addFundsFromPlayersH

export { drawSpecialCardH, streetRepairsCostH, removeFundsToPlayersH, keepJailCardH }
