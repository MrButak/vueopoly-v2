<template>

<div v-if="!startGame && askToContinueGame" class="full-page-centered">
    <div class="choose-players-wrapper">
        
        <text>Saved game found.</text>
        <div class="continue-game-btn-wrapper">
            <button @click="startGame = true; askToContinueGame = false" type="submit">Continue</button>
            <button @click="askToContinueGame = false" type="submit">New game</button>
        </div>
        
    </div>
</div>

<div v-if="!startGame && !askToContinueGame" class="full-page-centered">
    <div class="choose-players-wrapper">
        <div class="choose-players-div">

            <label for="player-count">Number of players:</label>
            <select v-model="playerCount" name="player-count" id="player-count">
                <option v-for="count in 7" v-bind:value="count+1">{{ count+1 }}</option>
                
            </select>
            <button @click="choosePlayerCount()" type="submit">Continue</button>
        </div>
    </div>

    <div v-if="!startGame" class="choose-players-wrapper">
        <div v-for="count in playerCount">
            <input name="playerName" type="text" v-bind:placeholder='"Player " + count + " name"'>
            <select>
                <option name="playerColor" v-for="color in playerColors" v-bind:value="color">{{ color }}</option>
            </select>
        </div>
        <button @click.prevent="submitUserProfile($event)" type="submit">Continue</button>
    </div>
</div>

</template>


<script setup>

import { ref, onMounted } from 'vue';
import initNewGame from '../javascripts/initNewGame';
import handleLs from '../javascripts/handleLs';
import {lsInUse, gameLogic, startGame} from '../javascripts/stateStore';


let playerCount = ref(2);
let askToContinueGame = ref();
let playerColors = ["green", "yellow", "white", "black", "pink", "brown", "purple", "grey"];


onMounted(() => {

    askToContinueGame.value = handleLs();
});


function submitUserProfile(event) {
    // TODO (1. find a better way to get input values (2. validation.
    let playerObj = {};
    for(let i = 0; i < playerCount.value; i++) {
        playerObj[`${i + 1}`] = {};
        playerObj[`${i + 1}`]['alias'] = event.path[1].children[i].children[0].value;
        playerObj[`${i + 1}`]['color'] = event.path[1].children[i].children[1].value;
    };
    initNewGame(playerObj);
    startGame.value = true;
};
 
</script>


<style scoped>
.full-page-centered {
    position: absolute;
}
.continue-game-btn-wrapper {
    display: flex;
    gap: 10px;
}


.choose-players-wrapper {
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 300px;
   background-color: wheat;
   padding: 10px;
}
.choose-players-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 0;

}
</style>