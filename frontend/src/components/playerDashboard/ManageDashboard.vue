<template>

<form id="property-form">

    <span v-for="propArry in filteredProperties">
        <div v-for="prop in propArry" class="prop-name-wrapper">
            <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
            <input @click="checkCanMortgage(prop.id); checkCanBuild(prop.id)" type="radio" name="property">
            <p v-if="!prop.mortgaged">{{ prop.name }}</p>
            <p v-if="prop.mortgaged" style="text-decoration: line-through;">{{ prop.name }}</p>
        </div>
    </span>

    <span v-if="offerMortgage">
        <p>Mortgage  {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice }} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="mortgageProperty($event)">Yes</button>
            <button @click.prevent="declineMortgageOffer">No</button>
        </span>
    </span>

    <span v-if="offerUnmortgage">
        <p>Unmortgage  {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice * .10 + computedEligibleProperty.mortgagePrice}} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="unmortgageProperty($event)">Yes</button>
            <button @click.prevent="declineUnmortgageOffer">No</button>
        </span>
    </span>

    <span v-if="offerBuild">
        <p>Buy building on {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice * .10 + computedEligibleProperty.mortgagePrice}} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="unmortgageProperty($event)">Yes</button>
            <button @click.prevent="declineUnmortgageOffer">No</button>
        </span>
    </span>
    
</form>

<span class="mortgage-btn-wrapper">
    <button v-if="canMortgage" @click="offerMortgage = true">Mortgage</button>
    <button v-if="canUnmortgage" @click="offerUnmortgage = true">Unmortgage</button>

    <button v-if="canBuild">Buy Building</button>
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

function mortgageProperty() {

    propertyFunctions.mortgagePropertyH(computedEligibleProperty.value.id);
    crntPlayer.money += computedEligibleProperty.value.mortgagePrice;

    canMortgage.value = false;
    offerMortgage.value = false;
    canUnmortgage.value = true;

    // see if property is now eligible to build on (if not working, could try a document.checked = true or a click())
    checkCanMortgage(computedEligibleProperty.value.id);
    checkCanBuild(computedEligibleProperty.value.id);
    
};

function checkCanMortgage(propertyId) {

    // hide previous mortgage/unmortgage offer message on dom 
    offerMortgage.value = false;
    offerUnmortgage.value = false;
    // hide 'buy building btn'
    canBuild.value = false;

    // can mortgage
    if(propertyFunctions.canMortgagePropertyH(propertyId)) {
        canMortgage.value = true;
        canUnmortgage.value = false;
        eligibleProperty.value = propertyFunctions.getMortgageObjH(propertyId);
        return;
    };
    // can not mortgage
    canMortgage.value = false;
    canUnmortgage.value = true;
    eligibleProperty.value = propertyFunctions.getMortgageObjH(propertyId);
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
};

function checkCanBuild(propertyId) {
    
    if(!propertyFunctions.canBuyBuildingH(propertyId)) {
        canBuild.value = false;
        return;
    };
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
.mortgage-btn-wrapper {

}
.mortgage-yes-no-btn-wrapper {
    display: flex;
    width: 100%;
    gap: 15px;
}
</style>