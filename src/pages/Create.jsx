import '../App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "../hooks/useTelegram";
import axios from "axios";
import dayjs from 'dayjs'
import Loader from "../components/Loader/Loader";
import {Typography} from "@mui/material";

function Create({url}) {
    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')
    const {tg, user, onClose} = useTelegram()


    useEffect(() => {

        const fetchData = async () => {

            setLoading(true)
            try {
                const res = await axios.get(`${url}/city/findAll`)
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
    const [title, setTitle] = useState('Нове Оголошення')
    const [type, setType] = useState('buy')
    const [amount, setAmount] = useState(10)
    const [isPartly, setIsPartly] = useState(0)
    const [percent, setPercent] = useState(5)
    const [manualPercent, setManualPercent] = useState(0.1)
    const [percentInputType, setPercentInputType] = useState(true)
    const [deadline, setDeadline] = useState('1h')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [disabled, setDisabled] = useState(false)
    const handleChangeType = e => setType(e.target.value)
    const handleChangeCity = e => setCity(e.target.value)
    const handleChangeAmount = e => setAmount(e.target.value)
    const handleChangePercent = e => {
        const value = e.target.value
        if (value === "Ввести") setPercentInputType(false)
        setPercent(value)
        console.log(value, percentInputType)
    }
    const handleChangeManualPercent = e => setManualPercent(e.target.value)
    const handleChangeIsPartly = e => setIsPartly(e.target.value)
    const handleChangeDeadline = e => setDeadline(e.target.value)
    const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)

    const handleYourPrice = e => {
        setDisabled(e.target.checked)
        if(e.target.checked){
            setManualPercent(0)
            setPercent(0)
        }else {
            setPercent(0.5)
            setManualPercent(0.5)
        }
        console.log(manualPercent, percent)
    }



    const handleSendData = async () => {
        const deadlineData = {
            '1h': dayjs().add(1, 'hour').format("DD.MM.YYYY HH:mm"),
            'todayend': dayjs().add(dayjs().endOf('day').diff(dayjs()), 'ms').format("DD.MM.YYYY HH:mm"),
            '48h': dayjs().add(48, 'hour').format("DD.MM.YYYY HH:mm"),
            '78h': dayjs().add(72, 'hour').format("DD.MM.YYYY HH:mm"),
        }
        try {
            const resUser = await axios.post(`${url}/user/getUserByTelegramId`, {telegramId: user?.id})
            const adv = {
                userId: resUser.data.user._id,
                leagueId: resUser.data.user.leagueId,
                type,
                cityId: city,
                total: amount,
                part: isPartly,
                rate: percentInputType ? percent : manualPercent,
                deadline: deadlineData[deadline],
                extraInfo: additionalInfo,
            }
            await axios.post(`${url}/advertisement/create`, adv)
            setTitle("Оголошення успішно додане")
            onClose()
        } catch (e) {
            setError(JSON.stringify(e, null, 2))
        }
    }

    if (isLoading) return <Typography>loading</Typography>

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
                                <option key={city?._id} value={city?._id}>{city?.name}</option>
                            )) : null
                        }
                    </select>
                </div>
            </div>


            <div className="form_container">
                <label htmlFor="amount">Ціна, $</label>

                <input className='input__full' name={'amount'} type="number" value={amount} onChange={handleChangeAmount}/>

            </div>

            <div className="form_container">
                <label style={{fontSize: '8px'}}>Введіть частину(якщо одна частина, то введіть 0)</label>
                <input className='input__full' type='number' value={isPartly} onChange={handleChangeIsPartly}/>
            </div>
            <div className="container">
                <div className="form_container">
                    <label htmlFor="type">Тариф</label>

                    <select disabled={Boolean(disabled || !percentInputType)} className={'select'}
                            onChange={handleChangePercent} value={percent}>
                        <option value={0.5}>0.5%</option>
                        <option value={1}>1%</option>
                        <option value={2}>2%</option>
                        <option value={5}>5%</option>
                        <option value="Ввести">Ввести вручну</option>
                    </select>

                </div>
                {
                    !percentInputType &&

                    <div className="form_container">
                        <label htmlFor="percent">Введіть тариф, %</label>
                        <span className={'manualPercent'}>
                            <input disabled={disabled} className={'percent'} name={'percent'}
                                   type="number" value={manualPercent}
                                   onChange={handleChangeManualPercent}/>
                            <span onClick={()=> {
                                setPercentInputType(true)
                                setPercent(0.5)
                            }}>&#x2715;</span>
                        </span>
                    </div>
                }

            </div>
            <div className="form_container yourprice">
                <label style={{textAlign:'center'}} htmlFor="type">Дати змогу запропоновувати ціну користувачам ?</label>

                <input type="checkbox" onChange={e => handleYourPrice(e)}/>
            </div>

            <div className="form_container">
                <label htmlFor="type">Термін</label>

                <select className={'select select_deadline'} onChange={handleChangeDeadline} defaultValue={deadline}>
                    <option value={'1h'}>Година</option>
                    <option value={'todayend'}>До Кінця Дня</option>
                    <option value={'48h'}>48 Годин</option>
                    <option value={'78h'}>78 Годин</option>
                </select>
            </div>
            <div className="form_container">
                <label htmlFor="type">Додаткова Інформація</label>

                <textarea name={'additionalInfo'} cols="40" rows="2" value={additionalInfo}
                          onChange={handleChangeAdditionalInfo}/>

            </div>
            <div className={'buttons'}>
                <button className={'close_btn'} onClick={handleSendData}>Добавити</button>
                <button className={'close_btn'} onClick={onClose}>Закрити</button>
            </div>

            <p>
                {error.length ? error : ''}
            </p>
        </div>
    );
}

export default Create;

