let moneyCheckH = (money, moneyToPay) => {
    console.log({money}, {moneyToPay})
    return money > moneyToPay ? true : false;
};

export { moneyCheckH }
