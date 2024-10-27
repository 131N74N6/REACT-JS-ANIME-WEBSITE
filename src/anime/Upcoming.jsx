import { Fragment } from "react";
import Header from "../component/Header";
import "./Style.css";
import AnimeCard from "../component/Card";
import { useQuery } from "react-query";
import Loading from "../component/Loading";

export default function UPCOMING_ANIME() {

    const { data, isLoading, error } = useQuery(['upcoming-anime'], async () => {
        const request = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
        const response = await request.json();
        return response;
    },{
        retry: 3,
        staleTime: 50 * 60 * 100,
        cacheTime: 30 * 60 * 1000
    })

    if (isLoading) {
        return <Loading text={'Please Wait'}/>
    }

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Opps.. there's something wrong";
        }
        return <div className="error-msg-1">{error.message}</div>
    }
    
    return (
        <Fragment>
            <Header/>
            <div className="data-wrap">
                <div className="title">Upcoming Anime</div>
                <div className="data-content">
                    <AnimeCard data={data.data}/>
                </div>
            </div>
        </Fragment>
    )
}