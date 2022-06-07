import React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

function NotFound() {
    const history = useNavigate()
    return (
        <Box sx={{
            marginTop: 25,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            <Typography
                variant="h2"
                component="h2"
            >
                404 - Page not found
            </Typography>
            <Button
                sx={{margin: 4, height: 60, fontSize: 18}}
                variant="contained"
                color="success"
                onClick={() => history("/")}
            >
                Go to HomePage
            </Button>
        </Box>
    )
}

export default NotFound;