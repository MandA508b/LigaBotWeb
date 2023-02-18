/* eslint-disable */
import React, {useEffect, useState} from 'react';
import './YourPrice.css';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {useTelegram} from "../../hooks/useTelegram";

function YourPrice({url}) {
    const {tg, user, onClose} = useTelegram()
    useEffect(()=>{
        tg.ready()
    },[])
    const [rate, setRate] = useState('');
    const [res, setRes] = useState('');

    const location = useLocation()

    const handleInputChange = (event) => {
        setRate(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // do something with the form data
        console.log(`Input value: ${rate}`);
        const {chatId} = queryString.parse(location.search)
        try {
            const result = await axios.post(`${url}/chat/sendRateRequest`,{chatId,rate })
            setRes(JSON.stringify(result, null, 2 ))
        }catch (e) {
            setRes(JSON.stringify(e, null, 2 ))
        }
        // reset form value
        setRate('');
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label htmlFor="input-field" className="input-label">
                Ваша Ціна
            </label>
            <input
                type="number"
                id="input-field"
                value={rate}
                onChange={handleInputChange}
                className="input-field"

            />
            <button type="submit" className="submit-button">
                Submit
            </button>
            <p>
                {res}
            </p>
        </form>
    );
}

export default YourPrice;