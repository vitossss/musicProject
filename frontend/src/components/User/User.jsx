import React from "react";

import { Routes, Route } from "react-router-dom"

import CreateUser from "./CreateUser"
import LoginUser from "./LoginUser"

const User = () => {
    return (
        <Routes>
            <Route to="/register/" element={<CreateUser />} />
            <Route to="/login/" element={<LoginUser />} />
        </Routes>
    );
};

export default User;
