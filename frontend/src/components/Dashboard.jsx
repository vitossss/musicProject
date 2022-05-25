import React from "react";
import Header from "./Home/Header";
import {Paper} from "@mui/material";
import bg from "./assets/image/bg.png"

const Dashboard = () => {
    return (
        <>
            <Header/>
            <Paper sx={{
                width: "100vw",
                height: "calc(100vh - 64px)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${bg})`
            }}/>
        </>
    );
};

export default Dashboard;
