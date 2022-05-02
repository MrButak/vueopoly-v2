<template>
<span v-if="!gameLogic.startGame">
<NewGame />
</span>

<span v-if="gameLogic.startGame">
<GameBoard />
<Dashboard />
</span>
</template>


<script setup>

import GameBoard from './components/GameBoard.vue';
import NewGame from './components/NewGame.vue';
import Dashboard from './components/playerDashboard/DashBoard.vue';
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
