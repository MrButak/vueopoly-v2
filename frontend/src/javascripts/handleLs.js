import { gameLogic, lsInUse } from '../javascripts/stateStore';




// Function handles all function calls below. Is the only one exported
function handleLs() {

    if(checkLsAvailable()) {
        
        // if game in ls found
        if(localStorage.getItem('gameLogic') != null && localStorage.getItem('gameLogic') !== '0') {
            restoreLs();
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

    localStorage.setItem('gamelogic', '0');
    // initially set value to 0 so I know wether to start a new game
    return;
};

// Function restores global state variables from local storage variables
let restoreLs = () => {

    // convert local storage string to object
    let lsGameLogic = localStorage.getItem('gamelogic');
    lsGameLogic = JSON.parse(lsGameLogic);

    console.log(lsGameLogic)
    console.log("pulled from ls after save");
    
    // set global state variables
    gameLogic.value = lsGameLogic;
    
    return;
};

// Function saves to local storage (usually after a turn has ended)
function saveToLs() {
    
    console.log("save to ls");

    localStorage.setItem('gamelogic', JSON.stringify(gameLogic.value));
}
export default handleLs
// export {handleLs, saveToLs};