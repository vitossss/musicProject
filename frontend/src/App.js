import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserAPI } from "./api/api";

import { useState, useEffect } from "react";

import User from "./components/User/User";
import Header from "./components/Home/Header";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
        console.log(users);
    }, []);

    async function getUsers() {
        const response = await UserAPI.getUsers();
        setUsers(response.data);
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/register/" element={<User />} />
            </Routes>
        </div>
    );
};

export default App;
