<template>
    
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">
        
            <div class="player-stats-top-wrapper">
                <button class="stat-btn" v-if="gameLogic.value.view === 'play'" @click="gameLogic.value.view = 'manage'">Manage</button>
                <button class="stat-btn" v-if="gameLogic.value.view === 'manage' || gameLogic.value.view === 'trade'" @click="gameLogic.value.view = 'play'">Game</button>

                <div class="text-wrapper">
                    <span class="text-row">
                        <p>{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].name }}</p>
                        <p>${{ gameLogic.value.players[gameLogic.value.whosTurnIndex].money }}</p>
                    </span>
                    <p>{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].alias }}</p>
                </div>

                <button class="stat-btn" @click="gameLogic.value.view = 'trade'">Trade</button>
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

<style scoped>
* {
    text-transform: lowercase;
}
.player-dashboard-wrapper-main {

    position: absolute;
    
}
.player-dashboard-wrapper {
    
    width: 38.65vw;
    
    background-color: white;
    padding: 10px;
    height: 38.7vw;
}
.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
}
.text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%
}
.text-row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    
}

.stat-btn {
    width: 3.5rem;
    padding: .1rem;
}
</style>