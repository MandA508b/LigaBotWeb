import React, { useState } from 'react';
import './YourPrice.css';

function YourPrice() {
    const [selectedOption, setSelectedOption] = useState('');
    const [tariffPrice, setTariffPrice] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handlePriceChange = (event) => {
        setTariffPrice(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // do something with the form data
        console.log(`Selected option: ${selectedOption}, Tariff price: ${tariffPrice}`);
        // reset form values
        setSelectedOption('');
        setTariffPrice('');
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor="tariff-options" className="input-label">
                Select a tariff option:
            </label>
            <select id="tariff-options" value={selectedOption} onChange={handleOptionChange} className="input-field">
                <option value="">-- Please select --</option>
                <option value="option1">Option 1 (5%)</option>
                <option value="option2">Option 2 (10%)</option>
                <option value="option3">Option 3 (15%)</option>
            </select>
            <div className="custom-price">
                <label htmlFor="tariff-price" className="input-label">
                    Or enter your own price (in %):
                </label>
                <input
                    type="text"
                    id="tariff-price"
                    value={tariffPrice}
                    onChange={handlePriceChange}
                    className="input-field"
                />
                <span className="example-text">Example: 7.5%</span>
            </div>
            <button type="submit" className="submit-button">
                Submit
            </button>
        </form>
    );
}

export default YourPrice;