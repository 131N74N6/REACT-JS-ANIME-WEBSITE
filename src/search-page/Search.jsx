import React, { Fragment } from "react";
import Header from "../component/Header";
import { useLocation } from "react-router-dom";
import "./Search.css";
import AnimeCard from "../component/Card";
import { useQuery } from "react-query";
import Loading from "../component/Loading";

export default function SearchPage() {

    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const searchKeyword = queryParam.get("q");

    const { data, isLoading, error } = useQuery(['searched-anime', searchKeyword], async () => {
        const request = await fetch(`https://api.jikan.moe/v4/anime?q=${searchKeyword}&sfw`);
        const response = await request.json();
        return response;
    },{
        staleTime: 5000,
        cacheTime: 10000
    })
    
    if (isLoading) {
        return <Loading text={'Please Wait'}/>;
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
            <div className="search-result">
                <div className="search-value">Search result for "{searchKeyword}"</div>
                <div className="show-search-result">
                    {!data || !data.data || data.data.length === 0 && 
                        <div className="error">No Result for "{searchKeyword}"</div>
                    }
                    <AnimeCard data={data.data}/>
                </div>
            </div>
        </Fragment>
    )
}