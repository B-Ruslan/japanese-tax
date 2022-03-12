interface TaxRates {
    [index: string]: number;
}

const taxRateResource: TaxRates = {
    fivePercent: 0.05,
    tenPercent: 0.1,
    twentyPercent: 0.2,
    twentyThreePercent: 0.23,
    thirtyThreePercent: 0.33,
    fortyPercent: 0.4,
    fortyFivePercent: 0.45
}

export default taxRateResource