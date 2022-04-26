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
            // get all owners
        case 'land':
            // check buildings
    }
};


export { dtrmPropActionH, isPropOwnedH, getTotalRentCostH, purchasePropertyH }