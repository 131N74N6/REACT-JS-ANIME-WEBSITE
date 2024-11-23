import { Fragment } from "react";
import Header from "../Components/Header";
import AnimeCard from '../Components/Card';
import Loading from "../Utilities/Loading";
import ErrorMessage from "../Utilities/ErrorMessage";
import { useQuery } from "@tanstack/react-query";
import "./Style.css";

export default function UPCOMING_ANIME() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['upcoming-anime'], 
        queryFn: async () => {
            const request = await fetch("https://api.jikan.moe/v4/seasons/upcoming");
            const response = await request.json();
            return response;
        },
        retry: 3,
        staleTime: 50 * 60 * 100,
        cacheTime: 1000 * 50 * 60
    });

    if (isLoading) {
        return <Loading text={'Please Wait'}/>
    }

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Check your internet connection";
        }
        return <ErrorMessage message={error.message}/>
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