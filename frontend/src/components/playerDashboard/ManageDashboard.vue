<template>
<form>
<span v-for="propArry in filteredProperties">
    <div v-for="prop in propArry" class="prop-name-wrapper">
        
        <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
        <p>{{ prop.name }}</p>
        <input @click="checkCanMortgage($event, prop.id)" type="checkbox">
    </div>
</span>

<button v-if="canMortgage" @click.prevent="mortgageProperty">Mortgage</button>
</form>

</template>

<script setup>
import { computed } from '@vue/reactivity';
import { onMounted, reactive, ref } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
import * as propertyFunctions from '../../javascripts/propertyFunctions'

let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);
let buildingPropIdArry = reactive([]);
let mortgagePropIdArry = reactive([]);
let canBuild = ref(false);
let canMortgage = ref(false);
let buildingCost = ref(0);

// returns all of current players properties
let filteredProperties = computed(() => {

    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
    propStyleArry.forEach((item) => {
        filteredPropArry.push(crntPlayer.properties.filter((prop => prop.style === item)));
    });
    return filteredPropArry;
});

// function checkGroup(event, id) {

//     // TODO make exceptions for railroad, utilities
//     if(id === 'railroad' || id === 'utilities') {
//         // check to see if can mortgage / unmortgage
//         return;
//     };

//     // add checked properties to an array
//     if(event.target.checked) {
//         buildingPropIdArry.push(id);

//         // check if all properties in group are owned
//         if(propertyFunctions.canBuyBuildingH(buildingPropIdArry)) {
//             canBuild.value = true;
//             // get building cost for property
//             buildingCost.value = propertyFunctions.getBuildingCostH(buildingPropIdArry[0]);
            
//         };
//     }
//     // remove unchecked properties from array
//     else {buildingPropIdArry.splice(buildingPropIdArry.indexOf(id))};
    
// }

function checkCanMortgage(event, propertyId) {

    if(event.target.checked) {
        console.log(propertyId)
        mortgagePropIdArry.push(propertyId);

        if(propertyFunctions.canMortgagePropertyH(mortgagePropIdArry)) {
            canMortgage.value = true;
        }
    }
    
    else {
        // remove propertyId from array
        mortgagePropIdArry.splice(mortgagePropIdArry.indexOf(propertyId));
        console.log(mortgagePropIdArry)
        // if no checked properties, remove mortgage, unmortgage button
        if(mortgagePropIdArry.length < 1) {console.log(mortgagePropIdArry); canMortgage.value = false}
    };
};

function mortgageProperty(event) {
    console.log(event)
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
</style>