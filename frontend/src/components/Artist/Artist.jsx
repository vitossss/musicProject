import React from 'react'
import  "../../index.css"
import {observer} from "mobx-react-lite";
import {useContext, useEffect} from 'react'
import {Context} from "../../index";
import {Link} from "react-router-dom";
import Loading from "../UI/Loading";
import {ArtistStack} from "../Home/CustomStyles";
import {Box, Paper, Typography} from "@mui/material";

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
                    <>
                        <Typography sx={{marginLeft: 1}} component="div" variant="h5">Artists</Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', marginBottom: 4}}>
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
                                    <Paper component={Link} to={`/artist/${artist.id}`} sx={{marginBottom: "10px"}}>
                                        <img className="artist_img" src={artist.artist_picture} alt="Artist"/>
                                    </Paper>
                                    <Typography sx={{fontWeight: 600}}>
                                        {artist.artist_name}
                                    </Typography>
                                </ArtistStack>
                            ))}
                        </Box>
                    </>
                )
            }
        </>
    )
}

export default observer(Artist)
