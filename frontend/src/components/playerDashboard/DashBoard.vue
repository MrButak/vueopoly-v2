<template>
    
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">
        
            <div class="player-stats-top-wrapper">
                <button v-if="gameLogic.value.view === 'play'" @click="gameLogic.value.view = 'manage'">Manage</button>
                <button v-if="gameLogic.value.view === 'manage' || gameLogic.value.view === 'trade'" @click="gameLogic.value.view = 'play'">Game</button>
                    <text>{{ turnLogic.value.crntPlayer.name }}-{{ turnLogic.value.crntPlayer.alias }}</text>
                    <text id="player-money">${{ gameLogic.value.players[gameLogic.value.whosTurnIndex].money }}</text>
                <button @click="gameLogic.value.view = 'trade'">Trade</button>
            </div>
            
            <span v-if="gameLogic.value.view === 'play' && !isPlayerInJail"><PlayDashboard /></span>
            <span v-if="gameLogic.value.view === 'manage'"><ManageDashboard /></span>
            <span v-if="gameLogic.value.view === 'play' && isPlayerInJail"><JailDashboard /></span>
            <span v-if="gameLogic.value.view === 'trade'"><TradeDashboard /></span>
            
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
    return turnLogic.value.crntPlayer.inJail ? true : false;
});

// watch(
//     () => gameLogic.value.players[gameLogic.value.whosTurnIndex].money,
//     () => {animateMoney();}
// );


</script>

<style>
.player-dashboard-wrapper-main {

    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 56vw;
    top: 18.4vw;
    margin: 3rem 0 3rem 3rem;
}
.player-dashboard-wrapper {
    
    width: 38.4vw;
    border: 1px solid black;
    background-color: white;
    padding: 10px;
    height: 24vw;
}
.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 4vw;
    padding: 0 0 10px 0;
}
</style>