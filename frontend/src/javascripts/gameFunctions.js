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

let calculateTaxAmountH = () => {
    let crntPlayer = consts.crntPlayer();
    let tenPercentOfMoney = crntPlayer.money * .10;
    return tenPercentOfMoney < 200 ? tenPercentOfMoney : 200;
};

let nextPlayerTurn = () => {
    // whosTurnIndex is an int representing the 0 index position in the gameLogic.players array
    let totalPlayers = gameLogic.value.players.length;
    if(gameLogic.value.whosTurnIndex < totalPlayers - 1) {
        gameLogic.value.whosTurnIndex++;
        return;
    };
    gameLogic.value.whosTurnIndex = 0;

};

export { moneyCheckH, payMoneyH, calculateTaxAmountH, nextPlayerTurn }
