const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
                low: -20,
                medium: 0,
                high: 50,
            },
            wind:{
                low: 0,
                medium: 30,
                high: -60,
            },
        },
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });

    test("Get yield for plant with environmentfactors", () => {
        const environmentfactors = {
            sun: "high",
            wind: "medium",
        };
        expect(getYieldForPlant(corn, environmentfactors)).toBe(24)
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        }
        const input = {
            crop: corn, 
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});


describe("getCostsForCrop", () => {
    test("1. calculate the cost for a crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [
            {crop: corn, numCrops: 40, costs: 3},
        ];
    expect(getCostsForCrop({ crops })).toBe(120);
    }); 
}); 

describe("getRevenueForCrop", () => {
    test("2. calculate the revenue for a crop without environmental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{crop:corn, numCrops: 40, salePrice:4},];
    expect(getRevenueForCrop({ crops })).toBe(480);
    });
});

describe("getProfitForCrop", () => {
    test("3. calculate the profit for a crop without environmental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{crop:corn, numCrops: 40, costs: 3, salePrice:4}]
    expect(getProfitForCrop({ crops })).toBe(360);
    });
});

describe("getTotalProfit", () => {
    test("4. calculate profit for multiple crops without evironmantal factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops:10, costs: 3, salePrice: 4},
            { crop: pumpkin, numCrops:10, costs: 4, salePrice: 6},
        ];
        expect(getTotalProfit({ crops })).toBe(290);
    });
});