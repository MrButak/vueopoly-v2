<template>
<div class="main-wrapper">

    <div class="main-row-wrapper">
        <div class="main-column-wrapper">
            {{ turnLogic.value.crntPlayer.name }}
            <span class="input-wrapper">
                <text>$</text>
                <input type="text" size="10">
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
                <input type="text" size="10">
            </span>
            

            <span v-if="tradeeProperties.length > 0">

                <span v-for="prop in tradeeProperties[0]">
                    <!-- determine if any houses are in the group -->
                    <span class="prop-color-box" v-bind:style="'background-color:' prop.color"></span>
                    <span v-if="propertyFunctions.isAnyBuildingsInGroupH(propertyFunctions.getPropGroupFromPropH(prop))">
                        {{ prop.name }}
                    </span>
                    <span v-else>
                        <input type="checkbox">
                        {{ prop.name }}
                    </span>
                        
                    
                    
                
                </span>
            </span>

        </div>
    </div>

</div>
</template>

<script setup>

import { ref, computed, reactive, watch } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as tradeFunctions from '../../javascripts/tradeFunctions';
import * as propertyFunctions from '../../javascripts/propertyFunctions';

let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
let selectedTradee = ref(' ');
let tradeeProperties = reactive([]);


// get an array of all players, except for the current player
let tradeeArry = computed(() => {
    return gameLogic.value.players.filter((player => player.name != turnLogic.value.crntPlayer.name));
});

// when selected player changes
watch(
    () => selectedTradee.value,
    () => {getTradeeProperties(selectedTradee.value);}
);

function getTradeeProperties(playerId) {

    // remove all items from array
    tradeeProperties.splice(0, tradeeProperties.length);
    // add all available properties to array
    tradeeProperties.push(tradeFunctions.getEligiblePropertiesH(playerId));
};

</script>


<style>
.main-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
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
    width: 20px;
    height: 20px;
    
}
</style>