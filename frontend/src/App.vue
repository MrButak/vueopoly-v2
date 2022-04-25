<template>

<span v-if="!gameLogic.startGame">
<NewGame />
</span>

<span v-if="gameLogic.startGame">
<GameBoard />
<MainDashboard />
</span>



</template>


<script setup>

import GameBoard from './components/GameBoard.vue';
import NewGame from './components/NewGame.vue';
import MainDashboard from './components/playerDashboard/MainDashboard.vue';
import { lsInUse, gameLogic } from './javascripts/stateStore';
</script>




<style>
* {
    
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    
    
}
#app {

}
</style>
