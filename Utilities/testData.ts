const faker = require('faker');


module.exports = {
    mandatory_Fields: {
        currentAge: faker.datatype.number({ min: 30, max: 40 }),
        retirementAge: faker.datatype.number({ min: 41, max: 80 }),
        currentIncome: faker.datatype.number({ min: 40000, max: 50000 }),
        currentRetirementSavingsBalance: faker.datatype.number({ min: 10000, max: 40000 }),
        eachYearSavingsPercentage: faker.datatype.number({ min: 2, max: 12 }),
        eachYearRateOfSavingsPercentage: faker.datatype.number({ min: 2, max: 12 }),
        // Add more fields as needed
    },
    all_Fields: {
        currentAge: faker.datatype.number({ min: 30, max: 40 }),
        retirementAge: faker.datatype.number({ min: 41, max: 80 }),
        currentIncome: faker.datatype.number({ min: 40000, max: 50000 }),
        currentRetirementSavingsBalance: faker.datatype.number({ min: 10000, max: 40000 }),
        eachYearSavingsPercentage: faker.datatype.number({ min: 2, max: 12 }),
        eachYearRateOfSavingsPercentage: faker.datatype.number({ min: 2, max: 12 }),
        spouseIncome: faker.datatype.number({ min: 10000, max: 20000 }),
        socialSecurityStatuses: 'yes', // or 'no' based on test requirement
        maritalStatus_Value: 'married',
        inputOverRideAmount_socialSecurity: faker.datatype.number({ min: 100, max: 1000 }),
        // Add more fields as needed
    },
    default_Values: {
        additionalIncome: faker.datatype.number({min: 10000 ,max:20000}),
        retirementDuration: faker.datatype.number({min: 20 ,max:40}),
        expectedInflationRate: faker.datatype.number({min: 2 ,max:14}),
        RetirementAnnualIncome: faker.datatype.number({min: 2 ,max:15}),
        preRetirementRoi: faker.datatype.number({min: 2 ,max:14}),
        postRetirementRoi: faker.datatype.number({min: 2 ,max:14}),
}
};
