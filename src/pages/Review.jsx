/* eslint-disable */
import React, {useEffect, useState} from 'react';
import axios from "axios";
import queryString from "query-string";
import {useLocation} from "react-router-dom";
import {useTelegram} from "../hooks/useTelegram";

const Review = ({url}) => {
    const { onClose} = useTelegram()

    const location = useLocation()
    const [checkbox, setCheckbox] = useState(false)
    const [teams, setTeams] = useState([])
    const [teamId2, setTeamId2] = useState('')

    useEffect(()=>{
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
        if(!!teamId2.length){
            try{
                await axios.put(`${url}/teams/addScore`,{teamId1, teamId2})

            }catch (e) {
                console.log(e)
            }
        }else if(!teamId2.length && !checkbox) onClose()
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
                <span onClick={()=> {
                    setTeamId2('')
                    setCheckbox(false)
                }} className={`review_choose ${!checkbox ? 'review_choose_active' : ''}`}>Ні</span>
                <span onClick={()=>setCheckbox(true)} className={`review_choose ${checkbox ? 'review_choose_active' : ''}`}>Так</span>
            </div>

            {
                !checkbox ? null :
                    <div className={'review_form'}>
                        <label>Вибір команди</label>
                        <select className={'select'} name="" id="" value={teamId2} onChange={e=>setTeamId2(e.target.value)}>
                            {
                                teams?.map(team=><option value={team._id}>{team.name}</option>)}
                        </select>
                    </div>

            }
            <div className="buttons">
                <button onClick={handleSend} className={'close_btn'}>
                    Надіслати
                </button>
                <button className={'close_btn'} onClick={()=>onClose()}>
                    Закрити
                </button>
            </div>
        </div>
    );
};

export default Review;