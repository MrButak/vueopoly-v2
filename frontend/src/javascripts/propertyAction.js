import { lsInUse, gameLogic } from '../javascripts/stateStore';

let dtrmPropActionH = (property) => {

    switch(property.group) {

        case 'land':
        case 'railroad':
        case 'utilities': {
            return isPropOwnedH(property) ? 'willpay' : 'canbuy';
        }

        case 'special':
            switch(property.style) {
                case 'chance':
                case 'communitychest': {
                    return 'specialcard';
                }
                case 'tax':
                case 'freeparking':
                case 'gotojail': {
                    return property.style;
                }
            }
          //  (go already handled, jailjustvisiting no need to handle)
    };
};

let isPropOwnedH = (property) => {
    return property.ownedby == -1 ? false : true;
};

let purchasePropertyH = (player, property) => {

    player.money -= property.price;
    property.ownedby = player.name;
    player.properties.push(property);
    return;
};

let getTotalRentCostH = (property, diceRoll) => {
    
    switch(property.group) {

        case 'railroad':
            let rrOwned = 1;
            // check how many RRs are owned by same person
            let railroads = gameLogic.value.vueopoly.properties.filter((prop => prop.group == 'railroad'));
            railroads.forEach((rr) => {
                if(rr.ownedby == property.ownedby) {rrOwned++}
            });
            // payment based on amount owned
            switch(rrOwned) {
                case 1: return 25;
                case 2: return 50;
                case 3: return 100;
                default: return 200;
            };

        case 'land':
            if(property.buildings > 0) {
                return (property.buildingrent[property.buildings - 1])
            };    
            return (property.rent);

        case 'utilities': // dice roll. * 4 for 1 owned * 10 for both
            // check how many Utilities are owned by same person
            let utilsOwned = 1;
            let utilities = gameLogic.value.vueopoly.properties.filter((prop => prop.group == 'utilities'));
            utilities.forEach((util) => {
                if(util.ownedby == property.ownedby) {utilsOwned++}
            });
            // payment based on amount owned
            if(utilsOwned < 2) {
                return ((diceRoll[0] + diceRoll[1]) * 4);
            };
            return ((diceRoll[0] + diceRoll[1]) * 10);

    }
};

export { dtrmPropActionH, isPropOwnedH, getTotalRentCostH, purchasePropertyH }
