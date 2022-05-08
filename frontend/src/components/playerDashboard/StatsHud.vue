<template>

<div class="player-stats-wrapper-main">
    
    <div class="logoBox">
    <span class="logoName">vueopoly</span>
</div>

    <div v-for="player in gameLogic.value.players" class="player-stat-wrapper">
        
        <span v-bind:id="player.name + 'hud'" class="player-wrapper">
            <span class="player-color-wrapper" v-bind:style="{ 'background-color': player.color }"></span>
            <h3>{{ player.name }}-{{ player.alias }} ${{ player.money }}</h3>
        </span>
    </div>

</div>

</template>


<script setup>
import { onMounted, reactive, ref, computed, watch } from 'vue';
import { crntPlayer } from '../../javascripts/constants';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';

onMounted(() => {

    insertCrntPlayerArrow();
});

watch (
    () => gameLogic.value.whosTurnIndex,
    () => {insertCrntPlayerArrow()}
);

function insertCrntPlayerArrow() {

    if(document.getElementById('arrowWrapper')) {document.getElementById('arrowWrapper').remove();};

    let arrow = document.createElement('span');
    arrow.style.fontSize = '3vw';
    
    arrow.textContent = '-->';
    arrow.id = 'arrowWrapper';

    document.getElementById(gameLogic.value.players[gameLogic.value.whosTurnIndex].name + 'hud').prepend(arrow);
    
}



</script>


<style scoped>


.logoBox {
	
    display: flex;
    width: 30vw;
    height: 18%;
    background: #ed1b24;
    border: 3px solid black;
    text-align: center;
    box-shadow: inset 0px 2px 12px 0px white;
    justify-content: center;
    text-transform: uppercase;
    align-items: center;
}
.logoName {
	font-size: 4.6vw;
    color: white;
    font-family: futura;
    text-shadow: -4px 3px 0px black;
    -webkit-text-fill-color: white;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #cfc2c3;
}
.card-box {
    position: absolute;
    width: 10%;
    height: 7vw;
}

.card-blue {
	background: linear-gradient(#4ccaf4, #a3dff9);
	transform: rotateZ(-45deg) translateX(-13%) translateY(66%);
}
.card-blue-inside {
    background: linear-gradient(#a3dff9, #4ccaf4);
    width: 94%;
    height: 94%;
    margin: 0.3vw auto;
    position: relative;
}
.card-orange {
	

    background: linear-gradient(#f99120, #f57420);
    transform: rotateZ(-45deg) translateX(-13%) translateY(521%);
}
.card-orange-inside {
    background: linear-gradient(#f57420, #f99120);
    width: 94%;
    height: 94%;
    margin: 0.3vw auto;
    position: relative;
}

.player-stats-wrapper-main {

    position: absolute;
    width: 33vw;
    height: 35vw;
    inset: 7.5% 0 0 63vw;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 0 0 2rem;
    gap: 1rem;
}
.player-stat-wrapper {
    font-size: 1.1vw;
}
.player-color-wrapper {
    width: 2.5vw;
    height: 2.5vw;
    border-radius: 50%;
    /* position: absolute; */
    /* margin: 0.5rem 0 0 -2.5rem; */

}
.player-wrapper {
    display:flex;
    align-items: center;
}

</style>