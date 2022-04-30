<template>
<span v-for="propArry in filteredProperties">
    <div v-for="prop in propArry" class="prop-name-wrapper">
        
        <span v-bind:style="{'background-color': prop.color}" class="prop-color-box"></span>
        <p>{{ prop.name }}</p>
    </div>
</span>
    

</template>

<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);

// returns all of current players properties
let filteredProperties = computed(() => {

    let filteredPropArry = [];
    let propStyleArry = ['purple', 'lightgreen', 'violet', 'orange', 'red', 'yellow', 'darkgreen', 'darkblue', 'railroad', 'utilities'];
    propStyleArry.forEach((item) => {
        filteredPropArry.push(crntPlayer.properties.filter((prop => prop.style === item)));
    });
    return filteredPropArry;
    
});

</script>

<style scoped>

.prop-name-wrapper {
    display: flex;
}
.prop-color-box {
    width: 20px;
    height: 20px;
    
}
</style>