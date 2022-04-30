import { gameLogic } from "./stateStore";
import * as gameConstants from './constants';

let getPropertyFromIdH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    return gameLogic.value.vueopoly.properties[propertyIndex];
};
let getBuildingCountH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    return property.buildings;
};

let purchaseBuildingH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    // if(property.buildings > 4) {return;};
    property.buildings++;
};

let getAllPropertiesInGroupH = (property) => {
    // Filter by "style". On buildable properties, all are grouped by style. i.e: red, lightgreen, orange
    return gameLogic.value.vueopoly.properties.filter((prop => prop.style == property.style));
};

let canBuyBuildingH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    let buildingCount = property.buildings;

    if(property.group == 'railroad' || property.group == 'utilities') {return false;};
    let propOwner = property.ownedby;
    let allPropsInGroup = getAllPropertiesInGroupH(property);

    for(let i = 0; i < allPropsInGroup.length; i++) {
        if(allPropsInGroup[i].ownedby != propOwner || allPropsInGroup[i].mortgaged) {return false;};
        console.log({buildingCount})
        if(allPropsInGroup[i].buildings > buildingCount + 1 || allPropsInGroup[i].buildings < buildingCount) {return false;}; // must build evenly
    };

    return true;
};

let getBuildingCostH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    let buildingCost = gameLogic.value.vueopoly.properties[propertyIndex].housecost;
    return buildingCost;
};

let areBuildingsInGroupH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId)
    let propertyGroup = getAllPropertiesInGroupH(property);
    for(let i = 0; i < propertyGroup.length; i++) {
        if(propertyGroup[i].buildings > 0) {return true;};
    };
    return false;
};

let getEligiblePropObjH = (propertyId) => {
    let mortgageObj = {name: '', id: '', mortgagePrice: 0, buildingCost: 0};
    let property = getPropertyFromIdH(propertyId);
    mortgageObj.name = property.name;
    mortgageObj.id = property.id;
    mortgageObj.mortgagePrice = property.price / 2; // mortgage price is 1/2 of original cost
    mortgageObj.buildingCost = property.housecost;
    return mortgageObj;
};

let mortgagePropertyH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    property.mortgaged = true;
};

let unmortgagePropertyH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    property.mortgaged = false;
};

let canMortgagePropertyH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    if(gameLogic.value.vueopoly.properties[propertyIndex].mortgaged) {return false;};
    return true;
};

export { canBuyBuildingH, getBuildingCostH, canMortgagePropertyH, getEligiblePropObjH, mortgagePropertyH, getPropertyFromIdH, unmortgagePropertyH, purchaseBuildingH, getBuildingCountH, areBuildingsInGroupH }
