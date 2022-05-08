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
import { onMounted, watch } from 'vue';
import { gameLogic, turnLogic } from '../../javascripts/stateStore';

onMounted(() => {

    insertCrntPlayerArrow();
});

// when turn ends, place the '-->' arrow
watch (
    () => gameLogic.value.whosTurnIndex,
    () => {insertCrntPlayerArrow()}
);

function insertCrntPlayerArrow() {

    if(document.getElementById('arrowWrapper')) {document.getElementById('arrowWrapper').remove();};

    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    var path1 = document.createElementNS("http://www.w3.org/2000/svg", 'path');

    svg.setAttribute("aria-hidden","true");
    svg.setAttribute('viewbox', '0 0 44.952 44.952');
    svg.setAttribute('width', '6vw');
    svg.setAttribute('height', '5vw');
    svg.setAttribute('id', 'arrowWrapper');
    path1.setAttribute('d', 'M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0 c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028 c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001 l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z');
    svg.appendChild(path1);

    document.getElementById(gameLogic.value.players[gameLogic.value.whosTurnIndex].name + 'hud').prepend(svg);
};

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
}
.player-wrapper {
    display:flex;
    align-items: center;
}

</style>