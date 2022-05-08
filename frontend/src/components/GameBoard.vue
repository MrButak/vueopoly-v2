<template>


	<div class="responsive">

		<div class="mainSquare">

			<div class="pos-top row top">
                
                
				<div id="freeparking" class="square2 "><span class="corner corner1">free <br /> parking</span>
                </div>
                
                
				<div id="kentuckyave" class="square1">
					<div class="header header-top red"></div>
					<div class="firstLine firstLine-top rotation2">kentucky <br /> avenue</div>
                    <div class="ownedtopbar" id="kentuckyaveownedbar"></div>
				</div>

				<div id="chancetwo" class="square1">		
					<div class="firstLine firstLine-top no-color rotation2">chance</div>
				</div>

				<div id="indianaave" class="square1 ">
					<div class="header header-top red"></div>
					<div class="firstLine firstLine-top rotation2">indiana <br /> avenue</div>
                    <div class="ownedtopbar" id="indianaaveownedbar"></div>
				</div>

				<div id="illinoisave" class="square1 ">
					<div class="header header-top red"></div>
					<div class="firstLine firstLine-top rotation2">illinios <br /> avenue</div>
                    <div class="ownedtopbar" id="illinoisaveownedbar"></div>
				</div>

				<div id="borailroad" class="square1 ">
					<div class="firstLine firstLine-top no-color rotation2">b. & o. <br /> railroad</div>
                    <div class="ownedtopbar" id="borailroadownedbar"></div>
				</div>

				<div id="atlanticave" class="square1 ">
					<div class="header header-top yellow"></div>
					<div class="firstLine firstLine-top rotation2">atlantic <br /> avenue</div>
                    <div class="ownedtopbar" id="atlanticaveownedbar"></div>
				</div>

				<div id="ventnorave" class="square1 ">
					<div class="header header-top yellow"></div>
					<div class="firstLine firstLine-top rotation2">ventnor <br /> avenue</div>
                    <div class="ownedtopbar" id="ventnoraveownedbar"></div>
				</div>

				<div id="waterworks" class="square1 ">
					<div class="firstLine firstLine-top no-color rotation2">water <br /> works</div>
                    <div class="ownedtopbar" id="waterworksownedbar"></div>
				</div>

				<div id="marvingardens" class="square1 ">
					<div class="header header-top yellow"></div>
					<div class="firstLine firstLine-top rotation2">marvin <br /> gardens</div>
                    <div class="ownedtopbar" id="marvingardensownedbar"></div>
				</div>

				<div id="gotojail" class="square2 "><span class="corner corner2">go to<br />jail</span></div>
			</div>
			
			<div class="row center">
				<div class="pos-left square2">

					<div id="newyorkave" class="squareSide ">
						<div class="headerSide header-left orange"></div>
						<div class="firstLine firstLine-left rotation1">new york <br /> avenue</div>
                        <div class="ownedleftbar" id="newyorkaveownedbar"></div>
					</div>

					<div id="tennesseeave" class="squareSide ">
						<div class="headerSide header-left orange"></div>
						<div class="firstLine firstLine-left rotation1">tennessee <br /> avenue</div>
                        <div class="ownedleftbar" id="tennesseeaveownedbar"></div>
					</div>
					<div id="communitychesttwo" class="squareSide ">						
						<div class="firstLine firstLine-left no-color rotation1">community<br /> chest</div>
					</div>

					<div id="stjamesplace" class="squareSide ">
						<div class="headerSide header-left orange"></div>
						<div class="firstLine firstLine-left rotation1">st.james <br />place</div>
                        <div class="ownedleftbar" id="stjamesplaceownedbar"></div>
					</div>

					<div id="pennsylvaniarailroad" class="squareSide ">						
						<div class="firstLine firstLine-left no-color rotation1">pennsylvania<br> railroad</div>
                        <div class="ownedleftbar" id="pennsylvaniarailroadownedbar"></div>
					</div>
					<div id="virginiaave" class="squareSide ">
						<div class="headerSide header-left purple"></div>
						<div class="firstLine firstLine-left rotation1">virginia<br /> avenue</div>
                        <div class="ownedleftbar" id="virginiaaveownedbar"></div>
					</div>
					<div id="statesave" class="squareSide ">
						<div class="headerSide header-left purple"></div>
						<div class="firstLine firstLine-left rotation1">states<br /> avenue</div>
                        <div class="ownedleftbar" id="statesaveownedbar"></div>
					</div>
					<div id="electriccompany" class="squareSide ">						
						<div class="firstLine firstLine-left no-color rotation1">electric<br />company</div>
                        <div class="ownedleftbar" id="electriccompanyownedbar"></div>
					</div>
					<div id="stcharlesplace" class="squareSide ">
						<div class="headerSide header-left purple"></div>
						<div class="firstLine firstLine-left rotation1">st. charles<br />place</div>
                        <div class="ownedleftbar" id="stcharlesplaceownedbar"></div>
					</div>
				</div>

				<div class="square9">
					<DashBoard />
				</div>

				<div class="pos-right square2">
					<div id="pacificave" class="squareSide ">
						<div class="headerSide header-right green"></div>
						<div class="firstLine firstLine-right rotation3">pacific<br /> avenue</div>
                        <div class="ownedrightbar" id="pacificaveownedbar"></div>
					</div>
					<div id="northcarolinaave" class="squareSide ">
						<div class="headerSide header-right green"></div>
						<div class="firstLine firstLine-right rotation3">north<br />carolina<br />avenue</div>
                        <div class="ownedrightbar" id="northcarolinaaveownedbar"></div>
					</div>
					<div id="communitychestthree" class="squareSide ">						
						<div class="firstLine firstLine-right no-color rotation3">community<br />chest</div>
					</div>
					<div id="pennsylvaniaave" class="squareSide ">
						<div class="headerSide header-right green"></div>
						<div class="firstLine firstLine-right rotation3">pennsylvania<br /> avenue</div>
                        <div class="ownedrightbar" id="pennsylvaniaaveownedbar"></div>
					</div>
					<div id="shortlinerailroad" class="squareSide ">						
						<div class="firstLine firstLine-right no-color rotation3">short<br /> line</div>
                        <div class="ownedrightbar" id="shortlinerailroadownedbar"></div>
					</div>
                    
                    <div id="chancethree" class="squareSide ">
                        <div class="firstLine firstLine-right no-color rotation3">chance</div>
                    </div>
                    
					<div id="parkplace" class="squareSide ">						
						<div class="headerSide header-right blue"></div>
						<div class="firstLine firstLine-right rotation3">park<br /> place</div>
                        <div class="ownedrightbar" id="parkplaceownedbar"></div>
					</div>
					<div id="luxerytax" class="squareSide">						
						<div class="firstLine firstLine-right no-color rotation3">luxury<br /> tax</div>
					</div>
					<div id="boardwalk" class="squareSide ">
						<div class="headerSide header-right blue"></div>
						<div class="firstLine firstLine-right rotation3">boardwalk<br /> avenue</div>
                        <div class="ownedrightbar" id="boardwalkownedbar"></div>
					</div>
				</div>
			</div>

			<div class="pos-bottom row top">

				<div id="jailjustvisiting" class="square2 ">
					<span class="corner4-left">just</span>

					<div id="injail" class="squareCorner">
						<span class="corner corner4">in <br />jail</span>
					</div>

					<span class="corner4-bottom">visiting</span>
				</div>

				<div id="connecticutave" class="square1 ">
					<div class="header header-bottom lightblue"></div>
					<div class="firstLine firstLine-bottom">connecticut avenue</div>
                    <div class="ownedbottombar" id="connecticutaveownedbar"></div>
				</div>
				<div id="vermontave" class="square1 ">
					<div class="header header-bottom lightblue"></div>
					<div class="firstLine firstLine-bottom">vermont<br /> avenue</div>
                    <div class="ownedbottombar" id="vermontaveownedbar"></div>
				</div>
				<div id="chance" class="square1 ">
					<div class="firstLine firstLine-bottom no-color">chance</div>
				</div>
				<div id="orientalave" class="square1 ">
					<div class="header header-bottom lightblue"></div>
					<div class="firstLine firstLine-bottom">oriental<br /> avenue</div>
                    <div class="ownedbottombar" id="orientalaveownedbar"></div>
				</div>
				<div id="readingrailroad" class="square1 ">					
					<div data-id="readingrailroad" class="firstLine firstLine-bottom no-color">reading<br /> railroad</div>
                    <div class="ownedbottombar" id="readingrailroadownedbar"></div>
				</div>
				<div id="incometax" class="square1 ">
					<div class="firstLine firstLine-bottom no-color">income<br /> tax</div>
				</div>
				<div id="balticave" class="square1">
					<div class="header header-bottom brown"></div>
					<div class="firstLine firstLine-bottom">baltic<br /> avenue</div>
                    <div class="ownedbottombar" id="balticaveownedbar"></div>
				</div>
				<div id="communitychest" class="square1 ">
					<div class="firstLine firstLine-bottom no-color">community<br /> chest</div>
				</div>
				<div id="mediterraneanave" class="square1 ">
					<div class="header header-bottom brown"></div>
					<div class="firstLine firstLine-bottom">mediter-<br /> ranean <br /> avenue</div>
                    <div class="ownedbottombar" id="mediterraneanaveownedbar"></div>
				</div>
				<div id="go" class="square2 ">
					<span class="corner corner3">collect<br />$200 salary<br />as you pass</span>
				</div>
			</div>
		</div>
        
	</div>
    <StatsHud />
    <span class="debug-btn"><button @click="manualMove">move player forward</button></span>
    
    
