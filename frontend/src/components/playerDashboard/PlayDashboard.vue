<template>
    <PopupSpecialCard ref="popupSpecialCard" />

    <div class="log-and-dice-wrapper">
        <div id="gamelog-wrapper-main">
            <p v-for="log in gameLogs" v-bind:style="{ 'color': log.color }" class="game-log-text">{{ log.log }}</p>
            
        </div>
        <div class="dice-wrapper-main">
            <span class="roll-dice-btn-wrapper">
                <button v-if="!turnLogic.value.diceRolled" @click="rollDice(); dtrmPropAction();" class="roll-dice-btn">Roll Dice</button>
                <text>{{ turnLogic.value.crntDiceRoll[0] }}  {{ turnLogic.value.crntDiceRoll[1] }}</text>
            </span>
        </div>
    </div>

    <div class="roll-dice-end-turn-btn-wrapper">
        
        <button v-show="turnLogic.value.canEndTurn" @click="endTurn()" class="endTurnBtn">End turn</button>
        
    </div>

    <div class="game-message-wrapper-main">
        <span class="game-message-wrapper">
            <text v-show="turnLogic.value.buyAvailable">{{ turnLogic.value.propertyLandedOn.name }} is available for ${{ turnLogic.value.propertyLandedOn.price }}</text>
            <button v-show="turnLogic.value.buyAvailable" @click="purchaseProperty">Buy</button>
        </span>
    </div>
   
</template>

<script setup>

import { ref, computed, onMounted, reactive, watch } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as moveFunction from '../../javascripts/moveFunctions';
import * as propertyAction from '../../javascripts/propertyAction';
import * as gameFunctions from '../../javascripts/gameFunctions';
import * as specialCards from '../../javascripts/specialcards';
import * as gameConstants from '../../javascripts/constants.js';

import PopupSpecialCard from '../specialCards/PopupSpecialCard.vue';

let popupSpecialCard = ref(PopupSpecialCard);


let gameLogs = computed(() => {
    return gameLogic.value.gameLogs
});

// when game log is added, function to scroll to bottom is called
watch(
    () => gameLogic.value.gameLogs.length,
    () => {scrollGameLogs();}
);

function scrollGameLogs() {

    // setting a .5 second time out fixes the issue where logs are not scrolling
    setTimeout(() => {
        let logElement = document.getElementById('gamelog-wrapper-main');
        logElement.scrollTop = logElement.scrollHeight;  
    }, '500');
    
    
};


function startTurn() {

    // if(turnLogic.value.crntPlayer.inJail) {console.log('player is in jail'); return}; // handle in jail
    gameFunctions.addGameLogsH('startTurn', null, null);
    scrollGameLogs();
    
};

function endTurn() {

    turnLogic.value.crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex])
    turnLogic.value.propertyLandedOn = reactive({});
    turnLogic.value.crntDiceRoll = reactive([]);
    turnLogic.value.diceRolled = ref(false);
    turnLogic.value.canEndTurn = ref(false);
    turnLogic.value.buyAvailable = ref(false);
    gameFunctions.nextPlayerTurn();
    startTurn()
};

defineExpose({
    endTurn,
    dtrmPropAction
});

function rollDice() {
    
    
    turnLogic.value.crntDiceRoll = moveFunction.rollDiceH();
    moveFunction.movePlayerH(turnLogic.value.crntDiceRoll[0] + turnLogic.value.crntDiceRoll[1], gameLogic.value.players[gameLogic.value.whosTurnIndex].position);
    turnLogic.value.diceRolled = true; // will remove the 'roll dice btn' from dom
};

