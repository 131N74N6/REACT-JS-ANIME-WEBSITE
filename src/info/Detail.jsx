import React, { Fragment } from "react";
import "./Detail.css";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import Footer from "../component/Footer";
import Character from "./Character";
import YouTube from "react-youtube";
import Soundtracks from "./Themes";
import { useQuery } from "react-query";
import Loading from "../component/Loading";

export default function DetailInfo() {
    
    const { mal_id } = useParams();

    const { data, isLoading, error } = useQuery('detail-info', async () => {
        const request = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
        const response = await request.json();
        return response;
    })
    
    if (isLoading) {
        return <Loading text={'Getting Information'}/>;
    }

    if (error) {
        if (error.name === "TypeError" && error.message === "Failed to fetch") {
            error.message = "Opps.. there's something wrong";
        }
        return <div className="error-msg-1">{error.message}</div>
    }

    function handleVideo(event) {
        event.target.pauseVideo();
    }

    const videoSize = {
        width: "378",
        height: "300"
    }

    return (
        <Fragment>
            <Header/>
            <div className="detail-info-wrap">
                <div className="detail-info">
                    <div className="anime-info">
                        <div className="title">
                            {data.data?.title_english ?
                                <div>{data.data?.title_english}</div> :
                                <div>{data.data?.title_japanese}</div> 
                            }
                        </div>
                        <div className="genre-info">
                            {data.data.genres ?
                            data.data.genres.map((anigenr, index) => (
                                <div key={`genre-anime-${index}`} className="genre-anime">
                                    <div>{anigenr?.name || null}</div>
                                </div>
                            )):null}
                            {data.data.themes ?
                            data.data.themes.map((anithem, index) => (
                                <div key={`theme-anime-${index}`} className="theme-anime">
                                    <div>{anithem?.name || null}</div>
                                </div>
                            )):null}
                        </div>
                        <div className="media-prom">
                            <div className="poster-wrap">
                                <img src={data.data?.images?.jpg?.large_image_url || 'default-image-url.jpg'} 
                                    alt={data.data?.title_japanese || 'No Title'} 
                                />
                            </div>
                            <YouTube
                                videoId={data.data.trailer?.youtube_id}
                                onReady={handleVideo}
                                opts={videoSize}
                            />
                        </div>
                        <div className="synopsis" style={{textAlign:'center'}}>
                            <h3>Synopsis</h3>
                            <div>{data.data.synopsis}</div>
                        </div>
                        <div className="more-inform">
                            <div>rating : {data.data.rating}</div>
                            <div>popularity : {data.data.popularity}</div>
                            <div>members : {data.data.members}</div>
                            <div>⭐ {data.data.score}</div>
                            <div>total episode : {data.data.episodes}</div>
                            <div>duration : {data.data.duration}</div>
                        </div>
                        <div className="more-inform-2">
                            <div>
                                <h3>Information</h3>
                                <p>source : {data.data.source}</p>
                                <p>type : {data.data.type}</p>
                                <p>status : {data.data.status}</p>
                                <p>season : {data.data.season} {data.data.year}</p>
                                <p>title jp : {data.data?.title_japanese}</p>
                                <p>title en : {data.data?.title_english}</p>
                                {data.data?.title_synonyms?.map((sysn, index) => (
                                    <div key={`sysnm-${index}`}>
                                        <p>{sysn}</p>
                                    </div>
                                ))}
                            </div>
                            <Soundtracks animeId={mal_id}/>
                        </div>
                        <div><Character animeId={mal_id}/></div>
                    </div>
                </div>
            </div>
            <Footer/>
        </Fragment>
    )
}