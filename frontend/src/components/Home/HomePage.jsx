import React from 'react'
import Header from "./Header";
import Sidebar from "./Sidebar";
import Content from "./Content";
import {Stack} from "@mui/material";

const HomePage = () => {

    return (
        <div>
            <Header/>
            <Stack direction="row" justifyContent="space-between">
                <Sidebar/>
                <Content/>
            </Stack>
        </div>
    )
}

export default HomePage
