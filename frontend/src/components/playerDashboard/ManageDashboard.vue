<template>



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
   


    
    <button v-if="clickedProperty.canMortgage" @click="showMortgageOffer = true">Mortgage</button>
    <button v-if="clickedProperty.canUnmortgage" @click="showUnmortgageOffer = true">Unmortgage</button>
    <button v-if="clickedProperty.canBuild" @click="showBuildOffer = true">Buy Building</button>
    <button v-if="clickedProperty.canSellBuilding" @click="showSellBuildingOffer = true">Sell Building</button>
  

</template>

<script setup>

import { computed } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
import * as propertyFunctions from '../../javascripts/propertyFunctions';
import * as gameFunctions from '../../javascripts/gameFunctions';




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

let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);


// returns all of the current players properties ordered by group
let filteredProperties = computed(() => {
    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
    propStyleArry.forEach((item) => {
        filteredPropArry.push(crntPlayer.properties.filter((prop => prop.style === item)));
    });
    return filteredPropArry;
});



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
    crntPlayer.money += clickedProperty.mortgagePrice;
    clearOffer();
    setClickedPropertyObj(clickedProperty.id);
};

function unmortgageProperty() {
    
    let unMortgagePrice = (clickedProperty.mortgagePrice * 2) + clickedProperty.mortgagePrice * .1;
    if(!gameFunctions.moneyCheckH(crntPlayer.money, unMortgagePrice)) {return;}; // TODO: show 'not enough money message'
    crntPlayer.money -= unMortgagePrice;
    propertyFunctions.unMortgagePropertyH(clickedProperty.id);
    clearOffer();
    setClickedPropertyObj(clickedProperty.id);
};

function buyBuilding() {

    if(!gameFunctions.moneyCheckH(crntPlayer.money, clickedProperty.buildingCost)) {return;}; // TODO: show 'not enough money message'
    crntPlayer.money -= clickedProperty.buildingCost;
    propertyFunctions.buyBuildingH(clickedProperty.id);
    clearOffer();
    setClickedPropertyObj(clickedProperty.id);
};

function sellBuilding() {

    gameFunctions.sellBuildingH(clickedProperty.id);
    crntPlayer.money += clickedProperty.buildingCost / 2;
};


function clearOffer() {
   showMortgageOffer.value = false;
   showUnmortgageOffer.value = false;
   showBuildOffer.value = false;
   showSellBuildingOffer.value = false;
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