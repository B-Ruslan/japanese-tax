import taxableIncome from '../../resources/taxableIncome';
import taxRateResource from '../../resources/taxRate';

interface TaxRates {
    [index: string]: number;
}

function ensure<T>(argument: T | undefined | null, message: string = 'This value was promised to be there.'): T {
    if (argument === undefined || argument === null) {
      throw new TypeError(message);
    }
  
    return argument;
  }

function getTaxRate(incomes: TaxRates, income: number, taxrates: TaxRates) {
    const rateArray = Object.values(incomes)
    let taxableIncome = income;
    const incomeBrackets = rateArray.reduce((acc: number[], rec: number) => {
      if (taxableIncome > 0 && taxableIncome > rec) {
        acc = [...acc, rec];
        taxableIncome = taxableIncome - rec;
      }

      if (taxableIncome > 0 && taxableIncome < rec) {
        const lastIncome = +taxableIncome.toFixed(5);
        acc = [...acc, lastIncome];
        taxableIncome = 0;
      }

      return acc;
    }, [])

    const applicableRates = Object.values(taxrates).slice(0, incomeBrackets.length);
    const taxAmount = incomeBrackets.reduce((acc, rec, index) => {
      const tax = rec * applicableRates[index];
      acc += tax;
      return acc;
    }, 0)

    return taxAmount;
}

const calculator = (income: number) => {
    const incomeInMillions = income / 1000000;
    const taxAmount = getTaxRate(taxableIncome, incomeInMillions, taxRateResource);
    return taxAmount * 1000000;
}

export default calculator;
