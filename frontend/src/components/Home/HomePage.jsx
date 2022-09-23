import React from 'react'
import {useState, useContext, useEffect} from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import AudioPlayer from "./AudioPlayer";
import {Stack} from "@mui/material";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const getFilteredTracks = (query, allTracks) => {
    if (!query) {
        return allTracks
    }
    return allTracks.filter(track => track.track_title.toLowerCase().includes(query.toLowerCase()))
}

const HomePage = () => {
    const {store} = useContext(Context)
    const [query, setQuery] = useState("")
    const [trackId, setTrackId] = useState("")

    useEffect(() => {
        store.getTracks()
    }, [store])

    const filteredTracks = getFilteredTracks(query, store.tracks)

    const handleLiked = (track_id) => {
        store.createLike(track_id)
    }

    return (
        <div>
            <Header query={query} setQuery={setQuery} trackId={trackId} setTrackId={setTrackId}/>
            <Stack direction="row" justifyContent="space-between">
                <Sidebar/>
                <Content handleLiked={handleLiked} filteredTracks={filteredTracks} trackId={trackId}
                         setTrackId={setTrackId}/>
            </Stack>
            <AudioPlayer handleLiked={handleLiked} trackId={trackId} setTrackId={setTrackId}/>
        </div>
    )
}

export default observer(HomePage)
