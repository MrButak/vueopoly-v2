import { gameLogic, lsInUse, turnLogic } from '../javascripts/stateStore';

// Function handles all function calls below. Is the only one exported
function handleLs() {

    if(checkLsAvailable()) {
        
        // if game in ls found
        if(localStorage.getItem('gameLogic') != null && localStorage.getItem('gameLogic') != '0') {
            restoreLs();
            lsInUse.value = true; // set global state
            return true; // true for yes, ask to continue game
        };
        // if no game found in ls, but ls is available
        if(checkLsAvailable) {
            lsInUse.value = true; // set global state
            setLs();
            return false;
        };
    };
    // ls not available for this browser
    lsInUse.value = false; // set global state
    return false;
}

// Function checks if local storage is available for use on browser
let checkLsAvailable = () => {

    try {
        localStorage.setItem('test', 'is local storage available?');
        localStorage.removeItem('test');
        
        return true;
    }
    // local storage not available
    catch (error) {
        console.log(error)
        return false;
    };
};

// Function sets local storage objects if doesn't exist
let setLs = () => {

    localStorage.setItem('gameLogic', '0');
    // initially set value to 0 so I know wether to start a new game
    return;
};

// Function restores global state variables from local storage variables
let restoreLs = () => {

    // convert local storage string to object
    let lsGameLogic = localStorage.getItem('gameLogic');
    let lsTurnLogic = localStorage.getItem('turnLogic');
    lsTurnLogic = JSON.parse(lsTurnLogic)
    lsGameLogic = JSON.parse(lsGameLogic);
    
    // set global state variables
    gameLogic.value = lsGameLogic;
    turnLogic.value = lsTurnLogic;
    gameLogic.value.startGame = false;
    return;
};

// Function saves to local storage (usually after a turn has ended)
function saveToLs() {
    
    console.log("save to ls");

    
}
export default handleLs
// export {handleLs, saveToLs};