<template>
<span v-show="showComponent">
    <GameBoard ref="gameBoard" />
</span>
    <p>Properties</p>
    <span v-for="propArry in filteredProperties">

        <div v-for="prop in propArry" class="prop-name-wrapper">

            <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
            <input @click="setClickedPropertyObj(prop.id)" v-bind:class="prop.id" type="radio" name="property">

            <p v-if="!prop.mortgaged">{{ prop.name }}</p>
            <p v-if="prop.mortgaged" style="text-decoration: line-through;">{{ prop.name }}</p>
            
            <span v-if="prop.buildings > 0 && prop.buildings < 5">
                <span v-for="count in prop.buildings">
                    <span class="house-box">__</span>
                </span>
            </span>

            <span v-if="prop.buildings > 4">
                <span class="hotel-box">__</span>
            </span>
            
        </div>
    </span>

    <br />
    <button @click="testCall">test call</button>
    <p>Special Cards</p>
    <span v-if="computedShowSpecialCards" v-for="card in computedSpecialCards">
        <input @click="offerSpecialCard($event, card)" type="radio" name="cards">
        <span>{{ card.title }}</span>
    </span>

    <!-- mortages -->
    <span v-if="showMortgageOffer">
        <p>Mortgage message</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="mortgageProperty">Yes</button>
            <button @click.prevent="clearOffer">No</button>
        </span>
    </span>

    <span v-if="showUnmortgageOffer">
        <p>Unmortgage message</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="unmortgageProperty">Yes</button>
            <button @click.prevent="clearOffer">No</button>
        </span>
    </span>

    <!-- buildings -->
    <span v-if="showBuildOffer">
        <p>Buy building message</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="buyBuilding">Yes</button>
            <button @click.prevent="clearOffer">No</button>
        </span>
    </span>

    <span v-if="showSellBuildingOffer">
        <p>Sel building message</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="sellBuilding">Yes</button>
            <button @click.prevent="clearOffer">No</button>
        </span>
    </span>

    <!-- special cards -->
    <span v-if="showSpecialCardOffer">
        <p>Use special card message</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="useSpecialCard">Yes</button>
            <button @click.prevent="clearOffer">No</button>
        </span>
    </span>
   
    <button v-if="clickedProperty.canMortgage" @click="showMortgageOffer = true">Mortgage</button>
    <button v-if="clickedProperty.canUnmortgage" @click="showUnmortgageOffer = true">Unmortgage</button>
    <button v-if="clickedProperty.canBuild" @click="showBuildOffer = true">Buy Building</button>
    <button v-if="clickedProperty.canSellBuilding" @click="showSellBuildingOffer = true">Sell Building</button>
    <button v-if="canUseSpecialCard" @click="showSpecialCardOffer = true">Use Special Card</button>
</template>

<script setup>

import { computed } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as propertyFunctions from '../../javascripts/propertyFunctions';
import * as gameFunctions from '../../javascripts/gameFunctions';
import GameBoard from '../GameBoard.vue';

let gameBoard = ref(GameBoard);
let showComponent = ref(false); // always false. used to call function in GameBoard.vue

let clickedProperty = reactive({
    name: ref(''),
    id: ref(''),
    buildingCost: ref(0),
    mortgagePrice: ref(0),
    canMortgage: ref(false),
    canUnmortgage: ref(false),
    canBuild: ref(false),
    canSellBuilding: ref(false)
});

let showMortgageOffer = ref(false);
let showUnmortgageOffer = ref(false);
let showBuildOffer = ref(false);
let showSellBuildingOffer = ref(false);

let clickedSpecialCard = reactive({});
let canUseSpecialCard = ref(false);
let showSpecialCardOffer = ref(false);

// component variable to access current player
let playerReference = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);
let crntPlayer = computed(() => {
    return playerReference;
});

// returns all of the current player properties ordered by group
let filteredProperties = computed(() => {
    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
    propStyleArry.forEach((item) => {
        filteredPropArry.push(crntPlayer.value.properties.filter((prop => prop.style === item)));
    });
    return filteredPropArry;
});

// returns all of the current player special cards (get out of jail free)
let computedSpecialCards = computed(() => {
    let specialCardArry = [];

    if(crntPlayer.value.specialCards.length > 0) {
        for(let i = 0; i < crntPlayer.value.specialCards.length; i++) {
            specialCardArry.push(crntPlayer.value.specialCards[i]);
        };
    };
    
    return specialCardArry;
});

