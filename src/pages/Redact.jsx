
import '../App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "../hooks/useTelegram";
import axios from "axios";
import dayjs from 'dayjs'
import Loader from "../components/Loader/Loader";
import {useLocation} from "react-router-dom";

function Redact() {
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const {tg, user, onClose} = useTelegram()
    const location = useLocation()
    const [adver, setAdver] = useState({})
    const [title, setTitle] = useState('Нове Оголошення')
    const [type, setType] = useState('buy')
    const [amount, setAmount] = useState(10)
    const [isPartly, setIsPartly] = useState(0)
    const [percent, setPercent] = useState(10)
    const [deadline, setDeadline] = useState('1h')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const handleChangeType = e => setType(e.target.value)
    const handleChangeCity = e => setCity(e.target.value)
    const handleChangeAmount = e => setAmount(e.target.value)
    const handleChangePercent = e => setPercent(e.target.value)
    const handleChangeIsPartly = e => setIsPartly(e.target.value)
    const handleChangeDeadline = e => setDeadline(e.target.value)
    const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)
    useEffect(() => {

        const fetchData = async () => {

            setLoading(true)
            try {
                const advertisementId = location.pathname.split('/').slice(-1)[0]
                const res = await axios.get('https://ligabotv2.onrender.com/city/findAll')
                const adv = await axios.post('https://ligabotv2.onrender.com/advertisement/findById',{advertisementId})
                setAdver(adv["data"]["advertisement"])
                setAmount(adv["data"]["advertisement"]["total"])
                setType(adv["data"]["advertisement"]["type"])
                setPercent(adv["data"]["advertisement"]["rate"])
                setAdditionalInfo(adv["data"]["advertisement"]["extraInfo"])
                setIsPartly(adv["data"]["advertisement"]["part"])
                setDeadline(adv["data"]["advertisement"]["deadline"])
                console.log(adver)
                setCities(res.data.cities)
                setCity(res.data.cities[0]?._id)
                setSuccess(true)
            } catch (e) {
                setError(JSON.stringify(e, null, 2))
            } finally {
                setLoading(false)
            }

        }

        tg.ready()
        fetchData()

    }, [])

    const handleSendData = async () => {
        try{
            console.log(adver)
            const adv = {...adver, total:amount, rate:percent, part:isPartly, deadline,type, extraInfo:additionalInfo,cityId:city}
            await
            console.log(adv)
            const advertisementId = location.pathname.split('/').slice(-1)[0]

            const res = await axios.put('https://ligabotv2.onrender.com/advertisement/redact',{advertisementId,data:adv})
            setError(JSON.stringify(res,null,2))
            setTitle("Оголошення успішно додане")
            tg.sendData(JSON.stringify(res))
            onClose()
        }catch (e) {
            setError(JSON.stringify(e, null, 2))
        }


    }
    if (isLoading) return <Loader/>

    return (
        <div className="App">
            <h1>{title}</h1>
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
                            isSuccess && !isLoading ? cities?.map(city => (
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


            <div>
                <label style={{fontSize:'10px'}}>Введіть частину(якщо одна частина, то введіть 0)</label>
                <input type='number' value={isPartly} onChange={handleChangeIsPartly}/>
            </div>

            </div>
            <div className="form_container">
                <label htmlFor="percent">Тариф, %</label>

                <input name={'percent'} type="number" value={percent} onChange={handleChangePercent}/>

            </div>
            <div className="form_container">
                <label htmlFor="type">Термін</label>

                <input type={'text'} value={deadline} onChange={handleChangeDeadline}/>
            </div>
            <div className="form_container">
                <label htmlFor="type">Додаткова Інформація</label>

                <textarea name={'additionalInfo'} cols="40" rows="4" value={additionalInfo}
                          onChange={handleChangeAdditionalInfo}/>

            </div>
            <button className={'close_btn'} onClick={handleSendData}>Змінити</button>
            <button className={'close_btn'} onClick={onClose}>Закрити</button>
            <p>
                { error.length ? error : ''}
            </p>
        </div>
    );
}

export default Redact;

