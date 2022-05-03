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
            <select v-model="selectedTradee">
                <option v-for="player in tradeeArry">{{ player.name }}</option>
            </select>
            
            <span class="input-wrapper">
                <text>$</text>
                <input type="text" size="10">
            </span>
            <span v-if="selectedTradee != ' '" v-for="prop in gameLogic.value.players[gameLogic.value.players.findIndex((player => player.name == selectedTradee))].properties">
                <input type="checkbox">
                <p>{{ prop.name }}</p>
            </span>
            
            
        </div>

    </div>

</div>
</template>


<script setup>
import { ref, computed } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';


let selectedTradee = ref(' ');

// get an array of all players, except for the current player
let tradeeArry = computed(() => {
    return gameLogic.value.players.filter((player => player.name != turnLogic.value.crntPlayer.name));
});


let tradeeAssets = computed(() => {
    if(selectedTradee != ' ') {
        let index = gameLogic.value.players.findIndex((player => player.name == selectedTradee.name));
        return gameLogic.value.players[index];
    }
});



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
</style>