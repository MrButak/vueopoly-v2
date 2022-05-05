import * as consts from './constants';

let buildingPieces = {
        
        
        
    bottomRow: {
        houseDimensions: {
            width: '.7vw',
            height: '1.1vw'
        },
        hotelDimensions: {
            width: '1.4vw',
            height: '1.4vw'
        },
        1: ".35vw 0 0 .3vw",
        2: ".35vw 0 0 1.25vw",
        3: ".35vw 0 0 2.2vw",
        4: ".35vw 0 0 3.2vw",
        5: ".23vw 0 0 1.42vw"
    },
    leftRow: {
        houseDimensions: {
            width: '1.1vw',
            height: '.7vw'
        },
        hotelDimensions: {
            width: '1.4vw',
            height: '1.4vw'
        },
        1: ".3vw 0 0 .35vw",
        2: "1.25vw 0 0 .35vw",
        3: "2.2vw 0 0 .35vw",
        4: "3.2vw 0 0 .35vw",
        5: "1.3vw 0 0 .2vw"
    },
    topRow: {
        houseDimensions: {
            width: '.7vw',
            height: '1.1vw'
        },
        hotelDimensions: {
            width: '1.4vw',
            height: '1.4vw'
        },
        1: ".35vw 0 0 .3vw",
        2: ".35vw 0 0 1.25vw",
        3: ".35vw 0 0 2.2vw",
        4: ".35vw 0 0 3.2vw",
        5: ".23vw 0 0 1.42vw"
    },
    rightRow: {
        houseDimensions: {
            width: '1.1vw',
            height: '.7vw'
        },
        hotelDimensions: {
            width: '1.4vw',
            height: '1.4vw'
        },
        1: ".3vw 0 0 .35vw",
        2: "1.25vw 0 0 .35vw",
        3: "2.2vw 0 0 .35vw",
        4: "3.2vw 0 0 .35vw",
        5: "1.3vw 0 0 .2vw"
    },
};

let dtrmBuildingRowH = (propteryId) => {


    switch(propteryId) {

        case 'mediterraneanave':
        case 'balticave':
        case 'orientalave':
        case 'vermontave':
        case 'connecticutave':
            return 'bottomRow';
        case 'stcharlesplace':
        case 'statesave':
        case 'virginiaave':
        case 'stjamesplace':
        case 'tennesseeave':
        case 'newyorkave':
            return 'leftRow';
        case 'kentuckyave':
        case 'indianaave':
        case 'illinoisave':
        case 'atlanticave':
        case 'ventnorave':
        case 'marvingardens':
            return 'topRow';
        case 'pacificave':
        case 'northcarolinaave':
        case 'pennsylvaniaave':
        case 'parkplace':
        case 'boardwalk':
            return 'rightRow';
    };
};

let dtrmBuildingDimensionsH = (row, buildingCount) => {

    if(buildingCount < 5) {return ([buildingPieces[row].houseDimensions.width, buildingPieces[row].houseDimensions.height]);};
    return ([buildingPieces[row].hotelDimensions.width, buildingPieces[row].hotelDimensions.height]);
};

let dtrmBuildingInsetH = (row, buildingCount) => {
    return buildingPieces[row][buildingCount];
};
export{ dtrmBuildingRowH, dtrmBuildingDimensionsH, dtrmBuildingInsetH }