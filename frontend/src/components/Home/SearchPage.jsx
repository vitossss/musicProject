import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {observer} from "mobx-react-lite";
import AddMenu from "../UI/AddMenu";

const SearchPage = ({handleLiked, setTrackId, filteredTracks}) => {

    return (
        <Box sx={{display: "flex", flexDirection: "column", margin: "15px"}}>
            {filteredTracks.map((track) => (
                <Box key={track.id} sx={{width: 1200, display: "flex", justifyContent: "space-between",
                    padding: "10px 15px", borderRadius: "5px", mb: 1,
                    "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        transition: "all .1s linear"
                    }
                }}
                >
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <img onClick={() => {setTrackId(track.id)}} className="artist-img__page"
                             src={track.track_picture} alt="track"/>
                        <Box sx={{display: "flex", flexDirection: "column"}}>
                            <Typography sx={{color: "#000"}} variant="body2">
                                {track.artist.map(a => a.artist_name)}
                            </Typography>
                            <Typography sx={{fontWeight: 700, color: "#000"}} variant="body1">
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
                                    ? <FavoriteIcon fontSize="large" sx={{color: "#686de0"}}/>
                                    : <FavoriteBorderIcon fontSize="large" sx={{color: "#686de0"}}/>
                                }
                            </IconButton>
                        </Box>
                        <Box>
                            <AddMenu trackId={track.id}/>
                        </Box>
                        <Typography sx={{ml: 4, color: "#000"}} variant="body1">2:43</Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default observer(SearchPage);