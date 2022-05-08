<template>
<span v-show="showComponent"><PlayDashboard ref="playDashboard"/></span>

<p>You are in jail</p>
<p>Roll Doubles or use card to get out...</p>
<p v-if="diceRolled">{{ diceRoll[0] }} , {{ diceRoll[1] }}</p>
<button v-if="!diceRolled" @click="roll()">roll for doubles</button>
<button v-if="diceRolled" @click="endTurn">End Turn</button>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as moveFunctions from '../../javascripts/moveFunctions';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import PlayDashboard from '../playerDashboard/PlayDashboard.vue';


let diceRoll = reactive([]);
let diceRolled = ref(false);
let showComponent = ref(false); // to call function from PlayDashboard.vue

let playDashboard = ref(PlayDashboard);

onMounted(() => {
    if(gameLogic.value.players[gameLogic.value.whosTurnIndex].turnsInJail > 3) {
        getOutOfJail();
    };
});

function roll() {
    // let dRoll = moveFunctions.rollDiceH()
    diceRoll = moveFunctions.rollDiceH();
    diceRolled.value = true;
    turnLogic.value.crntPlayer.turnsInJail++;
    if(diceRoll[0] === diceRoll[1]) {rolledDoubles();};
};

function endTurn() {

    diceRolled.value = false;
    turnLogic.value.crntPlayer.turnsInJail++;
    playDashboard.value.endTurn();
};

function rolledDoubles() {
    
    let moveAmount = diceRoll[0] + diceRoll[1];

    gameLogic.value.players[gameLogic.value.whosTurnIndex].position += (moveAmount - .5); // injail position is 11.5
    gameLogic.value.players[gameLogic.value.whosTurnIndex].turnsInJail = 0;
    gameLogic.value.players[gameLogic.value.whosTurnIndex].inJail = false;
    
    turnLogic.value.crntDiceRoll = diceRoll;
    
    //gameLogic.value.gameLogs.push({log: `${crntPlayer.value.name} rolled for ${turnLogic.value.crntDiceRoll[0]} ${turnLogic.value.crntDiceRoll[1]} DOUBLES and got out of Jail!`, color: `${crntPlayer.value.color}`});
    turnLogic.value.diceRolled = true;
    playDashboard.value.dtrmPropAction();
};

// using a 'get out of jail free card, being in there 3 turns, or paying'
function getOutOfJail() {
    gameLogic.value.players[gameLogic.value.whosTurnIndex].position -= .5; // move to jail/just visiting
    gameLogic.value.players[gameLogic.value.whosTurnIndex].turnsInJail = 0;
    gameLogic.value.players[gameLogic.value.whosTurnIndex].inJail = false;
};

</script>


<style>

</style>