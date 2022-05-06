import { gameLogic } from "./stateStore";
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

let addGameLogsH = () => {

};

export { moneyCheckH, payMoneyH, calculateTaxAmountH, nextPlayerTurn }
