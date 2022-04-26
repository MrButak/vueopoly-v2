import { lsInUse, gameLogic } from '../javascripts/stateStore';

let dtrmPropActionH = (property) => {

    switch(property.group) {

        case 'land':
        case 'railroad':
        case 'utilities': {
            return isPropOwnedH(property) ? 'willPay' : 'canBuy';
        }

        case 'special':
            // goto jail, chance / community, tax, free parking (go already handled, jailjustvisiting no need to handle)

    }
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

let getTotalRentCostH = (property) => {
    
    switch(property.group) {

        case 'railroad':
            let ownedCount = 1;
            // create array of all RRs
            let railroads = gameLogic.value.vueopoly.properties.filter((prop => prop.group == 'railroad'));
            // check how many RRs are owned by same person
            railroads.forEach((rr) => {
                if(rr.ownedby == property.ownedby) {ownedCount++}
            });
            switch(ownedCount) {
                case 1: return 25;
                case 2: return 50;
                case 3: return 100;
                default: return 200;
            };

        case 'land':
            if(property.buildings > 0) {
                return(property.buildingrent[property.buildings - 1])
            };    
            return(property.rent)
    }
};


export { dtrmPropActionH, isPropOwnedH, getTotalRentCostH, purchasePropertyH }