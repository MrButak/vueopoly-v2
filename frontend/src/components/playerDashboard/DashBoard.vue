<template>
    <div class="player-dashboard-wrapper-main">
        <div class="player-dashboard-wrapper">
        
            <div class="player-stats-top-wrapper">
                <button v-if="dashboardView === 'play'" @click="dashboardView = 'manage'">Manage</button>
                <button v-if="dashboardView === 'manage'" @click="dashboardView = 'play'">Game</button>
                    <text>{{ turnLogic.value.crntPlayer.name }}</text>
                    <text>{{ turnLogic.value.crntPlayer.alias }}</text>
                    <text>${{ turnLogic.value.crntPlayer.money }}</text>
                <button>Trade</button>
            </div>
            
                <span v-if="dashboardView === 'play' && !isPlayerInJail"><PlayDashboard /></span>
                <span v-if="dashboardView === 'manage'"><ManageDashboard /></span>
                <span v-if="dashboardView === 'play' && isPlayerInJail"><JailDashboard /></span>
        </div>
        
    </div>

</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import PlayDashboard from './PlayDashboard.vue';
import ManageDashboard from './ManageDashboard.vue';
import JailDashboard from './JailDashboard.vue';

let dashboardView = ref('play');


let isPlayerInJail = computed(() => {
    return turnLogic.value.crntPlayer.inJail ? true : false;
});




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