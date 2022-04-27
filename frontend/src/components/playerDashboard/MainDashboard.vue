<template>
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">

            <div class="player-stats-top-wrapper">
                <button>Manage</button>
                <text>{{ crntTurnLogic.crntPlayer.name }} - {{ crntTurnLogic.crntPlayer.alias }}</text>
            <text>${{ crntTurnLogic.crntPlayer.money }}</text>
                <button>Trade</button>
            </div>

            <div class="log-and-dice-wrapper">
                <div class="gamelog-wrapper-main">
                    <p v-for="log in gameLogs" v-bind:style="{ 'color': log.color }">{{ log.log }}</p>
                    
                </div>
                <div class="show-dice-wrapper-main">
                    <text>{{ crntTurnLogic.crntDiceRoll[0] }}  {{ crntTurnLogic.crntDiceRoll[1] }}</text>
                </div>
            </div>

            <div class="roll-dice-end-turn-btn-wrapper">
                <button v-if="!crntTurnLogic.diceRolled" @click="rollDice(); dtrmPropAction();" class="endTurnBtn">Roll dice</button>
                <button v-if="crntTurnLogic.canEndTurn" class="endTurnBtn">End turn</button>
            </div>

            <div class="game-message-wrapper">
                <span>
                    <p v-if="crntTurnLogic.buyAvailable">{{ crntTurnLogic.propertyLandedOn.name }} is available to buy for ${{ crntTurnLogic.propertyLandedOn.price }}</p>
                    <button v-if="crntTurnLogic.buyAvailable" @click="purchaseProperty">Buy</button>
                </span>
            </div>
        </div>
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


// onMounted(() => {

// });

 
let gameLogs = computed(() => {
    return gameLogic.value.gameLogs
});

let crntTurnLogic = reactive({
    crntPlayer: reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]),
    propertyLandedOn: reactive({}),
    crntDiceRoll: reactive([]),
    diceRolled: ref(false),
    canEndTurn: ref(false),
    buyAvailable: ref(false)
});

let rollDice = () => {
    
    crntTurnLogic.crntDiceRoll = moveFunction.rollDiceH();
    moveFunction.movePlayerH(crntTurnLogic.crntDiceRoll[0] + crntTurnLogic.crntDiceRoll[1], crntTurnLogic.crntPlayer.position);
    // diceRolled = true; // will remove the 'roll dice btn' from dom
};

// called after rollDice() @click
let dtrmPropAction = () => {

    crntTurnLogic.propertyLandedOn = moveFunction.getCrntPropH();
    
    switch(propertyAction.dtrmPropActionH(crntTurnLogic.propertyLandedOn)) {

        case 'canbuy': crntTurnLogic.buyAvailable = true; break; // displays 'buy btn' and buy property message on dom
        case 'willpay': payRent(); break;
        case 'specialcard': handleSpecialCard(); break;
        case 'tax': payTax(); break;
        case 'freeparking':
            break;
        default:
            break;
    };
};

function purchaseProperty() {

    // TODO also send a 'not enough money message to dom'
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, crntTurnLogic.propertyLandedOn.price)) {return};
    propertyAction.purchasePropertyH(crntTurnLogic.crntPlayer, crntTurnLogic.propertyLandedOn);
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} purchased ${crntTurnLogic.propertyLandedOn.name} for $${crntTurnLogic.propertyLandedOn.price}`, color: `${crntTurnLogic.crntPlayer.color}`});

};

function payRent() {

    let totalRentAmount = propertyAction.getTotalRentCostH(crntTurnLogic.propertyLandedOn, crntTurnLogic.crntDiceRoll);
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, totalRentAmount)) {return};
    // // (to, from, amount, type)
    gameFunctions.payMoneyH(crntTurnLogic.propertyLandedOn.ownedby, crntTurnLogic.crntPlayer.name, totalRentAmount, 'rent');
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} payed ${crntTurnLogic.propertyLandedOn.ownedby} $${totalRentAmount} in rent at ${crntTurnLogic.propertyLandedOn.name}`, color: `${crntTurnLogic.crntPlayer.color}`});
    // TODO dom message. for utilities, make custom message for dice roll *
};

function payTax() {
    // 10% or 200
    let taxAmount = gameFunctions.calculateTaxAmountH();
    // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
    if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, taxAmount)) {return};
    gameFunctions.payMoneyH('bank', crntTurnLogic.crntPlayer, taxAmount, 'tax');
    
    
};

function handleSpecialCard() {

    let addFundsSpecial = (amount) => {
        crntTurnLogic.crntPlayer.money += amount;
    };
    let removefundsSpecial = (amount) => {
        if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, amount)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntTurnLogic.crntPlayer.money -= amount;
    };

    let removeFundsToPlayersSpecial = (amount) => {
        let totalPlayers = gameLogic.value.players.length;
        let totalAmountToPay = totalPlayers * amount;
        if(!gameFunctions.moneyCheckH(crntTurnLogic.crntPlayer.money, totalAmountToPay)) {return};
        // TODO send a 'not enough money message, you need to mortgage or trade to dom'. also disable end turn button
        crntTurnLogic.crntPlayer.money -= totalAmountToPay;
        specialCards.removeFundsToPlayersH(amount);
    };

    let drawnCard = specialCards.drawSpecialCardH(crntTurnLogic.propertyLandedOn.style); // chance or community chest
    if(drawnCard.subaction == 'getout') {return} // handle card you can keep. subaction: "getout" aka "get out of jail free card"
    // TODO: call a function to display a popup div to show special card
    console.log({drawnCard})
    gameLogic.value.gameLogs.push({log: `${crntTurnLogic.crntPlayer.name} landed on ${crntTurnLogic.propertyLandedOn.style}!`, color: `${gameConstants.logColor()}`});
    gameLogic.value.gameLogs.push({log: `${drawnCard.title}`, color: `${gameConstants.logSpecialCardColor()}`});
    switch(drawnCard.action) {

        case 'move':
            if(drawnCard.title == 'Go Back 3 Spaces') {
                crntTurnLogic.crntPlayer.position -= 3;
                dtrmPropAction();
                break;
            };

            moveFunction.moveToPropertyH(drawnCard.tileid);
            dtrmPropAction();
            break;

        case 'addfunds':
            addFundsSpecial(drawnCard.amount);
            break;
        case 'addfundsfromplayers':
            
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
            if(drawnCard.subaction == 'getout') {break} // handle keep 'get out of jail free' card
            // handle 'goto jail'
    }

};

</script>

<style scoped>
.player-dashboard-wrapper-main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    top: 31.4vw;
    left: 25vw;
}

.player-dashboard-wrapper {
    width: 47vw;
    border: 1px solid black;
    background-color: white;
    padding: 10px;
}

.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 4vw;
    padding: 0 0 10px 0;
}

.game-message-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 10px 0 0 0;
}

.roll-dice-end-turn-btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
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
    width: 80%;
}

.show-dice-wrapper-main {
    display: flex;
    height: 15vw;
    border: 1px solid black;
    width: 18vw;
}
</style>