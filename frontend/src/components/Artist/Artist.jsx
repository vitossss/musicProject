import React from 'react'
import {useContext, useEffect} from 'react'
import {Box} from "@mui/material";
import {Context} from "../../index";

const Artist = () => {
    const {store} = useContext(Context);

    useEffect(() => {
        if (store.isAuth) {
            const response = store.getArtists();
            console.log(response.data)
        }
    }, [store])

    return (
        <Box></Box>
    )
}

export default Artist
