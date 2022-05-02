import { gameLogic } from "./stateStore";
import * as gameConstants from './constants';
import * as gameFunctions from './gameFunctions';

let getPropFromIdH = (propertyId) => {
    let propertyIndex = gameLogic.value.vueopoly.properties.findIndex((prop => prop.id == propertyId));
    return gameLogic.value.vueopoly.properties[propertyIndex];
};

let getPropGroupFromProp = (property) => {

    let group = gameLogic.value.vueopoly.properties.filter((prop) => prop.style == property.style);
    return group;
};

let doesOwnAllInGroup = (owner, group) => {

    for(let i = 0; i < group.length; i++) {
        if(group[i].ownedby != owner) {return false;};
    };
    return true;
};

let isAnyMortgagedInGroup = (group) => {

    for(let i = 0; i < group.length; i++) {
        if(group[i].mortgaged) {return true;};
    };
    return false;
};

let isAnyBuildingsInGroup = (group) => {

    for(let i = 0; i < group.length; i++) {
        if(group[i].buildings > 0) {return true;};
    };
    return false;
};

// only called after determined whole group is owned and none are mortgaged

// TODO : handle utilities
let canAddBuilding = (property, group) => {

    // can only have 5 buildings
    if(property.buildings > 4) {return false;};

    // can only build 'evenly', meaning all properties must have 1 building before you add a second building to any
    for(let i = 0; i < group.length; i++) {
        if(property.buildings > group[i].buildings) {
            return false;
        };
    };
    return true;
};

let canRemoveBuilding = (property, group) => {

    if(property.buildings < 1) {return false;};
    // can only build 'evenly', meaning all properties must have 1 building before you add a second building to any
    for(let i = 0; i < group.length; i++) {
        if(property.buildings < group[i].buildings) {
            return false;
        };
    };
    return true;
};

// returns an object with the currently 'clicked' properties information
let checkedPropObjH = (propertyId) => {

    let property = getPropFromIdH(propertyId);
    let owner = property.ownedby;
    let group = getPropGroupFromProp(property);

    let propObj = {
        name: property.name,
        id: property.id,
        buildingCost:property.ohousecost,
        mortgagePrice: property.price / 2,
        canMortgage: false,
        canUnmortgage: false,
        canBuild: false,
        canSellBuilding: false
    };

    // can add/remove building
    if(doesOwnAllInGroup(owner, group) && !isAnyMortgagedInGroup(group)) {

        console.log(canAddBuilding(property, group))
        if(canAddBuilding(property, group)) {
            propObj.canBuild = true;
        }
        else {
            propObj.canBuild = false;
        };
        if(canRemoveBuilding(property, group)) {
            propObj.canSellBuilding = true;
        };
    };

    // can mortgage/unmortgage
    if(property.mortgaged) {
        propObj.canUnmortgage = true;
    };
    if(!isAnyBuildingsInGroup(group) && !property.mortgaged) {
        propObj.canMortgage = true;
    };

    return propObj;
};

let mortgagePropertyH = (propertyId) => {

    let property = getPropFromIdH(propertyId);
    property.mortgaged = true;
};

let unMortgagePropertyH = (propertyId) => {
    let property = getPropFromIdH(propertyId);
    property.mortgaged = false;
};

let buyBuildingH = (propertyId) => {
    let property = getPropFromIdH(propertyId);
    property.buildings++;
};

let sellBuildingH = (propertyId) => {
    let property = getPropFromIdH(propertyId);
    property.buildings--;

}
export { checkedPropObjH, mortgagePropertyH, unMortgagePropertyH, buyBuildingH, sellBuildingH }
