<template>

    <div class="overlay">
        <div class="container">




            <div class="card">


                <span class="close-btn-wrapper">
                    <button @click="closeTradeView" class="close-btn">X</button>
                </span>

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
                    <span class="property-wrapper" v-for="prop in tradeeProperties[0]">
                        <span class="property-wrapper">

                            <!-- determine if any houses are in the group -->
                            <input @change="storeTradeeItems" type="checkbox" v-bind:value="prop.id"
                                v-if="!propertyFunctions.isAnyBuildingsInGroupH(propertyFunctions.getPropGroupFromPropH(prop))">

                            <span class="prop-color-box" v-bind:style="{ 'background-color': prop.color }"></span>
                            {{ prop.name }}
                        </span>
                    </span>
                </span>
            </div>
        </div>



    </div>
                
            </div>
        </div>
    </div>


    <!-- <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">
        
            <div class="player-stats-top-wrapper">
                
                
                    <text>{{ turnLogic.value.crntPlayer.name }}-{{ turnLogic.value.crntPlayer.alias }}</text>
                    <text>${{ turnLogic.value.crntPlayer.money }}</text>
            </div>
            
             
        </div>
    </div> -->




    <!-- <div class="main-wrapper">

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
                    <span class="property-wrapper" v-for="prop in tradeeProperties[0]">
                        <span class="property-wrapper">

                            
                            <input @change="storeTradeeItems" type="checkbox" v-bind:value="prop.id"
                                v-if="!propertyFunctions.isAnyBuildingsInGroupH(propertyFunctions.getPropGroupFromPropH(prop))">

                            <span class="prop-color-box" v-bind:style="{ 'background-color': prop.color }"></span>
                            {{ prop.name }}
                        </span>
                    </span>
                </span>



            </div>
        </div>

    </div> -->
</template>

<script setup>

import { ref, computed, reactive, watch } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import * as tradeFunctions from '../../javascripts/tradeFunctions';
import * as propertyFunctions from '../../javascripts/propertyFunctions';


let selectedTradee = ref(' ');
let tradeeProperties = reactive([]);
let tradeeItems = reactive([]);


// get an array of all players, except for the current player
let tradeeArry = computed(() => {
    return gameLogic.value.players.filter((player => player.name != turnLogic.value.crntPlayer.name));
});

// when selected player changes
watch(
    () => selectedTradee.value,
    () => { getTradeeProperties(selectedTradee.value); }
);

function getTradeeProperties(playerId) {

    // remove all items from array
    tradeeProperties.splice(0, tradeeProperties.length);
    // add all available properties to array
    tradeeProperties.push(tradeFunctions.getEligiblePropertiesH(playerId));
};

function storeTradeeItems(event) {

    if (event.target.checked) { tradeeArry.push(event.target.value); }
    else { tradeeArry.splice(event.targe.value, 1); };
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
    width: 10px;
    height: 10px;

}
</style>