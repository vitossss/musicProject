import React from 'react'
import {Box} from "@mui/material";
import Artist from "../Artist/Artist"

const Content = () => {

    return (
        <Box sx={{bgcolor: "#0d0d0d", color: "#fff", padding: "30px"}} flex={6}>
            <Artist/>
        </Box>
    )
}

export default Content
