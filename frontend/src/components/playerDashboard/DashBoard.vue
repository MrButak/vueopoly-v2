<template>
    
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">

            

            <div class="player-stats-top-wrapper">

                <button class="stat-btn" v-if="gameLogic.value.view === 'play'" @click="gameLogic.value.view = 'manage'">Manage</button>
                <button class="stat-btn" v-if="gameLogic.value.view === 'manage' || gameLogic.value.view === 'trade'" @click="gameLogic.value.view = 'play'">Game</button>

                <span class="text-column">
                    <p>{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].name }}-{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].alias }}</p>
                    <p>${{ gameLogic.value.players[gameLogic.value.whosTurnIndex].money }}</p>
                </span>     

                <button class="stat-btn" @click="gameLogic.value.view = 'trade'">Trade</button>
            </div>
            
            <span v-if="gameLogic.value.view === 'play' && !isPlayerInJail"><PlayDashboard /></span>
            <span v-if="gameLogic.value.view === 'manage'"><ManageDashboard /></span>
            <span v-if="gameLogic.value.view === 'play' && isPlayerInJail"><JailDashboard /></span>
            <span v-if="gameLogic.value.view === 'trade'"><TradeDashboard /></span>
            <span class="spacer"></span>
        </div>
    </div>
</template>

<script setup>

import { computed, watch } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import PlayDashboard from './PlayDashboard.vue';
import ManageDashboard from './ManageDashboard.vue';
import JailDashboard from './JailDashboard.vue';
import TradeDashboard from './TradeDashboard.vue';


let isPlayerInJail = computed(() => {
    return gameLogic.value.players[gameLogic.value.whosTurnIndex].inJail ? true : false;
});

// watch(
//     () => gameLogic.value.players[gameLogic.value.whosTurnIndex].money,
//     () => {animateMoney();}
// );


</script>

<style scoped>
* {
    text-transform: lowercase;
}
.player-dashboard-wrapper-main {

    position: absolute;
    margin: 5vw 0 0 2vw;
}
    
.player-dashboard-wrapper {
    
    display: flex;
    width: 34.65vw;
    background-color: white;
    border-radius: 4%;
    flex-direction: column;
    height: 27vw;
    overflow: hidden;
    padding: 1.3rem;
    border: 0.1rem solid black;
    
}

.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    
    overflow: hidden;
    align-items: center;
    padding: 0 0 1.7rem 0;
}
.text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
}
.text-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.stat-btn {
    width: 4.5rem;
    height: 1.6rem;
    border-radius: 10%;
    background: linear-gradient(#a3dff9, #4ccaf4);
    
}
.spacer {
    
}
</style>