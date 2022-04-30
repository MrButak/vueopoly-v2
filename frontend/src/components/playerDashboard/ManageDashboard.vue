<template>
    <p>test test test</p>
</template>

<script setup>

function testy() {
    console.log('hey parent component is calling child components function !!!!!@@@@')
}


defineExpose({testy})
</script>

<style scoped>


</style>