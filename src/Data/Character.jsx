import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Character.css";

export default function Character({animeId}) {

    const { data } = useQuery({
        queryKey: ["character-anime", animeId], 
        queryFn: async () => {
            const request = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/characters`);
            const response = await request.json();
            return response;
        },
        staleTime: 1000 * 3,
        cacheTime: 1000 * 60 * 30
    });

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