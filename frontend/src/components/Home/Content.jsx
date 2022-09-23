import React from 'react'
import {observer} from "mobx-react-lite";
import {Navigate, Route, Routes} from "react-router-dom";
import Library from "./ContentComponents/Library";
import Liked from "./ContentComponents/Liked";
import PlaylistPage from "./ContentComponents/PlaylistPage";
import Home from "./ContentComponents/Home";
import ArtistPage from "../Artist/ArtistPage";
import AlbumPage from "../Albums/AlbumPage";
import SearchPage from "./SearchPage"
import {Box} from "@mui/material";

const Content = ({handleLiked, trackId, setTrackId, filteredTracks}) => {
    return (
        <Box flex={6}>
            <Routes>
                <Route path="home" element={<Home/>}/>
                <Route path="*" element={<Navigate to="home" replace/>}/>
                <Route path="library" element={<Library/>}/>
                <Route path="liked" element={<Liked handleLiked={handleLiked} setTrackId={setTrackId}/>}/>
                <Route path="artist/:id"
                       element={<ArtistPage handleLiked={handleLiked} trackId={trackId} setTrackId={setTrackId}/>}/>
                <Route path="album/:id"
                       element={<AlbumPage handleLiked={handleLiked} trackId={trackId} setTrackId={setTrackId}/>}/>
                <Route path="playlist/:id"
                       element={<PlaylistPage handleLiked={handleLiked} trackId={trackId} setTrackId={setTrackId}/>}/>
                <Route path="search"
                       element={<SearchPage handleLiked={handleLiked} filteredTracks={filteredTracks} trackId={trackId}
                                            setTrackId={setTrackId}/>}/>
            </Routes>
        </Box>
    )
}

export default observer(Content)
