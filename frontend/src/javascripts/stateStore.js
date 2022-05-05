import { ref, reactive } from 'vue';

const lsInUse = ref(false);
const gameLogic = reactive({});
const turnLogic = reactive({});
const startGame = ref(false);

export { lsInUse, gameLogic, turnLogic, startGame }
