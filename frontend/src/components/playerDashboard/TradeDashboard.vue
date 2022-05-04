<template>

<div class="overlay">
    <div class="container">

        <div class="card">
            
            <!-- once trade if offered -->
            <div v-if="offerTradeView" class="offer-text-wrapper">
                <text>{{ gameLogic.value.players[gameLogic.value.players.findIndex((player => player.name == selectedTradee))].name }}, {{ gameLogic.value.players[gameLogic.value.whosTurnIndex].name }} has made you a trade offer. Accept or Reject.</text>
            </div>

            <span class="close-btn-wrapper">
                <button @click="closeTradeView" class="close-btn">X</button>
            </span>

            <div class="main-wrapper">

                <div class="main-row-wrapper">

                    <div class="main-column-wrapper">

                        {{ turnLogic.value.crntPlayer.name }}
                        <span class="input-wrapper">
                            <text>$</text>
                            <input type="text" size="10" v-model="traderMoneyOffer">
                        </span>
                        <p>${{ gameLogic.value.players[gameLogic.value.whosTurnIndex].money }}</p>
                        <span v-if="traderProperties.length > 0">
                            <span class="property-wrapper" v-for="prop in traderProperties[0]">
                                <span class="property-wrapper">

                                    <!-- determine if any houses are in the group or property mortgaged -->
                                    <input @change="storeTraderItems" type="checkbox" v-bind:value="prop.id"
                                    v-if="!propertyFunctions.isAnyBuildingsInGroupH(propertyFunctions.getPropGroupFromPropH(prop)) || prop.mortgaged">

                                    <span class="prop-color-box" v-bind:style="{ 'background-color': prop.color }"></span>
                                    {{ prop.name }}
                                </span>
                            </span>
                        </span>

                    </div>

                </div>


                <div class="main-row-wrapper">

                    <div class="main-column-wrapper">
                        <select @change="getTradeeEligibleProps" v-model="selectedTradee">
                            <option v-for="player in tradeeArry">{{ player.name }}</option>
                        </select>

                        <span class="input-wrapper">
                            <text>$</text>
                            <input type="text" size="10" v-model="tradeeMoneyOffer">
                        </span>
                        <p v-if="selectedTradee">${{ gameLogic.value.players[gameLogic.value.players.findIndex((player => player.name == selectedTradee))].money }}</p>

                        <span v-if="tradeeProperties.length > 0">
                            
                            <span class="property-wrapper" v-for="prop in tradeeProperties[0]">
                                <span class="property-wrapper">

                                    <!-- determine if any houses are in the group or property mortgaged -->
                                    <input @change="storeTradeeItems" type="checkbox" v-bind:value="prop.id"
                                    v-if="!propertyFunctions.isAnyBuildingsInGroupH(propertyFunctions.getPropGroupFromPropH(prop)) || prop.mortgaged">

                                    <span class="prop-color-box" v-bind:style="{ 'background-color': prop.color }"></span>
                                    {{ prop.name }}
                                </span>
                            </span>
                        </span>
                    </div>

                </div>
                
                
            </div>

            <div v-if="!offerTradeView" class="offer-btn-wrapper">
                <button @click="makeOffer">Offer</button>
                <button @click="closeTradeView">Cancel</button>
            </div>

            <!-- once trade is offered -->
            <div v-if="offerTradeView" class="offer-btn-wrapper">
                <button @click="acceptOffer">Accept Offer</button>
                <button @click="closeTradeView">Decline Offer</button>
            </div>

        </div>
    </div>
</div>




</template>

<script setup>

import { ref, computed, reactive, watch, onMounted } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as tradeFunctions from '../../javascripts/tradeFunctions';
import * as propertyFunctions from '../../javascripts/propertyFunctions';



let selectedTradee = ref();
let traderMoneyOffer = ref();
let tradeeMoneyOffer = ref();
let tradeeProperties = reactive([]);
let tradeeItems = reactive([]);
let traderProperties = reactive([]);
let traderItems = reactive([]);

let offerTradeView = ref(false);

// get current player's properties
onMounted(() => {getTraderProperties(turnLogic.value.crntPlayer.name)});

// get an array of all players, except for the current player
let tradeeArry = computed(() => {
    return gameLogic.value.players.filter((player => player.name != turnLogic.value.crntPlayer.name));
});

