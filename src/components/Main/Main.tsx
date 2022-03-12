import React, { useState, useEffect } from 'react';
import './Main.css';
import calculator from '../Calculator/Calculator';

const Main = () => {
    const [income, setIncome] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);

    const handleIncomeChange = (e: React.SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        const targetNumber = parseInt(target.value);
        setIncome(targetNumber);
        e.preventDefault();
    }

    useEffect(() => {
        if (income > 0) {
            const taxAmount = calculator(income);
            setTax(taxAmount);
        }
    }, [income])

    return (
        <div className="main">
            <form>
                <label>
                    Annual salary:
                </label>
                <input type="number" value={income} onChange={handleIncomeChange} />
            </form>
            <p>Income Tax: {tax}</p>
        </div>
    )
}

export default Main;
