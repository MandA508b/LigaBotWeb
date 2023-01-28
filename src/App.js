import './App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";

function App() {
    const {tg, user, onClose} = useTelegram()
    const [type, setType] = useState('buy')
    const [city, setCity] = useState('kyiv')
    const [amount, setAmount] = useState(10)
    const [isPartly, setIsPartly] = useState(0)
    const [percent, setPercent] = useState(10)
    const [deadline, setDeadline] = useState('1hour')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [showRes, setShowRes] = useState(false)
    const handleChangeType = e => setType(e.target.value)
    const handleChangeCity = e => setCity(e.target.value)
    const handleChangeAmount = e => setAmount(e.target.value)
    const handleChangePercent = e => setPercent(e.target.value)
    const handleChangeIsPartly = e => setIsPartly(e.target.value)
    const handleChangeDeadline = e => setDeadline(e.target.value)
    const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)

    useEffect(() => {
        tg.ready()
    }, [])
    return (
        <div className="App">
            <div className="container">
                <select className={'select select_type'} onChange={handleChangeType} defaultValue={type} name="type"
                        id="type">
                    <option value="sell">Продаж</option>
                    <option value="buy">Купівля</option>
                </select>
                <select className={'select select_city'} onChange={handleChangeCity} defaultValue={city} name="city"
                        id="city">
                    <option value="Kyiv">Київ</option>
                    <option value="Lviv">Львів</option>
                </select>
            </div>

            <input type="number" value={amount} onChange={handleChangeAmount}/>

            <div className={'container'}>
                <select className={'select select_ispartly'} onChange={handleChangeIsPartly} defaultValue={isPartly}>
                    <option value={0}>Одною</option>
                    <option value={1}>Частинами</option>
                </select>
                {
                    isPartly ?
                        <input type='number' value={isPartly} onChange={handleChangeIsPartly}/>
                        : null
                }
            </div>
            <input type="number" value={percent} onChange={handleChangePercent}/>
            <select className={'select select_deadline'} onChange={handleChangeDeadline} defaultValue={deadline}>
                <option value={'1h'}>Година</option>
                <option value={'todayend'}>До Кінця Дня</option>
                <option value={'48h'}>48 Годин</option>
                <option value={'72h'}>78 Годин</option>
            </select>
            <textarea cols="30" rows="4" value={additionalInfo} onChange={handleChangeAdditionalInfo}/>
            <button className={'close_btn'} onClick={()=>setShowRes(prev=>!prev)}>Показати/Скрити Результат</button>
            <p>
                {showRes ? JSON.stringify({
                    type,city,amount,isPartly,percent,deadline,additionalInfo
                }, null,2) : '-'}
            </p>
            <button className={'close_btn'} onClick={onClose}>Закрити</button>
        </div>
    );
}

export default App;