</template>

<script setup>
import { onMounted, watch, computed, ref } from 'vue';
import { lsInUse, gameLogic, turnLogic } from '../javascripts/stateStore';
import * as consts from '../javascripts/constants';
import * as domFunctions from '../javascripts/domFunctions';
import DashBoard from '../components/playerDashboard/DashBoard.vue';
import StatsHud from '../components/playerDashboard/StatsHud.vue';

// place all player pieces, buildings
onMounted(() => {
    gameLogic.value.players.forEach((player) => {
        placePlayerPiece(player.name)
    });
    gameLogic.value.vueopoly.properties.forEach((prop) => {
        if(prop.buildings && prop.buildings > 0) {
            placeBuildingPieces(prop);
        };
    });
    placeOwnedBar();
});

function placeOwnedBar() {
    
    gameLogic.value.vueopoly.properties.forEach((prop) => {

        if(prop.ownedby && prop.ownedby != -1) {

            let playerIndex = gameLogic.value.players.findIndex((player) => player.name == prop.ownedby);
            let playerColor = gameLogic.value.players[playerIndex].color;
            let ownedBar = document.getElementById(prop.id + 'ownedbar');

            if(prop.mortgaged) {
                
                ownedBar.style.backgroundColor = 'transparent';
                ownedBar.style.borderColor = playerColor;
            }
            else {
                ownedBar.style.backgroundColor = playerColor;
                ownedBar.style.borderColor = 'transparent';
            }; 
        };
    });
};