// when selected player changes
watch(
    () => selectedTradee.value,
    () => { getTradeeProperties(selectedTradee.value);}
);



function getTraderProperties(playerId) {

    // remove all items from array
    traderProperties.splice(0, traderProperties.length);
    // add all available properties to array
    traderProperties.push(tradeFunctions.getEligiblePropertiesH(playerId));
};

function getTradeeProperties(playerId) {

    // remove all items from array
    tradeeProperties.splice(0, tradeeProperties.length);
    // add all available properties to array
    tradeeProperties.push(tradeFunctions.getEligiblePropertiesH(playerId));
};

function storeTraderItems(event) {
    // store/remove property id's in an array
    if (event.target.checked) { traderItems.push(propertyFunctions.getPropFromIdH(event.target.value)); }
    else { traderItems.splice(propertyFunctions.getPropFromIdH(event.target.value), 1); };

    console.log(traderItems)
};

function storeTradeeItems(event) {
    // store/remove property id's in an array
    if (event.target.checked) { tradeeItems.push(propertyFunctions.getPropFromIdH(event.target.value)); }
    else { tradeeItems.splice(propertyFunctions.getPropFromIdH(event.target.value), 1); };
};

function makeOffer() {
    if(!selectedTradee.value) {return;};
    if(!tradeeMoneyOffer.value && tradeeItems.length < 1 || tradeeMoneyOffer.value < 1 && tradeeItems.length < 1) {return;}; // no empty trades
    if(!traderMoneyOffer.value && traderItems.length < 1 || traderMoneyOffer.value < 1 && traderItems.length < 1) {return;}; // no empty trades

    // TODO: money check
    offerTradeView.value = true;
};

function acceptOffer() {

    let traderIndex = gameLogic.value.whosTurnIndex;
    let tradeeIndex = gameLogic.value.players.findIndex((player => player.name == selectedTradee.value));

    // properties
    if(traderItems.length > 0) {
        // trader => tradee
        traderItems.forEach((item) => {

            gameLogic.value.players[tradeeIndex].properties.push(item);
            gameLogic.value.players[traderIndex].properties.splice(item, 1);
        });
    };
    if(tradeeItems.length > 0) {
        // tradee => trader
        tradeeItems.forEach((item) => {
            
            gameLogic.value.players[traderIndex].properties.push(item); // add properties
            gameLogic.value.players[tradeeIndex].properties.splice(item, 1); // remove properties
        });
    };
    
    // money
    if(!tradeeMoneyOffer.value) {tradeeMoneyOffer.value = 0};
    if(!traderMoneyOffer.value) {traderMoneyOffer.value = 0};

    gameLogic.value.players[traderIndex].money += tradeeMoneyOffer.value;
    gameLogic.value.players[tradeeIndex].money += traderMoneyOffer.value;

    gameLogic.value.players[traderIndex].money -= traderMoneyOffer.value;
    gameLogic.value.players[tradeeIndex].money -= tradeeMoneyOffer.value;

    closeTradeView();
    // TODO: handle special cards
    // TODO: Game Logs

};

function closeTradeView() {

    gameLogic.value.view = 'play';
};


</script>


<style scoped>

.overlay {
    
    background-color: #80808066;
    position: fixed;
    width: 100vw;
    height: 100vw;
    z-index: 5;
    top: 0vh;
    left: 0vw
}
.offer-trade-overlay {
    
    
    position: fixed;
    width: 100vw;
    height: 100vw;
    z-index: 5;
    top: 0vh;
    left: 0vw
}

.container {
  
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 18vh;
}
.card {
    height: 30vw;
    width: 70vw;
    padding: 25px;
    position: relative;
    background-color: white;
}
.close-btn-wrapper {
    position: absolute;
    inset: 0 0 0 95%;
}
.close-btn {
    padding: 5px;
}

.offer-text-wrapper {
    position: absolute;
    top: 1vw;
}

.main-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px 0 0 0;
}

.main-row-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
}

.main-column-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-wrapper {
    display: flex;
}

.property-wrapper {
    display: flex;
    align-items: center;
    width: 100%
}

.prop-color-box {
    width: 10px;
    height: 10px;

}
.offer-btn-wrapper {
    display: flex;
    justify-content: center;
    gap: 40px;
}
</style>