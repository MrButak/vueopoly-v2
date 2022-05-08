import { gameLogic, turnLogic } from "./stateStore";
import * as consts from '../javascripts/constants';

let moneyCheckH = (money, moneyToPay) => {
    return money > moneyToPay ? true : false;
};

let payMoneyH = (recipient, payer, amount, type) => { // (type = 'rent', 'tax', 'freeparking', etc)

    // rent
    switch(type) {
        case 'rent':
            // recipient and payer is String (player1, player2)
            let recipientIndex = gameLogic.value.players.findIndex((player => player.name == recipient));
            let payerIndex = gameLogic.value.players.findIndex((player => player.name == payer));
            gameLogic.value.players[payerIndex].money -= amount;
            gameLogic.value.players[recipientIndex].money += amount;
            return;
        case 'tax':
            payer.money -= amount;
            return;
    };  
};

let calculateTaxAmountH = (propertyId) => {

    let crntPlayer = consts.crntPlayer();

    if(propertyId == 'incometax') {
        let incomeTax = consts.luxuryTax();
        let tenPercentOfMoney = crntPlayer.money * .10;
        return tenPercentOfMoney < incomeTax ? tenPercentOfMoney : incomeTax;
    };

    return consts.luxuryTax();
};

let nextPlayerTurn = () => {
    
    let totalPlayers = gameLogic.value.players.length;
    if(gameLogic.value.whosTurnIndex < totalPlayers - 1) {
        gameLogic.value.whosTurnIndex++;
        return;
    };
    gameLogic.value.whosTurnIndex = 0;

};

let addGameLogsH = (logCase, moneyAmount, specialCardTitle) => {

    let crntPlayer = consts.crntPlayer();
    let gameLogs = consts.gameLogs();

    switch(logCase) {

        case 'startTurn':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name}'s turn.`, color: `${crntPlayer.color}`});
            break;
        case 'diceRoll':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name} rolled for ${turnLogic.value.crntDiceRoll[0] + turnLogic.value.crntDiceRoll[1]} and landed on ${turnLogic.value.propertyLandedOn.name}.`, color: `${crntPlayer.color}`});
            break;
        case 'purchaseProperty':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name} purchased ${turnLogic.value.propertyLandedOn.name} for $${turnLogic.value.propertyLandedOn.price}.`, color: `${crntPlayer.color}`});
            break;
        case 'payRent':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name} payed $${turnLogic.value.propertyLandedOn.ownedby} $${moneyAmount} in rent at ${turnLogic.value.propertyLandedOn.name}.`, color: `${crntPlayer.color}`});
            break;
        case 'payTax':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name} payed $${moneyAmount} in tax.`, color: `${crntPlayer.color}`});
            break;
        case 'freeParking':
            gameLogic.value.gameLogs.push({log: `${crntPlayer.name} received $${moneyAmount} from Free Parking`, color: `${crntPlayer.color}`});
            break;
        case 'specialCard':
            gameLogic.value.gameLogs.push({log: `${turnLogic.value.propertyLandedOn.name}: ${specialCardTitle}`, color: `${consts.logSpecialCardColor()}`});
            break;
    };
    
};

export { moneyCheckH, payMoneyH, calculateTaxAmountH, nextPlayerTurn, addGameLogsH }
