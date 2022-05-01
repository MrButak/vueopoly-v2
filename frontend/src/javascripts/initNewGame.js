import gameJson from '../../debugVueopoly.json';
import {lsInUse, gameLogic, turnLogic} from '../javascripts/stateStore';
import * as gameConstants from './constants';
import { ref, reactive } from 'vue';
let playerPositionObj = {

    player1: {
        position: {
            go: {
                inset: '90% 0 0 90%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '89% 0 0 74%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 90%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 90%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '75% 0 0 0',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '0 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '0 0 0 0',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 90%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '0 0 0 88%',
                width: '12.5%',
                height: '25%'
            }
        }
    },

    player2: {
        position: {
            go: {
                inset: '90% 0 0 80%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '89% 0 0 49%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 80%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 80%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '50% 0 0 0',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '10% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '0 0 0 25%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 80%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '25% 0 0 88%',
                width: '12.5%',
                height: '25%'
            }
        }
    },
    player3: {
        position: {
            go: {
                inset: '90% 0 0 70%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '89% 0 0 24%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 70%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 70%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '25% 0 0 0',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '20% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '0 0 0 50%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 70%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '50% 0 0 88%',
                width: '12.5%',
                height: '25%'
            }
        }
    },
    player4: {
        position: {
            go: {
                inset: '90% 0 0 60%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '89% 0 0 0%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 60%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 60%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '0 0 0 0',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '30% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '0 0 0 75%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 60%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '75% 0 0 88%',
                width: '12.5%',
                height: '25%'
            }
        }
    },
    player5: {
        position: {
            go: {
                inset: '90% 0 0 50%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '78% 0 0 74%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 50%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 50%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '75% 0  0 12.5%',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '40% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '11% 0 0 0',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 50%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '0 0 0 76%',
                width: '12.5%',
                height: '25%'
            }
        }
    },
    player6: {
        position: {
            go: {
                inset: '90% 0 0 40%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '78% 0 0 49%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
               inset: '90% 0 0 40%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 40%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '50% 0 0 12.5%',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '50% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '11% 0 0 25%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 40%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '25% 0 0 76%',
                width: '12.5%',
                height: '25%'
            }
        }
    },
    player7: {
        position: {
            go: {
                inset: '90% 0 0 30%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '78% 0 0 24%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
               inset: '90% 0 0 30%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 30%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '25% 0 0 12.5%',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '60% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '11% 0 0 50%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 30%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '50% 0 0 76%',
                width: '12.5%',
                height: '25%'
            }
        }
    },

    player8: {
        position: {
            go: {
                inset: '90% 0 0 20%',
                width: '10%',
                height: '10%'
            },
            bottomRow: {
                inset: '78% 0px 0px 0%',
                width: '25%',
                height: '11%'
            },
            jailjustvisiting: {
                inset: '90% 0 0 20%',
                width: '10%',
                height: '10%'
            },
            injail: {
                inset: '90% 0 0 20%',
                width: '10%',
                height: '10%'
            },
            leftRow: {
                inset: '0 0 0 12.5%',
                width: '12.5%',
                height: '25%'
            },
            freeparking: {
                inset: '70% 0 0 0',
                width: '10%',
                height: '10%'
            },
            topRow: {
                inset: '11% 0 0 75%',
                width: '25%',
                height: '11%'
            },
            gotojail: {
                inset: '0 0 0 20%',
                width: '10%',
                height: '10%'
            },
            rightRow: {
                inset: '75% 0 0 76%',
                width: '12.5%',
                height: '25%'
            }
        }
    }
};

class Player {

    constructor(name, alias, color, position, properties, money, inJail, isTurn, specialCards, turnsInJail, buildingCount) {
        this.name = name
        this.alias = alias
        this.color = color
        this.position = position
        this.properties = properties
        this.money = money
        this.inJail = inJail
        this.isTurn = isTurn
        this.specialCards = specialCards
        this.turnsInJail = turnsInJail
        this.buildingCount = buildingCount
    };
};

// Function handles new game
function initNewGame(newPlayers) {
    
    // create new players
    let playersArr = [];
    let playerCnt = 0;
    Object.keys(newPlayers).forEach((player) => {
        playersArr[playerCnt] = player;
        playersArr[playerCnt] = new Player('player' + player, newPlayers[player].alias, newPlayers[player].color, 1, [], 3500, false, false, [], 0, {houses: 0, hotels: 0});
        playerCnt++;
    });

    // object to handle game logic. assigned to global state and local storage
    let gameLogicObj = {
        
        startGame: true,
        playerCount: playerCnt,
        whosTurnIndex: 0,
        gameLogs: [{log: 'New game created.', color: gameConstants.logColor()}], // first game log!
        usedChance: [],
        usedCommunityChest: [],
        freeParking: gameConstants.freeParkingMoney(),
        playerPiecePos: playerPositionObj,
        players: playersArr,
        vueopoly: gameJson
    };

    let turnLogicObj = reactive({

        crntPlayer: reactive(gameLogicObj.players[gameLogicObj.whosTurnIndex]),
        propertyLandedOn: reactive({}),
        crntDiceRoll: reactive([]),
        diceRolled: ref(false),
        canEndTurn: ref(false),
        buyAvailable: ref(false),
    });


    // set local storage
    localStorage.setItem('gameLogic', JSON.stringify(gameLogicObj));
    localStorage.setItem('turnLogic', JSON.stringify(turnLogicObj));
    // game state
    gameLogic.value = gameLogicObj;
    turnLogic.value = turnLogicObj;


};

export default initNewGame;