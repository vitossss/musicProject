import React from 'react'
import  "../../index.css"
import {useContext, useEffect} from 'react'
import {Box, Paper, Stack, Typography} from "@mui/material";
import {Context} from "../../index";
import Loading from "../UI/Loading";
import {ArtistStack} from "../Home/CustomStyles";

const Artist = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        store.getArtists();
    }, [store])

    return (
        <>
            {!store.artists.length
                ? (
                    <ArtistStack>
                        <Loading
                            animation="wave"
                            variant="circular"
                            width={128} height={128}
                            sx={{mb: 1}}
                        />
                        <Loading
                            animation="wave"
                            variant="text"
                            width={85}
                            sx={{marginLeft: "20px"}}
                        />
                    </ArtistStack>
                )
                : (
                    <Box sx={{display: 'flex', flexWrap: 'wrap',}}>
                        {store.artists.map(artist => (
                            <ArtistStack
                                key={artist.id}
                                sx={{
                                    m: 1,
                                    '& > :not(style)': {
                                        width: 128,
                                        height: 128,
                                        borderRadius: "50%",
                                    },
                                }}
                            >
                                <Paper sx={{marginBottom: "5px"}}>
                                    <img className="artist_img" src={artist.artist_picture} alt="Artist"/>
                                </Paper>
                                <Typography sx={{textAlign: "center"}}>
                                    {artist.artist_name}
                                </Typography>
                            </ArtistStack>
                        ))}
                    </Box>
                )
            }
        </>
    )
}

export default Artist
