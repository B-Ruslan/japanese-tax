import taxableIncome from '../../resources/taxableIncome';
import taxRateResource from '../../resources/taxRate';
import otherTaxes from '../../resources/otherTaxes';

interface TaxRates {
    [index: string]: number;
}

function getIncomeTax(incomes: TaxRates, income: number, taxrates: TaxRates) {
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

function getResidentTax(income: number) {
  const residentTaxAmount = income * otherTaxes.residentTax;
  return residentTaxAmount;
} 

const calculator = (income: number) => {
    const incomeInMillions = income / 1000000;
    const incomeTaxAmount = getIncomeTax(taxableIncome, incomeInMillions, taxRateResource);
    const postEmploymentSum = incomeInMillions - incomeTaxAmount;
    const residentTaxAmount = getResidentTax(postEmploymentSum);
    const netIncome = postEmploymentSum - residentTaxAmount;

    const incomeModel = {
      incomeTaxAmount: incomeTaxAmount * 1000000,
      residentTaxAmount: residentTaxAmount * 1000000,
      netIncome: netIncome * 1000000
    }

    return incomeModel;
}

export default calculator;