function placeBuildingPieces(property) {
    let buildingCount = property.buildings;
    let row = domFunctions.dtrmBuildingRowH(property.id);
    let buildingDimensions = domFunctions.dtrmBuildingDimensionsH(row, buildingCount);
    // houses
    if(buildingCount < 5) {
        for(let i = 1; i < buildingCount + 1; i++) {
            let buildingPiece = document.createElement('span');
            buildingPiece.style.width = buildingDimensions[0];
            buildingPiece.style.height = buildingDimensions[1];
            buildingPiece.style.backgroundColor = consts.houseColor();
            buildingPiece.style.inset = domFunctions.dtrmBuildingInsetH(row, i);
            buildingPiece.style.position = 'absolute';
            let parent = document.getElementById(property.id);
            parent.firstChild.append(buildingPiece);
        };
        return;
    };
    // hotels
    let buildingPiece = document.createElement('span');
    buildingPiece.style.width = buildingDimensions[0];
    buildingPiece.style.height = buildingDimensions[1];
    buildingPiece.style.backgroundColor = consts.hotelColor();
    buildingPiece.style.inset = domFunctions.dtrmBuildingInsetH(row, buildingCount);
    buildingPiece.style.position = 'absolute';
    let parent = document.getElementById(property.id);
    parent.firstChild.append(buildingPiece);
};
function addBuildingPiece(propertyId) {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id === propertyId));
    let property = gameLogic.value.vueopoly.properties[propertyIndex];
    let buildingCount = property.buildings;
    let row = domFunctions.dtrmBuildingRowH(propertyId);
    let buildingDimensions = domFunctions.dtrmBuildingDimensionsH(row, buildingCount);
    let buildingPiece = document.createElement('span');
    // houses
    if(buildingCount < 5) {
        
        buildingPiece.style.width = buildingDimensions[0];
        buildingPiece.style.height = buildingDimensions[1];
        buildingPiece.style.backgroundColor = consts.houseColor();
    }
    // hotels
    else {
        // remove all houses
        let parent = document.getElementById(propertyId).childNodes[0];
        while(parent.firstChild) {parent.removeChild(parent.firstChild)};
        
        buildingPiece.style.width = buildingDimensions[0];
        buildingPiece.style.height = buildingDimensions[1];
        buildingPiece.style.backgroundColor = consts.hotelColor();
    };
    buildingPiece.style.inset = domFunctions.dtrmBuildingInsetH(row, buildingCount);
    buildingPiece.style.position = 'absolute';
    
    // add building piece to dom
    document.getElementById(propertyId).firstChild.append(buildingPiece);
    
};
function removeBuildingPiece(propertyId) {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id === propertyId));
    let property = gameLogic.value.vueopoly.properties[propertyIndex];
    let buildingCount = property.buildings;
    if(buildingCount < 4) {
        if(buildingCount < 1) {
            let parent = document.getElementById(propertyId).childNodes[0];
            parent.childNodes[0].remove();
            return;
        };
        let parent = document.getElementById(propertyId).childNodes[0];
        parent.childNodes[parent.childNodes.length - 1].remove();
        return;
    };
    // if hotel is on property when building is sold
    let parent = document.getElementById(propertyId).childNodes[0];
    // remove all then place 4 houses
    parent.childNodes[0].remove();
    property.buildings = 0;
    for(let i = 1; i < 5; i++) {
        property.buildings++;
        addBuildingPiece(propertyId);
    };  
};

