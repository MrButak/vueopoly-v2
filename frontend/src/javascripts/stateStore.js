import { ref, reactive } from 'vue';

const lsInUse = ref(false);
const gameLogic = reactive({});
const turnLogic = reactive({});

// function gameState() {

//   // other functions, for example to mutate message ref
  
//     return {
//         lsInUse,
//         gameLogic
//     };
// };

export {lsInUse, gameLogic, turnLogic}