import React, {useEffect, useState} from 'react';
import axios from "axios";

const Review = ({url}) => {
    const [checkbox, setCheckbox] = useState(false)
    const [teams, setTeams] = useState([])

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
    return (
        <div className='review'>
            <h1>
                Відгук
            </h1>
            <h3 className={'.review_text'}>
                Чи закрили ви оголошення за допомогою учасника команди?
            </h3>
            <div className={'review_question'}>
                <span onClick={()=>setCheckbox(false)} className={`review_choose ${!checkbox ? 'review_choose_active' : ''}`}>Ні</span>
                <span onClick={()=>setCheckbox(true)} className={`review_choose ${checkbox ? 'review_choose_active' : ''}`}>Так</span>
            </div>

            {
                !checkbox ? null :
                    <div className={'review_form'}>
                        <select className={'select'} name="" id="">
                            {
                                teams?.map(team=><option value={team.name}>{team.name}</option>)}
                        </select>

                    </div>

            }
            <button className={'close_btn'}>
                Надіслати
            </button>
        </div>
    );
};

export default Review;