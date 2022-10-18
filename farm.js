const getYieldForPlant = (plant, factors) => {
    
    if(!factors){
        return plant.yield;
    } else if ("sun" in factors === true && "wind" in factors !== true && "rain" in factors !== true) {
        result = plant.yield * ((100 + plant.factor.sun[factors.sun]) / 100);
        return result;
    } else if ("sun" in factors !== true && "wind" in factors === true && "rain" in factors !== true) {
        result = plant.yield * ((100 + plant.factor.wind[factors.wind]) / 100);
        return result;
    } else if ("sun" in factors !== true && "wind" in factors !== true && "rain" in factors !== true){
        result = plant.yield * ((100 + plant.factor.rain[factors.rain]) / 100);
        return result;
    } else if ("sun" in factors === true && "wind" in factors === true && "rain" in factors === true){
        result = plant.yield * ((100 + plant.factor.sun[factors.sun]) / 100) * ((100 + plant.factor.wind[factors.wind]) / 100) * ((100 + plant.factor.rain[factors.rain]) / 100);
        resultRounded = Math.round(result * 10) / 10;
        return resultRounded;
    } else {
        return result;
    };
};

const getYieldForCrop = (plant) => { 

    result = plant.crop.yield * plant.numCrops;
    resultRounded = Math.round(result * 10) / 10;
    return resultRounded;
};

const getYieldForCropEnvironment = (plant, factors) => {

    if ("sun" in factors === true && "wind" in factors !== true && "rain" in factors !== true) {
        result = (plant.crop.yield * plant.numCrops) * ((100 + plant.crop.factor.sun[factors.sun]) / 100);
        return result;
    } else if ("sun" in factors !== true && "wind" in factors === true && "rain" in factors !== true) {
        result = (plant.crop.yield * plant.numCrops) * ((100 + plant.crop.factor.wind[factors.wind]) / 100);
        resultRounded = Math.round(result * 10) / 10;
        return resultRounded;
    } else if ("sun" in factors !== true && "wind" in factors !== true && "rain" in factors !== true){
        result = (plant.crop.yield * plant.numCrops) * ((100 + plant.crop.factor.rain[factors.rain]) / 100);
        return result;
    } else if (factors){
        result = (plant.crop.yield * plant.numCrops) * ((100 + plant.crop.factor.sun[factors.sun]) / 100) * ((100 + plant.crop.factor.wind[factors.wind]) / 100) * ((100 + plant.crop.factor.rain[factors.rain]) / 100);
        resultRounded = Math.round(result * 10) / 10;
        return resultRounded;
    }else if (!factors) {
        result = plant.crop.yield * plant.numCrops;
        return result;
    } else {
        return result;
    };

};

const getTotalYield = (plant, factors) => {
    let result = 0
    if (!factors) {
        plant.crops.forEach((crops) => {
            result += getYieldForCrop(crops);
        });
        return result;
    } else {
        plant.crops.forEach((crops) => {
            result += getYieldForCropEnvironment(crops, factors)
           
        });
        return result;
    };
};

const getCostsForCrop = plant => {
    let result = 0;
    plant.crops.forEach(crop => {
        result += crop.numCrops * crop.costs;
    });
    return result;
};

const getRevenueForCrop = (revenue) => {

    let result = 0;

    revenue.crops.forEach(crops => {
        result += getYieldForCrop(crops) * crops.salePrice;
    });
    return result;
    
};

const getRevenueForCropEnvironment = (revenue, factors) => {

    let result = 0;

    revenue.crops.forEach(crops => {
        result += getYieldForCropEnvironment(crops, factors) * crops.salePrice;
        resultRounded = Math.round(result * 10) / 10;
    });
    return resultRounded;

};

const getProfitForCrop = (profit, factors) => {
    if (!factors) {
        const costs = getCostsForCrop(profit);
        const revenue = getRevenueForCrop(profit);
        return revenue - costs;
    } else {
        const costs = getCostsForCrop(profit);
        const revenue = getRevenueForCropEnvironment(profit, factors);
        return revenue - costs;
    }
};

const getTotalProfit = (totalProfit, factors) => {
    if (!factors) {
        const totalCost = getCostsForCrop(totalProfit);
        const revenue = getRevenueForCrop(totalProfit);
        return revenue - totalCost;
    } else {
        const totalCost = getCostsForCrop(totalProfit);
        const revenue = getRevenueForCrop(totalProfit, factors);
        return revenue - totalCost;
    }
};



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getYieldForCropEnvironment,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getRevenueForCropEnvironment,
    getProfitForCrop,
    getTotalProfit,
}