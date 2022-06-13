import React from 'react'
import Artist from "../../Artist/Artist";
import Albums from "../../Albums/Albums";
import {Box} from "@mui/material";

const Home = () => {
    return (
        <Box sx={{margin: "15px"}}>
            <Artist/>
            <Albums/>
        </Box>
    )
}

export default Home
