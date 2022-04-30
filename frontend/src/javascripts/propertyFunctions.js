import { gameLogic } from "./stateStore";
import * as gameConstants from './constants';

let getPropertyFromIdH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    return gameLogic.value.vueopoly.properties[propertyIndex];
}

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

let canMortgagePropertyH = (propIdArry) => {

    let propertyIndex;

    for(let i = 0; i < propIdArry.length; i++) {

        propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propIdArry[i]));
        if(gameLogic.value.vueopoly.properties[propertyIndex].mortgaged) {return false;};
    };
    return true;
    
    
};

export { canBuyBuildingH, getBuildingCostH, canMortgagePropertyH }