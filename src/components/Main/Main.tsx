import React, { useState } from 'react';
import './Main.css';

const Main = () => {
    const [income, setIncome] = useState('');

    const handleIncomeChange = (e: any) => {
        console.log(e);
        setIncome(e.target.value);
        e.preventDefault();
    }

    return (
        <div className="main">
            <form>
                <label>
                    Salary:
                </label>
                <input type="number" value={income} onChange={handleIncomeChange} />
            </form>
        </div>
    )
}

export default Main;
