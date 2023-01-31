//
// import './App.css';
// import {useEffect, useState} from "react";
// import {useTelegram} from "./hooks/useTelegram";
// import axios from "axios";
// import dayjs from 'dayjs'
// import Loader from "./components/Loader/Loader";
//
// function App() {
//     const [isLoading, setLoading] = useState(false)
//     const [isSuccess, setSuccess] = useState(false)
//     const [error, setError] = useState('')
//     const [cities, setCities] = useState([])
//     const [city, setCity] = useState('')
//     const {tg, user, onClose} = useTelegram()
//     const [userData, setUserData] = useState({})
//
//
//
//     useEffect(() => {
//
//         const fetchData = async () => {
//
//             setLoading(true)
//             try {
//                 const res = await axios.get('https://ligabotv2.onrender.com/city/findAll')
//                 //const resUser = await axios.post('https://ligabotv2.onrender.com/user/getUserByTelegramId', {telegramId: user?.id})
//                 setCities(res.data.cities)
//                 setCity(res.data.cities[0]?._id)
//                 //setUserData({leagueId: resUser.data.user.leagueId, userId: resUser.data.user._id})
//                // console.log(userData)
//                 //setRes(resUser)
//                 setSuccess(true)
//             } catch (e) {
//                 setError(JSON.stringify(e, null, 2))
//             } finally {
//                 setLoading(false)
//             }
//
//         }
//
//         tg.ready()
//         fetchData()
//
//     }, [])
//     const [type, setType] = useState('buy')
//     const [amount, setAmount] = useState(10)
//     const [isPartly, setIsPartly] = useState(0)
//     const [percent, setPercent] = useState(10)
//     const [deadline, setDeadline] = useState('1h')
//     const [additionalInfo, setAdditionalInfo] = useState('')
//     const [showRes, setShowRes] = useState(false)
//     const [res, setRes] = useState({})
//     const handleChangeType = e => setType(e.target.value)
//     const handleChangeCity = e => setCity(e.target.value)
//     const handleChangeAmount = e => setAmount(e.target.value)
//     const handleChangePercent = e => setPercent(e.target.value)
//     const handleChangeIsPartly = e => setIsPartly(e.target.value)
//     const handleChangeDeadline = e => setDeadline(e.target.value)
//     const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)
//     const handleSendData = async () => {
//         const deadlineData = {
//             '1h': dayjs().add(1, 'hour').format("DD.MM.YYYY HH:mm"),
//             'todayend': dayjs().add(dayjs().endOf('day').diff(dayjs()), 'ms').format("DD.MM.YYYY HH:mm"),
//             '48h': dayjs().add(48, 'hour').format("DD.MM.YYYY HH:mm"),
//             '78h': dayjs().add(72, 'hour').format("DD.MM.YYYY HH:mm"),
//         }
//         console.log(deadline, deadlineData[deadline])
//         setRes({s:'s'})
//         try{
//             //const resUser = await axios.post('https://ligabotv2.onrender.com/user/getUserByTelegramId', {telegramId: user?.ID})
//             //setRes({resUser})
//             const adv = {
//                 //userId: resUser.data.user._id,
//                 //leagueId:resUser.data.user.leagueId,
//                 ...user,
//                 type,
//                 cityId: city,
//                 total: amount,
//                 part: isPartly,
//                 rate: percent,
//                 deadline: deadlineData[deadline],
//                 extraInfo: additionalInfo,
//
//             }
//             console.log(adv,userData)
//             setRes({...user,...adv})
//             //const res = await axios.post('https://ligabotv2.onrender.com/advertisement/create',adv)
//             //setRes(res)
//         }catch (e) {
//             setRes(e)
//         }
//
//
//     }
//     if (isLoading) return <Loader/>
//
//     return (
//         <div className="App">
//             <h1>Нове Оголошення</h1>
//             <div className="container">
//                 <div className={'form_container'}>
//                     <label htmlFor="type">Тип</label>
//                     <select className={'select select_type'} onChange={handleChangeType} defaultValue={type} name="type"
//                             id="type">
//                         <option value="sell">Продаж</option>
//                         <option value="buy">Купівля</option>
//                     </select>
//                 </div>
//                 <div className="form_container">
//
//                     <label htmlFor="city">Місто</label>
//
//                     <select className={'select select_city'} onChange={handleChangeCity} defaultValue={city} name="city"
//                             id="city">
//                         {
//                             isSuccess && !isLoading ? cities?.map(city => (
//                                 <option value={city?._id}>{city?.name}</option>
//                             )) : null
//                         }
//                     </select>
//                 </div>
//
//             </div>
//             <div className="form_container">
//                 <label htmlFor="amount">Ціна, $</label>
//
//                 <input name={'amount'} type="number" value={amount} onChange={handleChangeAmount}/>
//
//             </div>
//
//             <div className={'container'}>
//                 <div className="form_container">
//                     <label htmlFor="isPartly">Частинами?</label>
//
//                     <select name={'isPartly'} className={'select select_ispartly'} onChange={handleChangeIsPartly}
//                             defaultValue={isPartly}>
//                         <option value={0}>Одною</option>
//                         <option value={1}>Частинами</option>
//                     </select>
//                 </div>
//
//                 {
//                     !!isPartly ?
//
//                         <input type='number' value={isPartly} onChange={handleChangeIsPartly}/>
//                         : null
//                 }
//             </div>
//             <div className="form_container">
//                 <label htmlFor="percent">Тариф, %</label>
//
//                 <input name={'percent'} type="number" value={percent} onChange={handleChangePercent}/>
//
//             </div>
//             <div className="form_container">
//                 <label htmlFor="type">Термін</label>
//
//                 <select className={'select select_deadline'} onChange={handleChangeDeadline} defaultValue={deadline}>
//                     <option value={'1h'}>Година</option>
//                     <option value={'todayend'}>До Кінця Дня</option>
//                     <option value={'48h'}>48 Годин</option>
//                     <option value={'78h'}>78 Годин</option>
//                 </select>
//             </div>
//             <div className="form_container">
//                 <label htmlFor="type">Додаткова Інформація</label>
//
//                 <textarea name={'additionalInfo'} cols="40" rows="4" value={additionalInfo}
//                           onChange={handleChangeAdditionalInfo}/>
//
//             </div>
//             <button className={'close_btn'} onClick={handleSendData}>Показати/Скрити Результат</button>
//             <p>
//                 {showRes ? JSON.stringify({
//                     type, city, amount, isPartly, percent, deadline, additionalInfo
//                 }, null, 2) : '-'}
//             </p>
//             <button className={'close_btn'} onClick={onClose}>Закрити</button>
//             <p>
//                 {
//                     error.length ? error : JSON.stringify(res, null, 2)
//                 }
//             </p>
//         </div>
//     );
// }
//
// export default App;
import './App.css';
import {useEffect, useState} from "react";
import {useTelegram} from "./hooks/useTelegram";
import axios from "axios";
import dayjs from 'dayjs'
import Loader from "./components/Loader/Loader";
function addHours(date, hours) {
    const timezone = 2
    date.setTime(date.getTime() + timezone* 60 * 60 * 1000 +  hours * 60 * 60 * 1000);

    return date;
}
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
                const res = await axios.get('https://ligabotv2.onrender.com/city/findAll')
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
    const [deadline, setDeadline] = useState('1h')
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [showRes, setShowRes] = useState(false)
    const [res, setRes] = useState({})
    const handleChangeType = e => setType(e.target.value)
    const handleChangeCity = e => setCity(e.target.value)
    const handleChangeAmount = e => setAmount(e.target.value)
    const handleChangePercent = e => setPercent(e.target.value)
    const handleChangeIsPartly = e => setIsPartly(e.target.value)
    const handleChangeDeadline = e => setDeadline(e.target.value)
    const handleChangeAdditionalInfo = e => setAdditionalInfo(e.target.value)
    const handleSendData=async()=>{
        const date = new Date()
        const deadlineData = {
            '1h':dayjs().add(1, 'hour').format("DD.MM.YYYY HH:mm"),
            'todayend':dayjs().add(dayjs().endOf('day').diff(dayjs()),'ms').format("DD.MM.YYYY HH:mm"),
            '48h':dayjs().add(48,'hour').format("DD.MM.YYYY HH:mm"),
            '78h':dayjs().add(72, 'hour').format("DD.MM.YYYY HH:mm"),
        }
        console.log(deadline,deadlineData[deadline])
        const adv = {
            userId:user?.id,
            type,
            cityId:city,
            total:amount,
            part:isPartly,
            rate:percent,
            deadline: deadlineData[deadline],
            extraInfo:additionalInfo
        }
        console.log(adv)
        setRes({user,adv})
        //await axios.post('https://ligabot.onrender.com/advertisement/create',adv)

    }
    if(isLoading) return <Loader/>

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
                    <option value={'1h'}>Година</option>
                    <option value={'todayend'}>До Кінця Дня</option>
                    <option value={'48h'}>48 Годин</option>
                    <option value={'78h'}>78 Годин</option>
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
                    error.length ? error : JSON.stringify(res,null,2)
                }
            </p>
        </div>
    );
}

export default App;