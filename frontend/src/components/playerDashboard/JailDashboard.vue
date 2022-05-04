<template>
<span v-show="showComponent"><PlayDashboard ref="playDashboard"/></span>
<span v-show="showComponent"><GameBoard ref="gameBoard"/></span>
<p>You are in jail</p>
<p>Roll Doubles or use card to get out...</p>
<p v-if="diceRolled">{{ diceRoll.value[0] }} , {{ diceRoll.value[1] }}</p>
<button v-if="!diceRolled" @click="roll()">roll for doubles</button>
<button v-if="diceRolled" @click="endTurn">End Turn</button>
</template>


<script setup>
import { onMounted, reactive, ref } from 'vue';
import * as moveFunctions from '../../javascripts/moveFunctions';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';
import PlayDashboard from '../playerDashboard/PlayDashboard.vue';
import GameBoard from '../GameBoard.vue';

let diceRoll = reactive([]);
let diceRolled = ref(false);
let showComponent = ref(false); // to call function from PlayDashboard.vue

let playDashboard = ref(PlayDashboard);
let gameBoard = ref(GameBoard);

onMounted(() => {
    if(turnLogic.value.crntPlayer.turnsInJail > 3) {
        getOutOfJail();
    };
});

function roll() {
    let dRoll = moveFunctions.rollDiceH()
    diceRoll.value = dRoll;
    diceRolled.value = true;
    turnLogic.value.crntPlayer.turnsInJail++;
    if(dRoll[0] === dRoll[1]) {rolledDoubles();};
};

function endTurn() {

    diceRolled.value = false;
    turnLogic.value.crntPlayer.turnsInJail++;
    playDashboard.value.endTurn();
};

function rolledDoubles() {
    
    let moveAmount = diceRoll.value[0] + diceRoll.value[1];

    turnLogic.value.crntPlayer.position += (moveAmount - .5); // injail position is 11.5
    turnLogic.value.crntPlayer.turnsInJail = 0;
    turnLogic.value.crntPlayer.inJail = false;
    playDashboard.value.dtrmPropAction();

    turnLogic.value.crntDiceRoll[0] = diceRoll.value[0];
    turnLogic.value.crntDiceRoll[1] = diceRoll.value[1];
    //gameLogic.value.gameLogs.push({log: `${crntPlayer.value.name} rolled for ${turnLogic.value.crntDiceRoll[0]} ${turnLogic.value.crntDiceRoll[1]} DOUBLES and got out of Jail!`, color: `${crntPlayer.value.color}`});
    turnLogic.value.diceRolled = true;
};

// using a 'get out of jail free card, being in there 3 turns, or paying'
function getOutOfJail() {
    turnLogic.value.crntPlayer.position -= .5; // move to jail/just visiting
    turnLogic.value.crntPlayer.turnsInJail = 0;
    turnLogic.value.crntPlayer.inJail = false;
};

</script>


<style>

</style>