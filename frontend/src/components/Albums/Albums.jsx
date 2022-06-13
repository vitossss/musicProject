import React from 'react';
import  "../../index.css"
import {useContext, useEffect} from "react";
import {Context} from "../../index";
import {ArtistStack} from "../Home/CustomStyles";
import Loading from "../UI/Loading";
import {Box, Paper, Typography} from "@mui/material";
import {observer} from "mobx-react-lite";

const Albums = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        store.getAlbums();
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
                        <Typography sx={{marginLeft: 1}} component="div" variant="h5">Albums</Typography>
                        <Box sx={{display: 'flex', flexWrap: 'wrap', marginBottom: 4}}>
                            {store.albums.map(album => (
                                <ArtistStack
                                    key={album.id}
                                    sx={{
                                        m: 1,
                                        '& > :not(style)': {
                                            width: 128,
                                            height: 128,
                                            borderRadius: "50%",
                                        },
                                    }}
                                >
                                    <Paper sx={{marginBottom: "10px"}}>
                                        <img className="album_img" src={album.album_picture} alt="Artist"/>
                                    </Paper>
                                    <Typography sx={{fontWeight: 600}}>
                                        {album.album_title}
                                    </Typography>
                                </ArtistStack>
                            ))}
                        </Box>
                    </>
                )
            }
        </>
    );
};

export default observer(Albums);