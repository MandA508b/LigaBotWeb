/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from "axios";
import queryString from "query-string";
import {useLocation} from "react-router-dom";

const Review = ({url}) => {
    const location = useLocation()
    const [checkbox, setCheckbox] = useState(false)
    const [teams, setTeams] = useState([])
    const [res, setRes] = useState({})

    useEffect(()=>{
        console.log('ue')
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`${url}/teams/findAll`)
                setTeams(res.data.teams)
            }catch (e) {
                console.log(e)
            }

        }
        fetchData()
    },[])
    const handleSend = async ()=>{
        const {teamId1} = queryString.parse(location.search)
        setRes({teamId1})
    }
    return (
        <div className='review'>
            <h1>
                Відгук
            </h1>
            <h3 className={'review_text'}>
                Чи закрили ви оголошення за допомогою учасника команди?
            </h3>
            <div className={'review_question'}>
                <span onClick={()=>setCheckbox(false)} className={`review_choose ${!checkbox ? 'review_choose_active' : ''}`}>Ні</span>
                <span onClick={()=>setCheckbox(true)} className={`review_choose ${checkbox ? 'review_choose_active' : ''}`}>Так</span>
            </div>

            {
                !checkbox ? null :
                    <div className={'review_form'}>
                        <label>Вибір команди</label>
                        <select className={'select'} name="" id="">
                            {
                                teams?.map(team=><option value={team.name}>{team.name}</option>)}
                        </select>
                    </div>

            }
            <button onClick={handleSend} className={'close_btn'}>
                Надіслати
            </button>
            <p>
                {JSON.stringify(res, null, 4)}
            </p>
        </div>
    );
};

export default Review;