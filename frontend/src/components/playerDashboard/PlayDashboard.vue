<template>
    <PopupSpecialCard ref="popupSpecialCard" />
    <!-- permanently display none (for funciton calls) -->
    <span v-show="showComponent">
        <GameBoard ref="gameBoard" />
    </span>

    <div class="log-and-dice-wrapper">
        <div class="gamelog-wrapper-main">
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

import { ref, computed, onMounted, reactive } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as moveFunction from '../../javascripts/moveFunctions';
import * as propertyAction from '../../javascripts/propertyAction';
import * as gameFunctions from '../../javascripts/gameFunctions';
import * as specialCards from '../../javascripts/specialcards';
import * as gameConstants from '../../javascripts/constants.js';

import GameBoard from '../GameBoard.vue';
import PopupSpecialCard from '../specialCards/PopupSpecialCard.vue';

let popupSpecialCard = ref(PopupSpecialCard);
let gameBoard = ref(GameBoard);
let showComponent = ref(false); // permanently false. used to call functions from other components

onMounted(() => {
    startTurn();
});


let gameLogs = computed(() => {
    return gameLogic.value.gameLogs
});

// TODO refactor code to use crntPlayer.value
// component variable to access current player
let playerReference = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);
let crntPlayer = computed(() => {
    return playerReference;
});

function startTurn() {

    // if(turnLogic.value.crntPlayer.inJail) {console.log('player is in jail'); return}; // handle in jail
    gameLogs.value.push({log: `${turnLogic.value.crntPlayer.name}'s turn.`, color: `${gameConstants.logColor()}`});
};

function endTurn() {

    gameFunctions.nextPlayerTurn();

    turnLogic.value.crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex])
    turnLogic.value.propertyLandedOn = reactive({});
    turnLogic.value.crntDiceRoll = reactive([]);
    turnLogic.value.diceRolled = ref(false);
    turnLogic.value.canEndTurn = ref(false);
    turnLogic.value.buyAvailable = ref(false);

    startTurn()
};

defineExpose({
    endTurn,
    dtrmPropAction
});


function rollDice() {
    
    turnLogic.value.crntDiceRoll = moveFunction.rollDiceH();
    moveFunction.movePlayerH(turnLogic.value.crntDiceRoll[0] + turnLogic.value.crntDiceRoll[1], turnLogic.value.crntPlayer.position);
    gameLogs.value.push({log: `${turnLogic.value.crntPlayer.name} rolled for ${turnLogic.value.crntDiceRoll[0] + turnLogic.value.crntDiceRoll[1]}`, color: `${turnLogic.value.crntPlayer.color}`});
    turnLogic.value.diceRolled = true; // will remove the 'roll dice btn' from dom
};

// called after rollDice() @click
function dtrmPropAction() {

    turnLogic.value.propertyLandedOn = moveFunction.getCrntPropH();
    
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
    if(!gameFunctions.moneyCheckH(crntPlayer.value.money, turnLogic.value.propertyLandedOn.price)) {return};
    propertyAction.purchasePropertyH(crntPlayer.value, turnLogic.value.propertyLandedOn);
    gameLogs.value.push({log: `${crntPlayer.value.name} purchased ${turnLogic.value.propertyLandedOn.name} for $${turnLogic.value.propertyLandedOn.price}`, color: `${turnLogic.value.crntPlayer.color}`});
    turnLogic.value.buyAvailable = false;
    turnLogic.value.canEndTurn = true;
    
};

