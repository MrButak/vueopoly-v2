<template>

<form id="property-form">

    <span v-for="propArry in filteredProperties">
        <div v-for="prop in propArry" class="prop-name-wrapper">
            <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
            <input @click="checkCanMortgage(prop.id); checkCanBuild(prop.id)" type="radio" name="property">
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
    <span v-if="compOfferMortgage">
        <p>Mortgage  {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice }} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="mortgageProperty($event)">Yes</button>
            <button @click.prevent="declineMortgageOffer">No</button>
        </span>
    </span>

    <span v-if="compOfferUnmortgage">
        <p>Unmortgage  {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice * .10 + computedEligibleProperty.mortgagePrice}} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="unmortgageProperty($event)">Yes</button>
            <button @click.prevent="declineUnmortgageOffer">No</button>
        </span>
    </span>

    <!-- buildings -->
    <span v-if="compOfferBuild">
        <p>Buy building on {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.buildingCost}} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="purchaseBuilding">Yes</button>
            <button @click.prevent="declineBuildingOffer">No</button>
        </span>
    </span>
    
</form>

<!-- TODO disable button that wasn't pressed -->
<span class="mortgage-btn-wrapper">
    <button v-if="compCanMortgage" @click="offerMortgage = true">Mortgage</button>
    <button v-if="compCanUnmortgage" @click="offerUnmortgage = true">Unmortgage</button>

    <button v-if="compCanBuild" @click="offerBuild = true">Buy Building</button>
</span>

</template>

<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
import * as propertyFunctions from '../../javascripts/propertyFunctions';
import * as gameFunctions from '../../javascripts/gameFunctions';

let canMortgage = ref(false);
let offerMortgage = ref(false);
let canUnmortgage = ref(false);
let offerUnmortgage = ref(false);

let canBuild = ref(false);
let offerBuild = ref(false);

let eligibleProperty = reactive({});
let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);


let compCanMortgage = computed(() => {return canMortgage.value});
let compOfferMortgage = computed(() => {return offerMortgage.value});
let compCanUnmortgage = computed(() => {return canUnmortgage.value});
let compOfferUnmortgage = computed(() => {return offerUnmortgage.value});

let compCanBuild = computed(() => {return canBuild.value});
let compOfferBuild = computed(() => {return offerBuild.value});

// returns all of current players properties ordered by group
let filteredProperties = computed(() => {

    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
    propStyleArry.forEach((item) => {
        filteredPropArry.push(crntPlayer.properties.filter((prop => prop.style === item)));
    });
    return filteredPropArry;
});

let computedEligibleProperty = computed(() => {
    return eligibleProperty.value;
});

function purchaseBuilding() {
    if(!gameFunctions.moneyCheckH(crntPlayer.money, computedEligibleProperty.value.buildingCost)) {
        return;
        // send message for not enough money
    };
    crntPlayer.money -= computedEligibleProperty.value.buildingCost;
    propertyFunctions.purchaseBuildingH(computedEligibleProperty.value.id);
    // remove building text from dom and see if property is still eligible to build on
    offerBuild.value = false;
    checkCanMortgage(computedEligibleProperty.value.id);
    checkCanBuild(computedEligibleProperty.value.id);
};

function declineBuildingOffer() {
    offerBuild.value = false;
};

function mortgageProperty() {

    propertyFunctions.mortgagePropertyH(computedEligibleProperty.value.id);
    crntPlayer.money += computedEligibleProperty.value.mortgagePrice;

    canMortgage.value = false;
    offerMortgage.value = false;
    canUnmortgage.value = true;

    
    canBuild.value = false;

    
};

function checkCanMortgage(propertyId) {

    // hide previous mortgage/unmortgage offer message on dom 
    offerMortgage.value = false;
    offerUnmortgage.value = false;
    // hide 'buy building btn'
    canBuild.value = false;

    // if property has buildings, can not mortgage
    if(propertyFunctions.areBuildingsInGroupH(propertyId)) {
        canMortgage.value = false;
        offerMortgage.value = false;
        //eligibleProperty.value = propertyFunctions.getEligiblePropObjH(propertyId);
        
        return;
    };

    // can mortgage
    if(propertyFunctions.canMortgagePropertyH(propertyId)) {
        canMortgage.value = true;
        canUnmortgage.value = false;
        eligibleProperty.value = propertyFunctions.getEligiblePropObjH(propertyId);
        return;
    };
    // can not mortgage
    canMortgage.value = false;
    canUnmortgage.value = true;
    eligibleProperty.value = propertyFunctions.getEligiblePropObjH(propertyId);
};

function declineMortgageOffer() {
    offerMortgage.value = false;
};

function declineUnmortgageOffer() {
    offerUnmortgage.value = false;
};

function unmortgageProperty() {
    if(!gameFunctions.moneyCheckH(crntPlayer.money, computedEligibleProperty.value.mortgagePrice * .1 + computedEligibleProperty.value.mortgagePrice)) {
        return;
        // TODO: send message for not enough money
    };
    propertyFunctions.unmortgagePropertyH(computedEligibleProperty.value.id);
    crntPlayer.money -= (computedEligibleProperty.value.mortgagePrice * .1) + computedEligibleProperty.value.mortgagePrice;
    canUnmortgage.value = false;
    offerUnmortgage.value = false;
    canMortgage.value = true;

    checkCanBuild(computedEligibleProperty.value.id);
};

function checkCanBuild(propertyId) {
    
    if(!propertyFunctions.canBuyBuildingH(propertyId)) {
        canBuild.value = false;
        return;
    };
    if(propertyFunctions.getBuildingCountH(propertyId) > 4) {return;};
    
    canBuild.value = true;
};

</script>

<style scoped>
#property-form {

}
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