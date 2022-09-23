import React from 'react'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../../index";
import {Link} from "react-router-dom"
import {Box, Typography} from "@mui/material";

const Library = () => {
    const {store} = useContext(Context)
    const [countLiked, setCountLiked] = useState(0)

    useEffect(() => {
        store.getTracks().then(
            (response) => {
                const filterLikedTracks = response.filter(track => track.is_liked === true)
                setCountLiked(filterLikedTracks.length)
            }
        )
    }, [store])

    return (
        <Box sx={{margin: "15px", display: "flex"}}>
            <Box
                component={Link} to={'/liked'}
                sx={{
                    display: "flex",
                    alignItems: "end",
                    padding: "20px",
                    width: "570px",
                    height: "280px",
                    background: "linear-gradient(#686de0, #ffca00, #000)",
                    borderRadius: "25px"
                }}
            >
                <Box sx={{width: "570px", display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                    <Typography sx={{fontWeight: 600, color: "#fff"}} variant="h4">
                        Liked Tracks
                    </Typography>
                    <Typography sx={{float: "right", fontWeight: 500, color: "#fff"}} variant="h5">
                        {countLiked}
                    </Typography>
                </Box>
            </Box>
            {store.playlists.map((playlist) => (
                <Box key={playlist.id}
                     component={Link} to={`/playlist/${playlist.id}`}
                     sx={{
                         display: "flex",
                         alignItems: "end",
                         padding: "20px",
                         marginLeft: "20px",
                         width: "280px",
                         height: "280px",
                         background: "linear-gradient(#686de0, #ff3e95, #000)",
                         borderRadius: "25px"
                     }}
                >
                    <Box
                        sx={{width: "300px", display: "flex", alignItems: "end", justifyContent: "space-between"}}>
                        <Typography sx={{fontWeight: 600, color: "#fff"}} variant="h4">
                            {playlist.title}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default Library
