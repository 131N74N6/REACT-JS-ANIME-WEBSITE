import React, { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import Header from '../component/Header';
import AnimeCard from '../component/Card';
import "./Currently.css";
import Loading from '../component/Loading';

export default function CurrentlyAiring() {

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const [chosenDay, setChosenDay] = useState("sunday");

    const { data, isLoading, error } = useQuery(['airing', chosenDay], async () => {
        const request = await fetch(`https://api.jikan.moe/v4/schedules/${chosenDay}`);
        const response = await request.json();
        return response;
    },{
        staleTime: 60000,
        cacheTime: 300000
    })

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Opps.. there's something wrong";
        }
        return <div className="error-msg-1">{error.message}</div>
    }

    function changeDay(value) {
        setChosenDay(value);
    }

    return (
        <Fragment>
            <Header/>
            {isLoading && <Loading text={'Please Wait'}/>}
            <div className="airing-data">
                <div className="day-navbar">
                    {days.map((day, index) => (
                        <button type="button" key={`day-${index+1}`} onClick={() => changeDay(day)} 
                        className={chosenDay === day ? "active" : ""}>
                            {day}
                        </button>
                    ))}
                </div>
                {data && data.data ? 
                    <div className="airing-anime">
                        <AnimeCard data={data.data}/>
                    </div> : null
                }
            </div>
        </Fragment>
    )
}