function placePlayerPiece(playerId) {
    
    // if element already on the dom, remove it
    if(document.getElementById(playerId)) {document.getElementById(playerId).remove()};
    
    let playerIndex = gameLogic.value.players.findIndex((player => player.name == playerId));
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop) => prop.position == gameLogic.value.players[playerIndex].position);
    let propertyId = gameLogic.value.vueopoly.properties[propertyIndex].id;
    let piecePosition = gameLogic.value.vueopoly.properties[propertyIndex].pieceposition;
    let positionObj = gameLogic.value.playerPiecePos[`${gameLogic.value.players[playerIndex].name}`].position[`${piecePosition}`];

    // add css properties and id (getting info from an object in initNewGame.js)
    let playerPiece = document.createElement('span');
    playerPiece.id = gameLogic.value.players[playerIndex].name;
    playerPiece.style.position = 'absolute';
    playerPiece.style.inset = positionObj.inset;
    playerPiece.style.width = positionObj.width;
    playerPiece.style.height = positionObj.height;
    playerPiece.style.backgroundColor = gameLogic.value.players[playerIndex].color;

    // add player piece to dom
    document.getElementById(propertyId).append(playerPiece);
};

function manualMove() {
    gameLogic.value.players[gameLogic.value.whosTurnIndex].position++
};

// when current players poition changes
watch(
    () => gameLogic.value.players[gameLogic.value.whosTurnIndex].position,
    (count, prevCount) => {
        placePlayerPiece(gameLogic.value.players[gameLogic.value.whosTurnIndex].name);
    }
);