// called after rollDice() @click
function dtrmPropAction() {

    turnLogic.value.propertyLandedOn = moveFunction.getCrntPropH();
    console.log(turnLogic.value.propertyLandedOn)
    gameFunctions.addGameLogsH('diceRoll', null, null); // game log
    
    switch(propertyAction.dtrmPropActionH(turnLogic.value.propertyLandedOn)) {

        case 'canbuy': turnLogic.value.buyAvailable = true; turnLogic.value.canEndTurn = true; break; // displays 'buy btn' and buy property message on dom
        case 'willpay': payRent(); break;
        case 'specialcard': handleSpecialCard(); break;
        case 'tax': payTax(turnLogic.value.propertyLandedOn.id); break;
        case 'freeparking': freeParking(); break;
        case 'gotojail': gotoJail(); break;
        case 'injail': break;
        default:
            // landed on go, jail just visiting
            console.log('unhandled case in PlayDashboard.vue dtrmPropAction()')
            turnLogic.value.canEndTurn = true;
            break;
    };
};

function purchaseProperty() {
    // TODO also send a 'not enough money message to dom'

    if(!gameFunctions.moneyCheckH(gameLogic.value.players[gameLogic.value.whosTurnIndex].money, turnLogic.value.propertyLandedOn.price)) {return};
    propertyAction.purchasePropertyH(gameLogic.value.players[gameLogic.value.whosTurnIndex], turnLogic.value.propertyLandedOn);

    gameFunctions.addGameLogsH('purchaseProperty', null, null);
    
    turnLogic.value.buyAvailable = false;
    turnLogic.value.canEndTurn = true;
};

function payRent() {
    
    if(turnLogic.value.propertyLandedOn.ownedby == gameLogic.value.players[gameLogic.value.whosTurnIndex].name) {turnLogic.value.canEndTurn = true; return};
    let totalRentAmount = propertyAction.getTotalRentCostH(turnLogic.value.propertyLandedOn, turnLogic.value.crntDiceRoll);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(turnLogic.value.crntPlayer.money, totalRentAmount)) {return};

    // (to, from, amount, type)
    gameFunctions.payMoneyH(turnLogic.value.propertyLandedOn.ownedby, gameLogic.value.players[gameLogic.value.whosTurnIndex].name, totalRentAmount, 'rent');

    gameFunctions.addGameLogsH('payRent', totalRentAmount, null);
    
    // TODO dom message. for utilities, make custom message for dice roll *
    turnLogic.value.canEndTurn = true;
};

function payTax(propertyId) {

    let taxAmount = gameFunctions.calculateTaxAmountH(propertyId);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(gameLogic.value.players[gameLogic.value.whosTurnIndex].money, taxAmount)) {return};
    
    gameFunctions.payMoneyH('bank', gameLogic.value.players[gameLogic.value.whosTurnIndex], taxAmount, 'tax');

    gameFunctions.addGameLogsH('payTax', taxAmount, null);
    turnLogic.value.canEndTurn = true;
    return;
};

function freeParking() {
    
    gameLogic.value.players[gameLogic.value.whosTurnIndex].money += gameLogic.value.freeParking;
    gameLogic.value.freeParking = gameConstants.freeParkingMoney();
    turnLogic.value.canEndTurn = true;

    gameFunctions.addGameLogsH('freeParking', gameLogic.value.freeParking, null);
    return;
};

function gotoJail() {
    
    gameLogic.value.players[gameLogic.value.whosTurnIndex].position = 11.5;

    turnLogic.value.propertyLandedOn = moveFunction.getCrntPropH();
    
    // delaying for 1 second fixes the issue where the watch() callback in GameBoard.vue updates the dom (moves the player piece)
    setTimeout(() => {
        gameLogic.value.players[gameLogic.value.whosTurnIndex].inJail = true;
        endTurn();
    }, "1000");
};

