<template>

<form id="property-form">

    <span v-for="propArry in filteredProperties">
        <div v-for="prop in propArry" class="prop-name-wrapper">
            <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
            <input @click="checkCanMortgage($event, prop.id);" type="radio" name="property">
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

    <span v-if="offerMortgage">
        <p>Unmortgage  {{ computedEligibleProperty.name }} for ${{ computedEligibleProperty.mortgagePrice }} ?</p>
        <span class="mortgage-yes-no-btn-wrapper">
            <button @click.prevent="mortgageProperty($event)">Yes</button>
            <button @click.prevent="declineMortgageOffer">No</button>
        </span>
    </span>
    
</form>

<span class="mortgage-btn-wrapper">
    <button v-if="canMortgage" @click="offerMortgage = true">Mortgage</button>
    <button v-if="canUnmortgage" @click="offerUnmortgage = true">Unmortgage</button>
</span>

</template>

<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
import * as propertyFunctions from '../../javascripts/propertyFunctions'

let eligibleProperty = reactive({});

let canMortgage = ref(false);
let canUnmortgage = ref(false);
let offerMortgage = ref(false);
let offerUnmortgage = ref(false);


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


function checkCanMortgage(event, propertyId) {
    offerMortgage.value = false;

    if(propertyFunctions.canMortgagePropertyH(propertyId)) {
        canMortgage.value = true;
        eligibleProperty.value = propertyFunctions.getMortgageObjH(propertyId);
        console.log(eligibleProperty.value)
        return;
    };
    canMortgage.value = false;
    eligibleProperty.value = {};
};

function declineMortgageOffer() {
    offerMortgage.value = false;
};

function mortgageProperty() {
    propertyFunctions.mortgagePropertyH(computedEligibleProperty.value.id);
    crntPlayer.money += computedEligibleProperty.value.mortgagePrice;

    canMortgage.value = false;
    offerMortgage.value = false;
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