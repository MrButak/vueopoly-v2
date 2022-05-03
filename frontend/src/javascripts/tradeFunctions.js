import { gameLogic } from './stateStore';

// returns an array of a player's properties (ordered by group) and special cards
let getEligiblePropertiesH = (playerId) => {

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
            })
        };
    });

    player.specialCards.forEach((card) => {allFilteredPropArry.push(card)});

    
    
    return allFilteredPropArry;
};

export { getEligiblePropertiesH }
