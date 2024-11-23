import { Fragment } from "react";
import Header from "../Components/Header";
import AnimeCard from '../Components/Card';
import Loading from "../Utilities/Loading";
import { useQuery } from "@tanstack/react-query";
import "./Style.css";

export default function POPULAR_ANIME() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['popular-anime'], 
        queryFn: async () => {
            const request = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
            const response = await request.json();
            return response;
        },
        retry: 3,
        staleTime: 50 * 60 * 100,
        cacheTime: 30 * 60 * 1000
    });

    if (isLoading) {
        return <Loading text={'Please Wait'}/>
    }

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Check your internet connection";
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