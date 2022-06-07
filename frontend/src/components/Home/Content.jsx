import React from 'react'
import {Box} from "@mui/material";
import {Navigate, Route, Routes} from "react-router-dom";
import Library from "./ContentComponents/Library";
import Liked from "./ContentComponents/Liked";
import AddAlbum from "./ContentComponents/AddAlbum";
import Home from "./ContentComponents/Home";

const Content = () => {
    return (
        <Box sx={{padding: "15px"}} flex={6}>
            <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="/main/" element={<Navigate to="home" replace />}/>
                <Route path="library" element={<Library/>}/>
                <Route path="liked" element={<Liked/>}/>
                <Route path="add_album" element={<AddAlbum/>}/>
            </Routes>
        </Box>
    )
}

export default Content