// called when property changes ownership, and places 'owned bar' on the dom
watch(
    () => [gameLogic.value.vueopoly.properties[0].ownedby,
    gameLogic.value.vueopoly.properties[1].ownedby, gameLogic.value.vueopoly.properties[2].ownedby,
    gameLogic.value.vueopoly.properties[3].ownedby, gameLogic.value.vueopoly.properties[4].ownedby,
    gameLogic.value.vueopoly.properties[5].ownedby, gameLogic.value.vueopoly.properties[6].ownedby,
    gameLogic.value.vueopoly.properties[7].ownedby, gameLogic.value.vueopoly.properties[8].ownedby,
    gameLogic.value.vueopoly.properties[9].ownedby, gameLogic.value.vueopoly.properties[10].ownedby,
    gameLogic.value.vueopoly.properties[11].ownedby, gameLogic.value.vueopoly.properties[12].ownedby,
    gameLogic.value.vueopoly.properties[13].ownedby, gameLogic.value.vueopoly.properties[14].ownedby,
    gameLogic.value.vueopoly.properties[15].ownedby, gameLogic.value.vueopoly.properties[16].ownedby,
    gameLogic.value.vueopoly.properties[17].ownedby, gameLogic.value.vueopoly.properties[18].ownedby,
    gameLogic.value.vueopoly.properties[19].ownedby, gameLogic.value.vueopoly.properties[20].ownedby,
    gameLogic.value.vueopoly.properties[21].ownedby, gameLogic.value.vueopoly.properties[22].ownedby,
    gameLogic.value.vueopoly.properties[23].ownedby, gameLogic.value.vueopoly.properties[24].ownedby,
    gameLogic.value.vueopoly.properties[25].ownedby, gameLogic.value.vueopoly.properties[26].ownedby,
    gameLogic.value.vueopoly.properties[27].ownedby,
    ],
    () => {placeOwnedBar()}
);

// when a building is purchased or sold
watch(
    () => turnLogic.value.buildProperty.watchCount,
    () => {

        if(turnLogic.value.buildProperty.addBuilding) {
            addBuildingPiece(turnLogic.value.buildProperty.prop.id);
        }
        else {
            removeBuildingPiece(turnLogic.value.buildProperty.prop.id);
        };
    }
);

</script>


<style lang="scss" scoped>

