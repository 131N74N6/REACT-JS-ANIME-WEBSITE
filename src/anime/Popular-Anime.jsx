import React, { Fragment } from "react";
import Header from "../component/Header";
import "./Style.css";
import AnimeCard from "../component/Card";
import { useQuery } from "react-query";
import Loading from "../component/Loading";

export default function POPULAR_ANIME() {

    const { data, isLoading, error } = useQuery(['popular-anime'], async () => {
        const request = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
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
                <div className="title">Popular Anime</div>
                <div className="data-content">
                    <AnimeCard data={data.data}/>
                </div>
            </div>
        </Fragment>
    )
}