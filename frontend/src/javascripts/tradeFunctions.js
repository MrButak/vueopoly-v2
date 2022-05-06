import { gameLogic } from './stateStore';

// returns an array of a player's properties (ordered by group) and special cards
let getPropsToDisplayForTradeH = (playerId) => {

    let playerIndex = gameLogic.value.players.findIndex((player => player.name === playerId));
    let player = gameLogic.value.players[playerIndex];
    let allFilteredPropArry = [];
    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];

    propStyleArry.forEach((item) => {
        
        filteredPropArry = player.properties.filter((prop => prop.style === item));
        if(filteredPropArry.length > 0) {
            filteredPropArry.forEach((prop) => {
                allFilteredPropArry.push(prop);
            });
        };
    });

    player.specialCards.forEach((card) => {allFilteredPropArry.push(card)});

    return allFilteredPropArry;
};

let transferPropsTraderToTradeeH = (traderIndex, tradeeIndex, traderItems) => {


    traderItems.forEach((item) => {

        // change ownership of property
        console.log('trader => tradee')
        let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop == item));
        gameLogic.value.vueopoly.properties[propertyIndex].ownedby = gameLogic.value.players[tradeeIndex].name;
        gameLogic.value.players[tradeeIndex].properties.push(gameLogic.value.vueopoly.properties[propertyIndex]);
        gameLogic.value.players[traderIndex].properties.splice(gameLogic.value.vueopoly.properties[propertyIndex], 1);
    });
}

let transferPropsTradeeToTraderH = (traderIndex, tradeeIndex, tradeeItems) => {
    
    tradeeItems.forEach((item) => {

        // change ownership of property
        let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop == item));
        gameLogic.value.vueopoly.properties[propertyIndex].ownedby = gameLogic.value.players[traderIndex].name;
        console.log('tradee => trader')

        gameLogic.value.players[traderIndex].properties.push(gameLogic.value.vueopoly.properties[propertyIndex]);
        gameLogic.value.players[tradeeIndex].properties.splice(gameLogic.value.vueopoly.properties[propertyIndex], 1);
        
    });
};

export { getPropsToDisplayForTradeH , transferPropsTraderToTradeeH, transferPropsTradeeToTraderH }
