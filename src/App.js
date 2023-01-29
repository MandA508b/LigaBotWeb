import './App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import axios from "axios";
import dayjs from 'dayjs'
function App() {
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [error,setError] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const {tg, user, onClose} = useTelegram()


    useEffect(() => {

        const fetchData = async ()=>{

            setLoading(true)
            try{
                const res = await axios.get('https://ligabot.onrender.com/city/findAll')
                setCities(res.data.cities)
                setCity(res.data.cities[0]?._id)
                setSuccess(true)
            }catch (e){
                setError(JSON.stringify(e,null,2))
            }finally {
                setLoading(false)
            }

        }
        fetchData()
        tg.ready()
    }, [])
    const [type, setType] = useState('buy')
    const [amount, setAmount] = useState(10)
    const [isPartly, setIsPartly] = useState(0)
    const [percent, setPercent] = useState(10)
    const [deadline, setDeadline] = useState(1000*60*60)
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [showRes, setShowRes] = useState(false)
    const handleChangeType = e => setType(e.target.value)
    const handleChangeCity = e => setCity(e.target.value)
    const handleChangeAmount = e => setAmount(e.target.value)
    const handleChangePercent = e => setPercent(e.target.value)
    const handleChangeIsPartly = e => setIsPartly(e.target.value)
    const handleChangeDeadline = e => setDeadline(e.target.value)
    const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)
    const handleSendData=async()=>{
        const adv = {
            userId:user.id,
            name:"-",
            type,
            cityId:city,total:amount,part:isPartly,rate:percent,
             deadline: deadline==='9999' ? dayjs().endOf('day').diff(dayjs()) : deadline
             ,extraInfo:additionalInfo
        }
        await axios.post('https://ligabot.onrender.com/advertisement/create',adv)
        
    }

    return (
        <div className="App">
            <h1>Нове Оголошення</h1>
            <div className="container">
                <div className={'form_container'}>
                    <label htmlFor="type">Тип</label>
                    <select className={'select select_type'} onChange={handleChangeType} defaultValue={type} name="type"
                            id="type">
                        <option value="sell">Продаж</option>
                        <option value="buy">Купівля</option>
                    </select>
                </div>
                <div className="form_container">

                    <label htmlFor="city">Місто</label>

                    <select className={'select select_city'} onChange={handleChangeCity} defaultValue={city} name="city"
                            id="city">
                        {
                            isSuccess && !isLoading ? cities?.map(city=>(
                                <option value={city?._id}>{city?.name}</option>
                            )) : null
                        }
                    </select>
                </div>

            </div>
            <div className="form_container">
                <label htmlFor="amount">Ціна, $</label>

                <input name={'amount'} type="number" value={amount} onChange={handleChangeAmount}/>

            </div>

            <div className={'container'}>
                <div className="form_container">
                    <label htmlFor="isPartly">Частинами?</label>

                    <select name={'isPartly'} className={'select select_ispartly'} onChange={handleChangeIsPartly}
                            defaultValue={isPartly}>
                        <option value={0}>Одною</option>
                        <option value={1}>Частинами</option>
                    </select>
                </div>

                {
                    !!isPartly ?

                            <input  type='number' value={isPartly} onChange={handleChangeIsPartly}/>
                        : null
                }
            </div>
            <div className="form_container">
                <label htmlFor="percent">Тариф, %</label>

                <input name={'percent'} type="number" value={percent} onChange={handleChangePercent}/>

            </div>
            <div className="form_container">
                <label htmlFor="type">Термін</label>

                <select className={'select select_deadline'} onChange={handleChangeDeadline} defaultValue={deadline}>
                    <option value={1000*60*60}>Година</option>
                    <option value={9999}>До Кінця Дня</option>
                    <option value={1000*60*60*48}>48 Годин</option>
                    <option value={1000*60*60*72}>78 Годин</option>
                </select>
            </div>
            <div className="form_container">
                <label htmlFor="type">Додаткова Інформація</label>

                <textarea name={'additionalInfo'} cols="40" rows="4" value={additionalInfo} onChange={handleChangeAdditionalInfo}/>

            </div>
            <button className={'close_btn'} onClick={handleSendData}>Показати/Скрити Результат</button>
            <p>
                {showRes ? JSON.stringify({
                    type, city, amount, isPartly, percent, deadline, additionalInfo
                }, null, 2) : '-'}
            </p>
            <button className={'close_btn'} onClick={onClose}>Закрити</button>
            <p>
                {
                    error.length ? error : JSON.stringify(user,null,2)
                }
            </p>
        </div>
    );
}

export default App;
