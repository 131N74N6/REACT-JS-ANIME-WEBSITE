import React, { Fragment } from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default function AnimeCard({data}) {

    return (
        <Fragment>
            {data.map(anime => (
                <Link to={`/detail/${anime.mal_id}`} className="anime-card-link">
                    <div key={anime.mal_id} className="anime-card">
                        <div className="anime-poster">
                            <img src={anime.images.jpg.image_url} alt={`anime-poster-${anime.mal_id}`} />
                        </div>
                        <p>{anime.title}</p>
                    </div>
                </Link>
            ))}
        </Fragment>
    )
}