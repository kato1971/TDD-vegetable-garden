const { getYieldForPlant, getYieldForCrop, getYieldForCropEnvironment, getTotalYield, getCostsForCrop, getRevenueForCrop, getRevenueForCropEnvironment, getProfitForCrop, getTotalProfit} = require("./farm");
const corn = {
    name: "corn",
    yield: 3,
    factor: {
        sun: {
            low: -20,
            medium: 0,
            high: 50,
        },
        wind:{
            lots: -60,
            medium: -30,
            little: 0,
        },
        rain: {
            lots: -70,
            medium: 0,
            little: -30,
        },
    },
}; 

const pumpkin = {
    name: "pumpkin",
    yield: 4,
    factor: {
        sun: {
            low: -20,
            medium: 0,
            high: 20,
        },
        wind:{
            lots: -30,
            medium: 10,
            little: -20,
        },
        rain: {
            lots: -50,
            medium: -20,
            little: 0,
        },
    },  
};

const input = {
    crop: corn, 
    numCrops: 10,
};

const crops = [
    { crop: corn, numCrops: 5, costs: 3, salePrice: 4, },
    { crop: pumpkin, numCrops: 2, costs: 4, salePrice: 6, },
];


describe("getYieldForPlant", () => {
    
    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(3);
    });

    test("1 - 3. Get yield for plant with environmentfactors - sun", () => {
        const environmentfactors = {
            sun: "high",
        };
        expect(getYieldForPlant(corn, environmentfactors)).toBe(4.5)
    });

    test("1 - 3. Get yield for plant with environmentfactors - wind", () => {
        const environmentfactors = {
            wind: "medium",
        };
        expect(getYieldForPlant(corn, environmentfactors)).toBe(2.0999999999999996)
    });

    test("1 - 3. Get yield for plant with environmentfactors - multiple", () => {
        const environmentfactors = {
            sun: "low",
            wind: "lots",
            rain: "medium",
        };
        expect(getYieldForPlant(corn, environmentfactors)).toBe(1)
    });

});

describe("getYieldForCrop", () => {

    test("Get yield for crop, simple", () => {
        expect(getYieldForCrop(input)).toBe(30);
    });

});

describe("getYieldForCropEnvironment", () => {
    
    test("4. Get yield for crop, simple with environmentfactors - multiple factors", () => {
        const environmentfactors = {
            sun: "low",
            wind: "lots",
            rain: "medium", 
        } 
        expect(getYieldForCropEnvironment(input, environmentfactors)).toBe(9.6);
    });

});

describe("getTotalYield", () => {
    
    test("Calculate total yield with multiple crops", () => {
            expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
    test("5. Calculate total yield with multiple crops with environmentfactors - multiple factors", () => {
        const environmentfactors = {
            sun: "high",
            wind: "medium",
            rain: "little",
        }
        expect(getTotalYield({ crops }, environmentfactors )).toBe(21.6);
    });
    
});


describe("getCostsForCrop", () => {

    test("1. calculate the cost for a crop", () => {
        expect(getCostsForCrop({ crops })).toBe(23);
    }); 

}); 

describe("getRevenueForCrop", () => {
    
    test("2. calculate the revenue for a crop without environmental factors", () => {
        expect(getRevenueForCrop({ crops })).toBe(108);
    });

});

describe("getRevenueForCropEnvironment", () => {

    test("6. calculate the revenue for a crop with environmental factors", () => {
        const environmentfactors = {
            sun: "medium",
            wind: "lots",
            rain: "medium"
        }
        expect(getRevenueForCropEnvironment({ crops }, environmentfactors)).toBe(51)
    })

});

describe("getProfitForCrop", () => {
    
    test("3. calculate the profit for a crop without environmental factors", () => {
        expect(getProfitForCrop({ crops })).toBe(85);
    });

    test("7. calculate the profit for a crop with environmental factors", () => {
        const environmentfactors = {
            sun: "low",
            wind: "little",
            rain: "lots",
        }
        expect(getProfitForCrop({ crops }, environmentfactors)).toBe(7);
    });

});

describe("getTotalProfit", () => {
    test("4. calculate profit for multiple crops without evironmantal factors", () => {
        expect(getTotalProfit({ crops })).toBe(85);
    });

    test("8. calculate the profit for mutiple crops with environmental factors", () => {
        const environmentfactors = {
            sun: "medium",
            wind: "medium",
            rain: "medium",
        }
        expect(getProfitForCrop({ crops }, environmentfactors)).toBe(61);
    });

});