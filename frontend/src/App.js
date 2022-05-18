import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserAPI } from "./api/api";

import { useState, useEffect } from "react";

import Header from "./components/Home/Header";

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Header />} />
            </Routes>
        </div>
    );
};

export default App;
