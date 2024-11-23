import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Soundtracks({animeId}) {

    const { data } = useQuery({
        queryKey: ["anime-soundtracks", animeId], 
        queryFn: async () => {
            const request = await fetch(`https://api.jikan.moe/v4/anime/${animeId}/themes`);
            const response = await request.json();
            return response;
        },
        staleTime: 1000 * 3,
        cacheTime: 1000 * 60 * 30
    });

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