function payRent() {

    if(turnLogic.value.propertyLandedOn.ownedby == crntPlayer.value.name) {turnLogic.value.canEndTurn = true; return};
    let totalRentAmount = propertyAction.getTotalRentCostH(turnLogic.value.propertyLandedOn, turnLogic.value.crntDiceRoll);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(crntPlayer.value.money, totalRentAmount)) {return};
    // // (to, from, amount, type)
    gameFunctions.payMoneyH(turnLogic.value.propertyLandedOn.ownedby, crntPlayer.value.name, totalRentAmount, 'rent');
    gameLogic.value.gameLogs.push({log: `${crntPlayer.value.name} payed ${turnLogic.value.propertyLandedOn.ownedby} $${totalRentAmount} in rent at ${turnLogic.value.propertyLandedOn.name}`, color: `${crntPlayer.value.color}`});
    // TODO dom message. for utilities, make custom message for dice roll *
    turnLogic.value.canEndTurn = true;
};

function payTax(propertyId) {

    let taxAmount = gameFunctions.calculateTaxAmountH(propertyId);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(turnLogic.value.crntPlayer.money, taxAmount)) {return};
    
    gameFunctions.payMoneyH('bank', turnLogic.value.crntPlayer, taxAmount, 'tax');
    turnLogic.value.canEndTurn = true;
    return;
};

function freeParking() {
    
    gameLogs.value.push({log: `${turnLogic.value.crntPlayer.name} landed on Free Parking and received $${gameLogic.value.freeParking}`, color: `${turnLogic.value.crntPlayer.color}`});
    crntPlayer.value.money += gameLogic.value.freeParking;
    gameLogic.value.freeParking = gameConstants.freeParkingMoney();
    turnLogic.value.canEndTurn = true;
    return;
};

function gotoJail() {
    
    crntPlayer.value.position = 11.5;
    // manually call function to move player. watcher() is set but not firing
    gameBoard.value.placePlayerPiece(crntPlayer.value.name)
    dtrmPropAction();
    crntPlayer.value.inJail = true;
    endTurn();
};

function handleSpecialCard() {

    let removefundsSpecial = (amount) => {
        if(!gameFunctions.moneyCheckH(crntPlayer.value.money, amount)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntPlayer.value.money -= amount;
        turnLogic.value.canEndTurn = true;
    };

    let removeFundsToPlayersSpecial = (amountPerPlayer) => {
        let totalPlayers = gameLogic.value.players.length;
        let totalAmountToPay = totalPlayers * amountPerPlayer;
        if(!gameFunctions.moneyCheckH(crntPlayer.value.money, totalAmountToPay)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntPlayer.value.money -= totalAmountToPay;
        specialCards.removeFundsToPlayersH(amountPerPlayer);
        turnLogic.value.canEndTurn = true;
    };

    let addFundsFromPlayersSpecial = (amountPerPlayer) => {

        for(let i = 0; i < gameLogic.value.players.length; i++) {

            if(gameLogic.value.players[i].name == turnLogic.value.crntPlayer.name) {continue};
            if(gameLogic.value.players[i].money < amountPerPlayer) {console.log('handle not enough money for players')}
            gameLogic.value.players[i].money -= amountPerPlayer;
        };
        crntPlayer.value.money += (gameLogic.value.players.length - 1) * amountPerPlayer;
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
    
    console.log(drawnCard)

    gameLogs.value.push({log: `${turnLogic.value.propertyLandedOn.style} card!`, color: `${gameConstants.logColor()}`});
    gameLogs.value.push({log: `${drawnCard.title}`, color: `${gameConstants.logColor()}`});
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
            crntPlayer.value.money += drawnCard.amount;
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

        case 'jail':
            if(drawnCard.subaction == 'getout') {keepGetOutOfJailFreeCard(drawnCard, turnLogic.value.propertyLandedOn.style); break}; // handle keep 'get out of jail free' card
            gotoJail();
            break;
        default:
            // TODO: advance to nearest utility
            console.log('unhandled case in PlayDashboard.vue handleSpecialCard()')
    };

};

</script>

<style>

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

.gamelog-wrapper-main {
    display: flex;
    flex-direction: column;
    height: 15vw;
    background-color: black;
    border: 1px solid black;
    overflow-y: scroll;
    width: 100%;
}
.game-log-text {
    font-size: 26px;
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
}
</style>