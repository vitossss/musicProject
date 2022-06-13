import React from 'react';
import "../../index.css";
import {useEffect, useContext, useState, useRef} from 'react';
import {Context} from "../../index";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";

import robi from "../assets/image/Robi_dd3.jpg"

const ArtistPage = ({trackRef}) => {
    const {store} = useContext(Context)
    const [artist, setArtist] = useState({})
    const [isLiked, setIsLiked] = useState(false)
    const params = useParams();
    const artistId = params.id;

    useEffect(() => {
        store.getTracks();
        store.getArtists();
        // const result = store.artists.find((artist) => artist.id === artistId)
        // setArtist(result)
    }, [store])

    const ToggleLike = () => {
        setIsLiked(!isLiked)
    }

    return (
        <Box>
            <Box sx={{height: 300, background: "linear-gradient(#565ce1, #7b7fe2)",
                display: "flex", alignItems: "center"}}>
                <Box sx={{ml: 3}}>
                    <img className="robi" src={robi} alt="Artist" />
                </Box>
                <Box sx={{ml: 4}}>
                    <Typography variant="h1" sx={{textTransform: "uppercase", fontWeight: 700, color: "#fff"}}>Robi_dd3</Typography>
                </Box>
            </Box>
            <Box sx={{background: "linear-gradient(#46487e, #000)"}}>
                <Box sx={{padding: "10px"}}>
                    <IconButton>
                        <PlayArrowRounded
                        sx={{fontSize: '4rem', backgroundColor: "#686de0", color: "#000",
                            borderRadius: 10}}
                        />
                    </IconButton>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {store.tracks.map((track) => (
                        <Box key={track.id} sx={{width: 1200, display: "flex", justifyContent: "space-between",
                            padding: "10px 15px", borderRadius: "5px", mb: 1,
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                transition: "all .1s linear"
                            }
                        }}
                            onClick={() => {
                                store.setTrack({...track, duration: trackRef.current.duration});
                                const prevValue = store.isPlaying;
                                store.setIsPlaying(!prevValue);
                            }}
                        >
                            <audio ref={trackRef}>
                                <source src={track.track_url} type="audio/mpeg" />
                            </audio>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <img className="artist-img__page" src={track.track_picture} alt="track"/>
                                <Typography sx={{fontWeight: 600, color: "#fff"}} variant="body1">
                                    {track.track_title}
                                </Typography>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <IconButton
                                    size="small"
                                    onClick={ToggleLike}
                                >
                                    <FavoriteBorderIcon fontSize="large" sx={{color: "#686de0"}}/>
                                    {/*{!isLiked*/}
                                    {/*    ? <FavoriteBorderIcon fontSize="large" sx={{color: "#686de0"}}/>*/}
                                    {/*    : <FavoriteIcon fontSize="large" sx={{color: "#686de0"}}/>*/}
                                    {/*}*/}
                                </IconButton>
                                <Typography sx={{ml: 4, color: "#fff"}} variant="body1">2:43</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default observer(ArtistPage);