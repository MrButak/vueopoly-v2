<template>

    <div class="log-and-dice-wrapper">
        <div class="gamelog-wrapper-main">
            <p v-for="log in gameLogs" v-bind:style="{ 'color': log.color }" class="game-log-text">{{ log.log }}</p>
            
        </div>
        <div class="dice-wrapper-main">
            <span class="roll-dice-btn-wrapper">
                <button v-if="!crntTurnLogic.diceRolled" @click="rollDice(); dtrmPropAction();" class="roll-dice-btn">Roll Dice</button>
                <text>{{ crntTurnLogic.crntDiceRoll[0] }}  {{ crntTurnLogic.crntDiceRoll[1] }}</text>
            </span>
        </div>
    </div>

    <div class="roll-dice-end-turn-btn-wrapper">
        
        <button v-show="crntTurnLogic.canEndTurn" @click="endTurn()" class="endTurnBtn">End turn</button>
        
    </div>

    <div class="game-message-wrapper-main">
        <span class="game-message-wrapper">
            <text v-show="crntTurnLogic.buyAvailable">{{ crntTurnLogic.propertyLandedOn.name }} is available for ${{ crntTurnLogic.propertyLandedOn.price }}</text>
            <button v-show="crntTurnLogic.buyAvailable" @click="purchaseProperty">Buy</button>
        </span>
    </div>
   

</template>

<script setup>


import { ref, computed, onMounted, reactive } from 'vue';
import { lsInUse, gameLogic } from '../../javascripts/stateStore';
import * as moveFunction from '../../javascripts/moveFunctions';
import * as propertyAction from '../../javascripts/propertyAction';
import * as gameFunctions from '../../javascripts/gameFunctions';
import * as specialCards from '../../javascripts/specialcards';
import * as gameConstants from '../../javascripts/constants.js';


onMounted(() => {
    startTurn();
});

 
let gameLogs = computed(() => {
    return gameLogic.value.gameLogs
});



let crntTurnLogic = reactive({

    crntPlayer: reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]),
    propertyLandedOn: reactive({}),
    crntDiceRoll: reactive([]),
    diceRolled: ref(false),
    canEndTurn: ref(false),
    buyAvailable: ref(false),
    view: 'main' // main , manage
});

function startTurn() {

    if(crntTurnLogic.crntPlayer.inJail) {console.log('player is in jail'); return}; // handle in jail
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name}'s turn.`, color: `${gameConstants.logColor()}`});
};

function endTurn() {
    gameFunctions.nextPlayerTurn();

    crntTurnLogic.crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex])
    crntTurnLogic.propertyLandedOn = reactive({});
    crntTurnLogic.crntDiceRoll = reactive([]);
    crntTurnLogic.diceRolled = ref(false);
    crntTurnLogic.canEndTurn = ref(false);
    crntTurnLogic.buyAvailable = ref(false);

    startTurn()
    
};

function rollDice() {
    
    crntTurnLogic.crntDiceRoll = moveFunction.rollDiceH();
    moveFunction.movePlayerH(crntTurnLogic.crntDiceRoll[0] + crntTurnLogic.crntDiceRoll[1], crntTurnLogic.crntPlayer.position);
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} rolled for ${crntTurnLogic.crntDiceRoll[0] + crntTurnLogic.crntDiceRoll[1]}`, color: `${crntTurnLogic.crntPlayer.color}`});
    crntTurnLogic.diceRolled = true; // will remove the 'roll dice btn' from dom
};

// called after rollDice() @click
function dtrmPropAction() {

    crntTurnLogic.propertyLandedOn = moveFunction.getCrntPropH();

    switch(propertyAction.dtrmPropActionH(crntTurnLogic.propertyLandedOn)) {

        case 'canbuy': crntTurnLogic.buyAvailable = true; crntTurnLogic.canEndTurn = true; break; // displays 'buy btn' and buy property message on dom
        case 'willpay': payRent(); break;
        case 'specialcard': handleSpecialCard(); break;
        case 'tax': payTax(); break;
        case 'freeparking': freeParking(); break;
        default:
            // landed on go, jail just visiting
            console.log('unhandled case in MainDashboard.vue dtrmPropAction()')
            crntTurnLogic.canEndTurn = true;
    };
};

function purchaseProperty() {

    // TODO also send a 'not enough money message to dom'
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, crntTurnLogic.propertyLandedOn.price)) {return};
    propertyAction.purchasePropertyH(crntTurnLogic.crntPlayer, crntTurnLogic.propertyLandedOn);
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} purchased ${crntTurnLogic.propertyLandedOn.name} for $${crntTurnLogic.propertyLandedOn.price}`, color: `${crntTurnLogic.crntPlayer.color}`});
    crntTurnLogic.buyAvailable = false;
    crntTurnLogic.canEndTurn = true;
};