let computedShowSpecialCards = computed(() => {
    return crntPlayer.value.specialCards.length > 0 ? true : false;
});


function testCall() {
    let parent = document.getElementById('mediterraneanave').childNodes[0];
    while (parent.firstChild) {parent.removeChild(parent.firstChild)}
    
}

function setClickedPropertyObj(propertyId) {
    
    clearOffer();
    let propObj = propertyFunctions.checkedPropObjH(propertyId);
    
    clickedProperty.name = propObj.name;
    clickedProperty.id = propObj.id;
    clickedProperty.buildingCost = propObj.buildingCost;
    clickedProperty.mortgagePrice = propObj.mortgagePrice;
    clickedProperty.canMortgage = propObj.canMortgage;
    clickedProperty.canUnmortgage = propObj.canUnmortgage;
    clickedProperty.canBuild = propObj.canBuild;
    clickedProperty.canSellBuilding = propObj.canSellBuilding;
};

function mortgageProperty() {

    propertyFunctions.mortgagePropertyH(clickedProperty.id);
    crntPlayer.value.money += clickedProperty.mortgagePrice;
    clearOffer();
    setClickedPropertyObj(clickedProperty.id);
};

function unmortgageProperty() {
    
    let unMortgagePrice = (clickedProperty.mortgagePrice * 2) + clickedProperty.mortgagePrice * .1;
    if(!gameFunctions.moneyCheckH(crntPlayer.money, unMortgagePrice)) {return;}; // TODO: show 'not enough money message'
    crntPlayer.value.money -= unMortgagePrice;
    propertyFunctions.unMortgagePropertyH(clickedProperty.id);
    clearOffer();
    setClickedPropertyObj(clickedProperty.id);
};

function buyBuilding() {

    if(!gameFunctions.moneyCheckH(crntPlayer.value.money, clickedProperty.buildingCost)) {return;}; // TODO: show 'not enough money message'
    crntPlayer.value.money -= clickedProperty.buildingCost;
    propertyFunctions.buyBuildingH(clickedProperty.id);
    clearOffer();
    gameBoard.value.addBuildingPiece(clickedProperty.id); // place building piece on gameboard
    setClickedPropertyObj(clickedProperty.id);
};

function sellBuilding() {

    propertyFunctions.sellBuildingH(clickedProperty.id);
    gameBoard.value.removeBuildingPiece(clickedProperty.id); // remove building piece from gameboard
    crntPlayer.value.money += clickedProperty.buildingCost / 2;
    clearOffer();
    
    setClickedPropertyObj(clickedProperty.id);
};

function clearOffer() {

   showMortgageOffer.value = false;
   showUnmortgageOffer.value = false;
   showBuildOffer.value = false;
   showSellBuildingOffer.value = false;

   canUseSpecialCard.value = false;
   showSpecialCardOffer.value = false;
};


function offerSpecialCard(event, specialCard) {
    
    clickedSpecialCard.value = specialCard;

    if(!crntPlayer.value.inJail) {
        // TODO send message to dom ('can only use if in jail')
        return;
    }
    else {canUseSpecialCard.value = true;};
};

function useSpecialCard() {

    clearOffer();

    // remove special card from players deck
    let cardIndex = crntPlayer.value.specialCards.findIndex((card => card.title == clickedSpecialCard.value.title));
    crntPlayer.value.specialCards.splice(cardIndex, 1);

    // remove from jail
    crntPlayer.value.turnsInJail = 0;
    crntPlayer.value.inJail = false;
    crntPlayer.value.position = 11; // jail just visiting

    // TODO game logs ('out of jail!')

    // must end turn
    turnLogic.value.diceRolled = true
    turnLogic.value.canEndTurn = true
};

</script>

<style scoped>
.prop-name-wrapper {
    display: flex;
    align-items: center;
    gap: 5px;
}
.prop-color-box {
    width: 20px;
    height: 20px;
    
}
.house-box {
    width: 20px;
    height: 20px;
    background-color: green;
}
.hotel-box {
    width: 20px;
    height: 20px;
    background-color: red;
}
.mortgage-btn-wrapper {

}
.mortgage-yes-no-btn-wrapper {
    display: flex;
    width: 100%;
    gap: 15px;
}
</style>
