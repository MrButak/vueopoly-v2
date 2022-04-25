import { ref } from 'vue';

const lsInUse = ref(false);
const gameLogic = ref({})

// function gameState() {

//   // other functions, for example to mutate message ref
  
//     return {
//         lsInUse,
//         gameLogic
//     };
// };

export {lsInUse, gameLogic}