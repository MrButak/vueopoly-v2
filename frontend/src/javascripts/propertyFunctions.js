import { gameLogic } from "./stateStore";
import * as gameConstants from './constants';

let getPropertyFromIdH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    return gameLogic.value.vueopoly.properties[propertyIndex];
};


let getAllPropertiesInGroupH = (property) => {
    // Filter by "style". On buildable properties, all are grouped by style. i.e: red, lightgreen, orange
    return gameLogic.value.vueopoly.properties.filter((prop => prop.style == property.style));
};

let canBuyBuildingH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    
    if(property.group == 'railroad' || property.group == 'utilities') {return false;};
    let propOwner = property.ownedby;
    let allPropsInGroup = getAllPropertiesInGroupH(property);

    for(let i = 0; i < allPropsInGroup.length; i++) {

        if(allPropsInGroup[i].ownedby != propOwner || allPropsInGroup[i].mortgaged) {return false};
    };
    return true;
};

let getBuildingCostH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    let buildingCost = gameLogic.value.vueopoly.properties[propertyIndex].housecost;
    return buildingCost;
};



let getMortgageObjH = (propertyId) => {
    let mortgageObj = {name: '', id: '', mortgagePrice: 0, houseCost: 0};
    let property = getPropertyFromIdH(propertyId);
    mortgageObj.name = property.name;
    mortgageObj.id = property.id;
    mortgageObj.mortgagePrice = property.price / 2; // mortgage price is 1/2 of original cost
    mortgageObj.houseCost = property.housecost;
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

export { canBuyBuildingH, getBuildingCostH, canMortgagePropertyH, getMortgageObjH, mortgagePropertyH, getPropertyFromIdH, unmortgagePropertyH }