function payRent() {

    if(crntTurnLogic.propertyLandedOn.ownedby == crntTurnLogic.crntPlayer.name) {crntTurnLogic.canEndTurn = true; return};
    let totalRentAmount = propertyAction.getTotalRentCostH(crntTurnLogic.propertyLandedOn, crntTurnLogic.crntDiceRoll);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, totalRentAmount)) {return};
    // // (to, from, amount, type)
    gameFunctions.payMoneyH(crntTurnLogic.propertyLandedOn.ownedby, crntTurnLogic.crntPlayer.name, totalRentAmount, 'rent');
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} payed ${crntTurnLogic.propertyLandedOn.ownedby} $${totalRentAmount} in rent at ${crntTurnLogic.propertyLandedOn.name}`, color: `${crntTurnLogic.crntPlayer.color}`});
    // TODO dom message. for utilities, make custom message for dice roll *
    crntTurnLogic.canEndTurn = true;
};

function payTax() {
    // 10% or 200
    let taxAmount = gameFunctions.calculateTaxAmountH();
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, taxAmount)) {return};
    gameFunctions.payMoneyH('bank', crntTurnLogic.crntPlayer, taxAmount, 'tax');
    crntTurnLogic.canEndTurn = true;
};

function freeParking() {

    crntTurnLogic.crntPlayer.money += gameLogic.value.freeParking;
    gameLogic.value.freeParking = gameConstants.freeParkingMoney();
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} payed ${crntTurnLogic.propertyLandedOn.ownedby} $${totalRentAmount} in rent at ${crntTurnLogic.propertyLandedOn.name}`, color: `${crntTurnLogic.crntPlayer.color}`});
    crntTurnLogic.canEndTurn = true;
};

function handleSpecialCard() {

    
    let removefundsSpecial = (amount) => {
        if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, amount)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntTurnLogic.crntPlayer.money -= amount;
        crntTurnLogic.canEndTurn = true;
    };

    let removeFundsToPlayersSpecial = (amountPerPlayer) => {
        let totalPlayers = gameLogic.value.players.length;
        let totalAmountToPay = totalPlayers * amountPerPlayer;
        if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, totalAmountToPay)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntTurnLogic.crntPlayer.money -= totalAmountToPay;
        specialCards.removeFundsToPlayersH(amountPerPlayer);
        crntTurnLogic.canEndTurn = true;
    };

    let addFundsFromPlayersSpecial = (amountPerPlayer) => {

        for(let i = 0; i < gameLogic.value.players.length; i++) {

            if(gameLogic.value.players[i].name == crntTurnLogic.crntPlayer.name) {continue};
            if(gameLogic.value.players[i].money < amountPerPlayer) {console.log('handle not enough money for players')}
            gameLogic.value.players[i].money -= amountPerPlayer;
        };
        crntTurnLogic.crntPlayer.money += (gameLogic.value.players.length - 1) * amountPerPlayer;
        crntTurnLogic.canEndTurn = true;
    };

    let drawnCard = specialCards.drawSpecialCardH(crntTurnLogic.propertyLandedOn.style); // chance or community chest
    
    // TODO: call a function to display a popup div to show special card
    
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.propertyLandedOn.style} card!`, color: `${gameConstants.logColor()}`});
    gameLogic.value.gameLogs.push({log: `${drawnCard.title}`, color: `${gameConstants.logColor()}`});
    switch(drawnCard.action) {

        case 'move':
            if(drawnCard.title == 'Go Back 3 Spaces') {
                crntTurnLogic.crntPlayer.position -= 3;
                dtrmPropAction();
                gameLogic.canEndTurn = true;
                break;
            };
            moveFunction.moveToPropertyH(drawnCard.tileid);
            dtrmPropAction();
            gameLogic.canEndTurn = true;
            break;
        case 'addfunds':
            crntTurnLogic.crntPlayer.money += drawnCard.amount;
            crntTurnLogic.canEndTurn = true;
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
            if(drawnCard.subaction == 'getout') {break}; // handle keep 'get out of jail free' card
            // handle 'goto jail'
            // crntTurnLogic.crntPlayer.inJail = true;
            // endTurn();
        default:
            console.log('unhandled case in MainDashboard.vue handleSpecialCard()')
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