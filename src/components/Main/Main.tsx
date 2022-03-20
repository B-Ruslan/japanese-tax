import React, { useState, useEffect } from 'react';
import './Main.css';
import calculator from '../Calculator/Calculator';

const Main = () => {
    const [income, setIncome] = useState<number>(0);
    const [incomeTax, setIncomeTax] = useState<number>(0);
    const [residentTax, setResidentTax] = useState<number>(0);
    const [netIncome, setNetIncome] = useState<number>(0);
    const [isResident, setIsResident] = useState<boolean>(false);
    const [isFreelancer, setIsFreelancer] = useState<boolean>(false);

    const handleIncomeChange = (e: React.SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const targetNumber = parseInt(target.value);
        setIncome(targetNumber);
        e.preventDefault();
    }

    const handleResidentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsResident(e.target.checked);
    }

    const handleFreelancerChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setIsFreelancer(e.target.checked);
    }

    useEffect(() => {
        if (income > 0) {
            const taxAmount = calculator(income);
            setIncomeTax(taxAmount.incomeTaxAmount);
            setResidentTax(taxAmount.residentTaxAmount);
            setNetIncome(taxAmount.netIncome);
        }
    }, [income])

    return (
        <div className="main">
            <h2>How much do you make a year?</h2>
            <div className="assumptions">
                    <form>
                        <ul>
                            <li>
                                <label>
                                    Annual salary (in ¥):
                                </label>
                                <input type="number" value={income} onChange={handleIncomeChange} />
                            </li>
                            <li>
                                <label>
                                    First year in Japan?
                                </label>
                                <input type="checkbox" checked={isResident} onChange={handleResidentChange} />
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <label>
                                    Freelancer (Blue Return System)
                                </label>
                                <input type="checkbox" checked={isFreelancer} onChange={handleFreelancerChange} />
                            </li>
                        </ul>
                    </form>
            </div>
            <div className="results">
                <p>Income tax: ¥{incomeTax.toFixed(0)}</p>
                <p>Resident tax: ¥{residentTax.toFixed(0)}</p>
                <p><span>Your net income is:</span> ¥{netIncome.toFixed(0)}</p>
            </div>
        </div>
    )
}

export default Main;