function handleSpecialCard() {

    let removefundsSpecial = (amount) => {
        if(!gameFunctions.moneyCheckH(turnLogic.value.crntPlayer.money, amount)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        turnLogic.value.crntPlayer.money -= amount;
        turnLogic.value.canEndTurn = true;
    };

    let removeFundsToPlayersSpecial = (amountPerPlayer) => {
        let totalPlayers = gameLogic.value.players.length;
        let totalAmountToPay = totalPlayers * amountPerPlayer;
        if(!gameFunctions.moneyCheckH(turnLogic.value.crntPlayer.money, totalAmountToPay)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        turnLogic.value.crntPlayer.money -= totalAmountToPay;
        specialCards.removeFundsToPlayersH(amountPerPlayer);
        turnLogic.value.canEndTurn = true;
    };

    let addFundsFromPlayersSpecial = (amountPerPlayer) => {

        for(let i = 0; i < gameLogic.value.players.length; i++) {

            if(gameLogic.value.players[i].name == turnLogic.value.crntPlayer.name) {continue};
            if(gameLogic.value.players[i].money < amountPerPlayer) {console.log('handle not enough money for players')}
            gameLogic.value.players[i].money -= amountPerPlayer;
        };
        turnLogic.value.crntPlayer.money += (gameLogic.value.players.length - 1) * amountPerPlayer;
        turnLogic.value.canEndTurn = true;
    };

    let keepGetOutOfJailFreeCard = (drawnCard, typeOfCard) => { // getoutofjail  chance/community chest

        specialCards.keepJailCardH(drawnCard, typeOfCard)
        // TODO game logs
        turnLogic.value.canEndTurn = true;
    };

    let drawnCard = specialCards.drawSpecialCardH(turnLogic.value.propertyLandedOn.style); // chance or community chest
    
    // function call from PopupSpecialCard.vue
    popupSpecialCard.value.showPopup(turnLogic.value.propertyLandedOn.style, drawnCard);
    gameFunctions.addGameLogsH('specialCard', null, drawnCard.title);
    
    switch(drawnCard.action) {

        case 'move':
            if(drawnCard.title == 'Go Back 3 Spaces') {
                turnLogic.value.crntPlayer.position -= 3;
                dtrmPropAction();
                turnLogic.value.canEndTurn = true;
                break;
            };
            moveFunction.moveToPropertyH(drawnCard.tileid);
            dtrmPropAction();
            turnLogic.value.canEndTurn = true;
            break;
        case 'addfunds':
            turnLogic.value.crntPlayer.money += drawnCard.amount;
            turnLogic.value.canEndTurn = true;
            break;
        case 'addfundsfromplayers':
            addFundsFromPlayersSpecial(drawnCard.amount);
            break;

        case 'removefundstoplayers':
            removeFundsToPlayersSpecial(drawnCard.amount);
            break;

        case 'removefunds':
            removefundsSpecial(drawnCard.amount);
            break;

        case 'propertycharges':
            let propertyCharges = specialCards.streetRepairsCostH(drawnCard);
            removefundsSpecial(propertyCharges);
            break;

        case 'movenearest':
            removefundsSpecial(specialCards.moveNearestSpecialH(drawnCard.groupid));
            break;

        case 'jail':
            if(drawnCard.subaction == 'getout') {keepGetOutOfJailFreeCard(drawnCard, turnLogic.value.propertyLandedOn.style); break}; // handle keep 'get out of jail free' card
            gotoJail();
            break;
        default:
            console.log('unhandled case in PlayDashboard.vue handleSpecialCard()')
    };
};

</script>

<style scoped>

.game-message-wrapper-main {
    display: flex;
    justify-content: space-around;
    padding: 10px 0 0 0;
}
.game-message-wrapper {
    display: flex;
}
.roll-dice-end-turn-btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}

.log-and-dice-wrapper {
    display: flex;
    justify-content: space-between;

}
#gamelog-wrapper-main {
    /* display: flex;
    flex-direction: column; */
    height: 15vw;
    background-color: black;
    border: 1px solid black;
    overflow-y: scroll;
    width: 100%;
}
.game-log-text {
    /*font-size: 26px;*/
}
.dice-wrapper-main {
    display: flex;
    flex-direction: column-reverse;
    height: 15vw;
    border: 1px solid black;
    width: 10vw;
}
.roll-dice-btn-wrapper {
    display: flex;
    justify-content: center;
    width: 100%
}
.roll-dice-btn {
    padding: 2px 10px;
    background: linear-gradient(#f57420, #f99120);
    width: 100%;
}
</style>