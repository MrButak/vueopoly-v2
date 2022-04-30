<template>
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">
            

            <div class="player-stats-top-wrapper">
                <button v-if="dashboardView === 'play'" @click="dashboardView = 'manage'">Manage</button>
                <button v-if="dashboardView === 'manage'" @click="dashboardView = 'play'">Game</button>
                <text>{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].name }}</text>
                <text>{{ gameLogic.value.players[gameLogic.value.whosTurnIndex].alias }}</text>
                <text>${{ gameLogic.value.players[gameLogic.value.whosTurnIndex].money }}</text>
                <button>Trade</button>
            </div>

            <span v-if="dashboardView === 'play'"><PlayDashboard /></span>
            <span v-if="dashboardView === 'manage'"><ManageDashboard /></span>
            
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
import PlayDashboard from './PlayDashboard.vue';
import ManageDashboard from './ManageDashboard.vue';

let dashboardView = ref('play');

</script>

<style>
.player-dashboard-wrapper-main {

    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 56vw;
    top: 13.4vw;
    margin: 3rem 0 3rem 3rem;

    /*position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50vw;
    top: 31.4vw;
    left: 25vw;*/
}

.player-dashboard-wrapper {
    
    width: 38.4vw;
    border: 1px solid black;
    background-color: white;
    padding: 10px;
    height: 30vw;
    /*width: 47vw;
    border: 1px solid black;
    background-color: white;
    padding: 10px;*/
}
    


.player-stats-top-wrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 4vw;
    padding: 0 0 10px 0;
}
</style>