import React from "react";
import Header from "./Home/Header";
import {Paper} from "@mui/material";
import bg from "./assets/image/bg.png"

const Dashboard = () => {
    return (
        <>
            <Paper sx={{
                width: "100vw",
                height: "100vh",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage: `url(${bg})`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Header/>
            </Paper>
        </>
    );
};

export default Dashboard;
