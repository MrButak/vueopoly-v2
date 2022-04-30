<template>
    <!-- <p v-for="prop in properties">{{ prop.name }}</p> -->
    <p v-for="prop in properties">{{ prop.name }}</p>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';
import { gameLogic } from '../../javascripts/stateStore';
let crntPlayer = reactive(gameLogic.value.players[gameLogic.value.whosTurnIndex]);

let properties = computed(() => {
    return crntPlayer.properties
})
</script>

<style scoped>


</style>