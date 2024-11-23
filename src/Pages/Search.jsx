import { Fragment } from "react";
import Header from "../Components/Header";
import AnimeCard from "../Components/Card";
import { useLocation } from "react-router-dom";
import Loading from "../Utilities/Loading";
import { useQuery } from "@tanstack/react-query";
import "./Search.css";

export default function SearchPage() {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const searchKeyword = queryParam.get("q");

    const { data, isLoading, error } = useQuery({
        queryKey: ['searched-anime', searchKeyword], 
        queryFn: async () => {
            const request = await fetch(`https://api.jikan.moe/v4/anime?q=${searchKeyword}&sfw`);
            const response = await request.json();
            return response;
        },
        staleTime: 1000 * 3,
        cacheTime: 1000 * 30 * 60
    });
    
    if (isLoading) {
        return <Loading text={'Please Wait'}/>;
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