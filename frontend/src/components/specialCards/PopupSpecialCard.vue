<template>

<div v-if="showSpecialCard" class="overlay">
    <div class="container">
        <div class="card">
            <span class="close-btn-wrapper">
                <button @click="closePopup" class="close-btn">X</button>
            </span>
            <h1 class="card-type">{{ specialCard.type }}</h1>
            <h2 class="card-desc">{{ specialCard.desc }}</h2>
            <!-- <p class="card-sub">this card may be kept until needed, or sold</p> -->
            <div class="card-image">
                <!-- <svg> use for get out of jail free -->
            </div>
        </div>
    </div>
</div>

</template>

<script setup>

import { reactive, ref } from 'vue';
let showSpecialCard = ref(false);

let specialCard = reactive({type: '', desc: ''});

function showPopup(cardType, cardObj) {

    if(cardType == 'communitychest') {specialCard.type = 'Community Chest'}
    else {specialCard.type = 'Chance'}
    specialCard.desc = cardObj.title;
    showSpecialCard.value = true;
};

function closePopup() {

    showSpecialCard.value = false;
};

defineExpose({showPopup});
 
</script>


<style scoped>

.overlay {
    
    background-color: #80808066;
    position: fixed;
    width: 100vw;
    height: 100vw;
    z-index: 5;
    top: 0vh;
    left: 0vw
}

.container {
  
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20vh;
    
}

.card {
    height: 250px;
    width: 420px;
    background: #F57F17;
    padding: 25px;
    background: radial-gradient(rgb(255, 171, 145), #F57F17);
    box-shadow: 2px 8px 6px gray,
                0px 10px 8px white;
    position: relative;
}
.close-btn-wrapper {
    position: absolute;
    inset: 0 0 0 95%;
}
.close-btn {
    padding: 5px;
}
.card-type {
  font-family: 'Pacifico', cursive;
  margin-bottom: 2rem;
}

.card-desc,
.card-sub {
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
}

.card-desc {
  font-size: 1.45rem;
  margin-bottom: 2.2rem;
}

.card-sub {
  font-size: 0.9rem;
}

.card-image {
  position: absolute;
  top: 40px;
  left: 250px;
}

.card-image svg {
    opacity: 0;
    animation: slide-in 500ms linear forwards;
}

@keyframes slide-in {
  from {
    opacity: 0;
    margin-left: 25%;
  }

  to {
    margin-left: 0%;
    opacity:1;
  }
}
</style>