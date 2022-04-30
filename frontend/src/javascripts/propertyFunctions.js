import { gameLogic } from "./stateStore";
import * as gameConstants from './constants';

let getPropertyFromIdH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    return gameLogic.value.vueopoly.properties[propertyIndex];
}

let getMortgageObjH = (propertyId) => {
    let mortgageObj = {name: '', id: '', mortgagePrice: 0};
    let property = getPropertyFromIdH(propertyId);
    mortgageObj.name = property.name;
    mortgageObj.id = property.id;
    mortgageObj.mortgagePrice = property.price / 2; // mortgage price is 1/2 or original cost
    return mortgageObj;
}

let mortgagePropertyH = (propertyId) => {
    let property = getPropertyFromIdH(propertyId);
    console.log(propertyId, '&&&&&&&&')
    property.mortgaged = true;
};

let getAllPropertiesInGroupH = (property) => {

    return gameLogic.value.vueopoly.properties.filter((prop => prop.style == property.style));

};

let canBuyBuildingH = (propArry) => {
    let firstPropIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propArry[0]));
    let propOwner = gameLogic.value.vueopoly.properties[firstPropIndex].ownedby;
    let allPropsInGroup = getAllPropertiesInGroupH(gameLogic.value.vueopoly.properties[firstPropIndex]);

    for(let i = 0; i < allPropsInGroup.length; i++) {

        if(allPropsInGroup[i].ownedby != propOwner) {return false};
    };
    return true;
    
};

let getBuildingCostH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    let buildingCost = gameLogic.value.vueopoly.properties[propertyIndex].housecost;
    return buildingCost;
};

let canMortgagePropertyH = (propertyId) => {

    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    if(gameLogic.value.vueopoly.properties[propertyIndex].mortgaged) {return false;};
    return true;
};

export { canBuyBuildingH, getBuildingCostH, canMortgagePropertyH, getMortgageObjH, mortgagePropertyH, getPropertyFromIdH }