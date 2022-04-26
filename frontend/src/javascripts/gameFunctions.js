import { gameLogic } from "./stateStore";

let moneyCheckH = (money, moneyToPay) => {
    return money > moneyToPay ? true : false;
};

let payMoneyH = (recipient, payer, amount, type) => { // should also take 'type' as argument (type = 'rent', 'tax', etc)

    // rent
    switch(type) {
        case 'rent':
            // recipient and payer is player name (player1, player2)
            let recipientIndex = gameLogic.value.players.findIndex((player => player.name == recipient));
            let payerIndex = gameLogic.value.players.findIndex((player => player.name == payer));
            gameLogic.value.players[payerIndex].money -= amount;
            gameLogic.value.players[recipientIndex].money += amount;
            return;
    };  
};


export { moneyCheckH, payMoneyH }