.debug-btn {
    position: absolute;
    inset: 58vw 0 0 25vw;
}
.ownedtopbar {
    width: 100%;
    height: 1vw;
    position: absolute;
    inset: -1.5vw 0 0 0;
    border: 3px solid transparent;
}
.ownedleftbar {
    width: 1vw;
    height: 100%;
    position: absolute;
    inset: 0 0 0 -1.65vw;
    border: 3px solid transparent;
}
.ownedrightbar {
    width: 1vw;
    height: 100%;
    position: absolute;
    inset: 0 0 0 9.3vw;
    border: 3px solid transparent;
}
.ownedbottombar {
    width: 100%;
    height: 1vw;
    position: absolute;
    inset: 9.3vw 0 0 0;
    border: 3px solid transparent;
}
div {
	box-sizing: border-box;
	text-transform: uppercase;
}
.responsive {
    
    background: #cde6d0;
    width: 56vw;
    height: 56vw;
    inset: 3rem 0 3rem 3rem;
    position: absolute;
}
.mainSquare {
	height: 100%;
	outline: 1px dashed #c2dec5;
	outline-offset: -13px;
}
.row {
	width: 100%;
	display: flex;
}
.top {
	height: 15.384615385%;
}
.center {
	height: 69.23076923%;
}
.square1 {
	outline: 1px solid black;
	flex-grow: 1;
	position: relative;
}
.square2 {
	flex-grow: 2;
	outline: 1px solid black;
	display: flex;
	flex-direction: column;
	position: relative;
}
.square9 {
	flex-grow: 9;
	outline: 1px solid black;
}
.squareSide {
	outline: 1px solid black;
	width: 100%;
	flex-grow: 1;
	position: relative;
}
.header {
	height: 21%;
	position: absolute;
	outline: 2px solid black;
	background: grey;
	/* width: 100%; */
}
.headerSide {
	/* height: 100%; */
	width: 21%;
	position: absolute;
	outline: 2px solid black;
}
.header-top {
	bottom: 1px;
	left: 1px;
	right: 1px;
}
.header-bottom {
	top: 1px;
	left: 1px;
	right: 1px;
}
.header-left {
	top: 1px;
	bottom: 1px;
	right: 1px;
	background: grey;
}
.header-right {
	top: 1px;
	bottom: 1px;
	left: 1px;
	background: grey;
}
.firstLine {
	/*position: absolute;
	font-size: 0.7vw;
	font-weight: 500;
	line-height: 1vw;
	text-align: center;*/

    position: absolute; 
    font-size: 0.6vw;
    font-weight: 500;
    line-height: 1vw;
    text-align: center;
}
.firstLine-top {
	left: 1px;
	right: 1px;
	bottom: 30%;
	height: 10%;
}
.firstLine-top.no-color {
	bottom: 12%;
}
.firstLine-left {
	top: 0px;
	bottom: 0px;
	right: 42%;
}
.firstLine-left.no-color {
	right: 23%;
}
.firstLine-right {
	top: 0;
	bottom: 0;
	left: 42%;
}
.firstLine-right.no-color {
	left: 23%;
}
.firstLine-bottom {
	left: 0;
	right: 0;
	top: 30%;
}
.firstLine-bottom.no-color {
	top: 12%;
}
.red {
  background-color: #ed1b24;
}
.yellow {
  background-color: #fef200;
}
.lightblue {
  background-color: #aae0fa;
}
.brown {
  background-color: #955436;
}
.blue {
  background-color: #0072bb;
}
.green {
  background-color: #1fb25a;
}
.orange {
  background-color: #f7941d;
}
.purple {
  background-color: #d93a96;
}
.rotation1 {
  transform: rotate(90deg);
}
.rotation2 {
  transform: rotate(180deg);
}
.rotation3 {
  transform: rotate(-90deg);
}

.corner {
	/*position: absolute;
	text-align: center;
	line-height: 8vw;
	font-size: 1.2vw;
	font-weight: 500;*/

    position: absolute;
    text-align: center;
    line-height: 5vw;
    font-size: .8vw;
    font-weight: 500;
}
.corner1 {
    transform: rotateZ(135deg) translateX(-66%) translateY(-15%);
}
.corner2 {
    /*transform: rotateZ(-135deg) translateX(-30%) translateY(23%);
    line-height: 9vw;*/

    transform: rotateZ(-135deg) translateX(-30%) translateY(23%);
    line-height: 6vw;
}
.corner3 {
    /*transform: rotateZ(-45deg) translateX(-14%) translateY(26%);
    line-height: 1.4vw;
    font-size: 1vw;*/

    transform: rotateZ(-45deg) translateX(-14%) translateY(26%);
    line-height: 1.6vw;
    font-size: .9vw;
}
.corner4 {
    /*transform: rotateZ(45deg) translateX(-9%) translateY(-31%);
    line-height: 7vw;*/

    transform: rotateZ(45deg) translateX(-9%) translateY(-31%);
    line-height: 5vw;
}
.squareCorner {
	height: 65%;
	width: 65%;
	border: 2px solid black;
	right: -1px;
	top: -1px;
	position: absolute;
}
.corner4-left {
	/*position: absolute;
	transform: rotateZ(90deg) translateX(80%) translateY(-36%);
	font-size: 1.2vw;
	font-weight: 500;*/

    position: absolute;
    transform: rotateZ(90deg) translateX(80%) translateY(-36%);
    font-size: 0.9vw;
    font-weight: 500;
}
.corner4-bottom {
	/*position: absolute;
	transform: translateX(112%) translateY(720%);
	font-size: 1.2vw;
	font-weight: 500;*/

    position: absolute;
    transform: translateX(112%) translateY(720%);
    font-size: .9vw;
    font-weight: 500;
    line-height: 1vw;
}
</style>