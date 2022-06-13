import React from 'react'
import {useRef} from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import AudioPlayer from "./AudioPlayer";
import {Stack} from "@mui/material";

const HomePage = () => {
    const trackRef = useRef()

    return (
        <div>
            <Header/>
            <Stack direction="row" justifyContent="space-between">
                <Sidebar/>
                <Content trackRef={trackRef}/>
            </Stack>
            <AudioPlayer trackRef={trackRef}/>
        </div>
    )
}

export default HomePage
