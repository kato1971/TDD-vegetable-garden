const getYieldForPlant = (yieldForPlant, environmentfactors) => {
    if(!environmentfactors){
        return yieldForPlant.yield;
    }else{
        let result= 0;
        Object.keys(environmentfactors).forEach(key => {
            const evironmentKey = environmentfactors[key];
            const plantFactor = yieldForPlant.factor[key];
            result += (yieldForPlant.yield / 100) * plantFactor[evironmentKey];
        });
        return yieldForPlant + result;
    };
};

const getYieldForCrop = YieldForCrop => YieldForCrop.crop.yield * YieldForCrop.numCrops;

const getTotalYield = totalYield => {
    let result = 0;
    totalYield.crops.forEach(crops => {
        result += getYieldForCrop(crops);
    });
    return result;
};

const getCostsForCrop = plant => {
    let result = 0;
    plant.crops.forEach(crop => {
        result += crop.numCrops * crop.costs;
    });
    return result;
};

const getRevenueForCrop = revenue => {
    let result = 0;
    revenue.crops.forEach(crops => {
        result += getYieldForCrop(crops) * crops.salePrice;
    });
    return result;
};

const getProfitForCrop = profit => {
    const costs = getCostsForCrop(profit);
    const revenue = getRevenueForCrop(profit);
    return revenue - costs;
};

const getTotalProfit = totalProfit => {
    const totalCost = getCostsForCrop(totalProfit);
    const revenue = getRevenueForCrop(totalProfit);
    return revenue - totalCost;
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}