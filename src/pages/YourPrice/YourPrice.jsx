/* eslint-disable */
import React, {useEffect, useState} from 'react';
import './YourPrice.css';
import queryString from 'query-string';
import { useLocation } from "react-router-dom";
import axios from "axios";
import {useTelegram} from "../../hooks/useTelegram";

function YourPrice({url}) {
    const {tg,  onClose} = useTelegram()
    useEffect(()=>{
        tg.ready()
    },[])
    const [rate, setRate] = useState('');
    const [res, setRes] = useState('');

    const location = useLocation()

    const handleInputChange = (e) => setRate(e.target.value);


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!rate.length) return;

        const {chatId, advertisementId} = queryString.parse(location.search)
        try {
            await axios.post(`${url}/chat/sendRateRequest`,{chatId,advertisementId,rate })
            onClose()
        }catch (e) {
            setRes(JSON.stringify(e, null, 2 ))
        }
        setRate('');
    };

    return (
        <div className={'App'}>
            <form onSubmit={handleSubmit} className="form-container">
                <label htmlFor="input-field" className="input-label">
                    Запропонуйте ваш тариф, %
                </label>
                <input
                    type="number"
                    id="input-field"
                    value={rate}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder={'0.5'}

                />
                <button type="submit" className="submit-button">
                    Підтвердити
                </button>
                <p>
                    { res}
                </p>
            </form>

        </div>
    );
}

export default YourPrice;