import React from 'react';
import "../../../index.css";
import {observer} from "mobx-react-lite";
import {useEffect, useContext} from 'react';
import {Context} from "../../../index";
import LikePic from "../../assets/image/Liked_tracks.jpg"
import {Box, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import AddMenu from "../../UI/AddMenu";

const getLikedTracks = (tracks) => {
    return tracks.filter(track => track.is_liked === true)
}

const Liked = ({handleLiked, setTrackId}) => {
    const {store} = useContext(Context)

    useEffect(() => {
        store.getTracks()
    }, [store])

    const filteredLikedTracks = getLikedTracks(store.tracks)

    return (
        <Box>
            <Box sx={{height: 300, background: "linear-gradient(#565ce1, #7b7fe2)",
                display: "flex", alignItems: "center"}}>
                <Box sx={{ml: 3}}>
                    <img className="robi" src={LikePic} alt="Like" />
                </Box>
                <Box sx={{ml: 4}}>
                    <Typography variant="h1" sx={{textTransform: "uppercase", fontWeight: 700, color: "#fff"}}>
                        Liked tracks
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    minHeight: "calc(100vh - 64px - 430px)",
                    background: "linear-gradient(#46487e, #000)"
                }}
            >
                <Box sx={{padding: "10px"}}>
                    <IconButton>
                        <PlayArrowRounded
                            sx={{fontSize: '4rem', backgroundColor: "#686de0", color: "#000", borderRadius: 10}}
                        />
                    </IconButton>
                </Box>
                <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {filteredLikedTracks.map((track) => (
                        <Box key={track.id} sx={{width: 1200, display: "flex", justifyContent: "space-between",
                            padding: "10px 15px", borderRadius: "5px", mb: 1,
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.3)",
                                transition: "all .1s linear"
                            }
                        }}
                        >
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <img className="artist-img__page" src={track.track_picture} alt="track"
                                     onClick={() => {setTrackId(track.id)}}
                                />
                                <Box sx={{display: "flex", flexDirection: "column"}}>
                                    <Typography sx={{color: "#fff"}} variant="body2">
                                        {track.artist.map(a => a.artist_name)}
                                    </Typography>
                                    <Typography sx={{fontWeight: 700, color: "#fff"}} variant="body1">
                                        {track.track_title}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{display: "flex", alignItems: "center"}}>
                                <Box>
                                    <IconButton
                                        size="small"
                                        onClick={() => handleLiked(track.id)}
                                    >
                                        {track.is_liked
                                            ? <FavoriteIcon fontSize="medium" sx={{color: "#686de0"}}/>
                                            : <FavoriteBorderIcon fontSize="medium" sx={{color: "#686de0"}}/>
                                        }
                                    </IconButton>
                                </Box>
                                <Box>
                                    <AddMenu trackId={track.id}/>
                                </Box>
                                <Typography sx={{ml: 4, color: "#fff"}} variant="body1">2:32</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default observer(Liked);