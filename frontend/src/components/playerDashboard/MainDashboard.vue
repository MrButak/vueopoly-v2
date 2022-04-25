<template>

<div class="player-dashboard-wrapper-main">

    <div class="player-dashboard-wrapper">
    
        <div class="player-stats-top-wrapper">
            <button>Manage</button>
            <text>{{ crntPlayer.name }} - {{ crntPlayer.alias }}</text>
            <text>${{ crntPlayer.money }}</text>
            <button>Trade</button>
        </div>

        <div class="log-and-dice-wrapper">

            <div class="gamelog-wrapper-main">
                <p v-for="log in gameLogic.gameLog" v-bind:style="{ 'color': log.style }">{{ log.log }}</p>
            </div>

            <div class="show-dice-wrapper-main">
               
            </div>
        </div>

        <div class="roll-dice-end-turn-btn-wrapper">
            


           
            <button class="endTurnBtn">End Turn</button>
        </div>

      

    </div>
</div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import { lsInUse, gameLogic } from '../../javascripts/stateStore';

let crntPlayer = ref({})

onMounted(() => {
    crntPlayer.value = gameLogic.value.players[gameLogic.value.whosTurnIndex];
    console.log(crntPlayer.value)
})

</script>

<style scoped>
.player-dashboard-wrapper-main {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    top: 31.4vw;
    left: 25vw;
    
   
}
.player-dashboard-wrapper {
    width: 47vw;
    border: 1px solid black;
    background-color: white;
    padding: 10px;
    
}
.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 4vw;
    padding: 0 0 10px 0;
}
.game-message-wrapper {
    display: flex;
    justify-content: space-around;
    padding: 10px 0 0 0;
}
.roll-dice-end-turn-btn-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.log-and-dice-wrapper {
    display: flex;
    justify-content: space-between;
    
}
.gamelog-wrapper-main {
    display: flex;
    flex-direction: column;
    height: 15vw;
    background-color: black;
    border: 1px solid black;
    overflow-y: scroll;
    width: 80%;
}
.show-dice-wrapper-main {
    display: flex;
    height:  15vw;
    border: 1px solid black;
    width: 18vw;
}

</style>