import { lsInUse, gameLogic, turnLogic } from './stateStore';
import * as consts from './constants';
import * as gameFunctions from './gameFunctions';
import * as moveFunctions from './moveFunctions';
import * as propertyAction from './propertyAction';
import * as propertyFunctions from './propertyFunctions';

let drawSpecialCardH = (type) => {
    
    let discardDeck = '';
    let deck = gameLogic.value.vueopoly[`${type}`]; // chance or community chest
    
    if(type == 'chance') {discardDeck = 'usedChance';} else{discardDeck = 'usedCommunityChest';};

    if(deck.length < 1) {console.log('empty deck. reshuffle!'); return;} // TODO handle empty deck

    let cardIndex = Math.floor(Math.random() * deck.length);

    // place card in used deck array
    gameLogic.value[`${discardDeck}`].push(deck[cardIndex]);
    
    // remove card from deck
    gameLogic.value.vueopoly[`${type}`].splice(cardIndex, 1);
    
    // returning card that was pushed to the used deck array
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


// for special card "movenearest"
let moveNearestSpecialH = (groupId) => { // railroad, utility

    let totalDiceRoll = turnLogic.value.crntDiceRoll[0] + turnLogic.value.crntDiceRoll[1];
    let crntPlayer = consts.crntPlayer();
    // chance 8, 23, 37 
    // commchest 3, 18, 34
    // rr 6, 16, 26, 36
    // utilities 13, 29

    let checkIfOwned = (propertyId) => {

        if(!propertyAction.isPropOwnedH(propertyFunctions.getPropFromIdH(propertyId))) {
            turnLogic.value.buyAvailable = true;
            turnLogic.value.canEndTurn = true;
            return false;
        };
        return true;
    };

    let calculateTotalCost = (propertyGroup, propertyId) => {

        turnLogic.value.propertyLandedOn = moveFunctions.getCrntPropH(); // add crntproperty to state
        if(propertyGroup === 'railroad') { // railroad
            
            return propertyAction.getTotalRentCostH(propertyFunctions.getPropFromIdH(propertyId)) * 2;// function accepts a property object
        };
        return totalDiceRoll * .1;
    };

    switch(groupId) {

        case 'railroad':

            switch(true) {

                case crntPlayer.position < 6 || crntPlayer.position > 36:// move to 6
                
                    moveFunctions.moveToPropertyH('readingrailroad');
                    // get property obj, then determine if property is owned
                    if(!checkIfOwned('readingrailroad')) {return 0;};
                    return calculateTotalCost('railroad', 'readingrailroad');
                
                case crntPlayer.position > 6 && crntPlayer.position < 16:// move to 16
                    moveFunctions.moveToPropertyH('pennsylvaniarailroad');
                    if(!checkIfOwned('pennsylvaniarailroad')) {return 0;};
                    return calculateTotalCost('railroad', 'pennsylvaniarailroad');
                    
                case crntPlayer.position > 16 && crntPlayer.position < 26:// move to 26
                    moveFunctions.moveToPropertyH('borailroad');
                    if(!checkIfOwned('borailroad')) {return 0;};
                    return calculateTotalCost('railroad', 'borailroad');
                    
                case crntPlayer.position > 26 && crntPlayer.position < 36:// move to 36
                    moveFunctions.moveToPropertyH('shortlinerailroad');
                    if(!checkIfOwned('shortlinerailroad')) {return 0;};
                    return calculateTotalCost('railroad', 'shortlinerailroad');     
            };
            break;

        case 'utility':

            switch(true) {

                case crntPlayer.position < 13 || crntPlayer.position > 29:
                    moveFunctions.moveToPropertyH('electriccompany');
                    if(!checkIfOwned('electriccompany')) {return 0;};
                    return calculateTotalCost('utilities', 'electriccompany');
                    // move to 13
                case crntPlayer.position > 13 && crntPlayer.position < 29:

                    moveFunctions.moveToPropertyH('waterworks');
                    if(!checkIfOwned('waterworks')) {return 0;};
                    return calculateTotalCost('utilities', 'waterworks');
                    // move to 29
            };
    }

    // propertyAction.isPropOwnedH(propertyObj) js
    // proptertyAction.getTotalRentCostH(property, diceRoll) js
}

export { drawSpecialCardH, streetRepairsCostH, removeFundsToPlayersH, keepJailCardH, moveNearestSpecialH }
