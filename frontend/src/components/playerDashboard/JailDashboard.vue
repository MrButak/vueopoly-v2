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
let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);


let playDashboard = ref(PlayDashboard);
let gameBoard = ref(GameBoard);



onMounted(() => {
    if(gameLogic.value.players[gameLogic.value.whosTurnIndex].turnsInJail == 4) {
        gameLogic.value.players[gameLogic.value.whosTurnIndex].turnsInJail = 0;
        gameLogic.value.players[gameLogic.value.whosTurnIndex].inJail = false;
        gameLogic.value.players[gameLogic.value.whosTurnIndex].position -= .5; // in jail position is 11.5, just visiting is 11
    }
});

function roll() {
    let dRoll = moveFunctions.rollDiceH()
    diceRoll.value = dRoll;
    diceRolled.value = true;

    if(dRoll[0] === dRoll[1]) {rolledDoubles();};
};

function endTurn() {

    diceRolled.value = false;
    crntPlayer.turnsInJail++;
    playDashboard.value.endTurn();
};

function rolledDoubles() {
    
    let moveAmount = diceRoll.value[0] + diceRoll.value[1];

    crntPlayer.position += (moveAmount - .5); // injail position is 11.5
    crntPlayer.turnsInJail = 0;
    crntPlayer.inJail = false;
    playDashboard.value.dtrmPropAction();

    turnLogic.value.crntDiceRoll[0] = diceRoll.value[0];
    turnLogic.value.crntDiceRoll[1] = diceRoll.value[1];
    //gameLogic.value.gameLogs.push({log: `${crntPlayer.value.name} rolled for ${turnLogic.value.crntDiceRoll[0]} ${turnLogic.value.crntDiceRoll[1]} DOUBLES and got out of Jail!`, color: `${crntPlayer.value.color}`});
    turnLogic.value.diceRolled = true;
};

// using a 'get out of jail free card, being in there 3 turns, or paying'
function getOutOfJail() {
    crntPlayer.position -= .5; // move to jail/just visiting
    crntPlayer.turnsInJail = 0;
    crntPlayer.inJail = false;
    // TODO endTurn()
};

</script>


<style>

</style>