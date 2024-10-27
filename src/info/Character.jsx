import React, { Fragment } from "react";
import "./Character.css";
import { useQuery } from "react-query";

export default function Character({animeId}) {

    const { data } = useQuery('character-anime', async () => {
        const request = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
        const response = await request.json();
        return response;
    })

    return (
        <Fragment>
            {data?.data?.length > 0 ?
                <div className="characters-info">
                    <div style={{textAlign:'center', fontWeight:'bold'}}>Characters</div>
                    <div className="character">
                        {data.data.map((chara, index) => (
                            <div key={`anime-chara-${index}`} className="character-data">
                                <div className="img-chara-wrap">
                                    <img src={chara.character.images?.jpg.image_url || null} alt={chara.character.name}/>
                                </div>
                                <div className="role-name">
                                    <div>{chara.character.name}</div>
                                    <div>{chara.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> : null
            }
        </Fragment>
    )
}