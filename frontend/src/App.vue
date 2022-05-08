<template>
<span v-if="!gameLogic.startGame">
<NewGame />
</span>

<span v-if="startGame">
<GameBoard />
</span>
</template>


<script setup>

import GameBoard from './components/GameBoard.vue';
import NewGame from './components/NewGame.vue';
import { watch, computed } from 'vue';
import { lsInUse, gameLogic, startGame } from './javascripts/stateStore';

</script>


<style>

* {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
}
#app {
    background-color: #F1F1F1;
}

</style>
