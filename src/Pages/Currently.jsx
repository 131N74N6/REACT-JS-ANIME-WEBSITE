import { Fragment, useState } from "react";
import Header from "../Components/Header";
import AnimeCard from "../Components/Card";
import Loading from "../Utilities/Loading";
import { useQuery } from "@tanstack/react-query";
import "./Currently.css";

export default function CurrentlyAiring() {
    const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const [chosenDay, setChosenDay] = useState("sunday");

    const { data, isLoading, error } = useQuery({
        queryKey: ["airing", chosenDay], 
        queryFn: async () => {
            const request = await fetch(`https://api.jikan.moe/v4/schedules/${chosenDay}`);
            const response = await request.json();
            return response;
        },
        staleTime: 1000,
        cacheTime: 1000 * 30 * 60
    });

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Check your internet connection";
        }
        return <div className="error-msg-1">{error.message}</div>
    }

    function changeDay(value) {
        setChosenDay(value);
    }

    return (
        <Fragment>
            <Header/>
            {isLoading && <Loading text={"Please Wait"}/>}
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
