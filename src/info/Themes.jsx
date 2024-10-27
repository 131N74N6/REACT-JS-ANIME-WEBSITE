import React, { Fragment } from "react";
import { useQuery } from "react-query";

export default function Soundtracks({animeId}) {

    const { data } = useQuery('anime-soundtracks', async () => {
        const request = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/themes`);
        const response = await request.json();
        return response;
    })

    return (
        <Fragment>
            <div className="soundtrack-list">
                {data?.data?.openings.length > 0 ? 
                    <div className="openings">
                        <h3>Openings</h3>
                        {data.data.openings?.map((op, index) => (
                            <div key={`opening-theme-${index}`}>
                                <p>{op}</p>
                            </div>
                        ))}
                    <hr style={{backgroundColor:'aqua'}}/>
                    </div> : null
                }
                {data?.data?.endings.length > 0 ? 
                    <div className="endings">
                        <h3>Endings</h3>
                        {data.data.endings?.map((op, index) => (
                            <div key={`opening-theme-${index}`}>
                                <p>{op}</p>
                            </div>
                        ))}
                    <hr style={{backgroundColor:'aqua'}}/>
                    </div> : null
                }
            </div>
        </Fragment>
    )
}