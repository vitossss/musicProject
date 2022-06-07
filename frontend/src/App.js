import React, {useContext} from 'react';
import {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import CreateUser from "./components/User/CreateUser";
import LoginUser from "./components/User/LoginUser";
import HomePage from "./components/Home/HomePage";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#000"
        },
        secondary: {
            main: "#686de0"
        }
    },
    typography: {
        fontFamily: "Quicksand",
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700
    },
})

const App = () => {
    const {store} = useContext(Context)

    // useEffect(() => {
    //     if (localStorage.getItem('token')) {
    //         store.checkAuth()
    //     }
    // }, [store])

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="*" element={<HomePage/>}/>
                </Route>
                {/*<Route path="/dashboard" element={<PublicRoute/>}>*/}
                {/*    <Route path="/dashboard" element={<Dashboard/>}/>*/}
                {/*</Route>*/}
                {/*<Route path="/auth" element={<PublicRoute/>}>*/}
                {/*    <Route path="login" element={<LoginUser/>}/>*/}
                {/*    <Route path="register" element={<CreateUser/>}/>*/}
                {/*</Route>*/}
            </Routes>
        </ThemeProvider>
    );
};

export default observer(App);
