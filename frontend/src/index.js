import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "./store/store";

const store = new Store();

export const Context = createContext({store})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Context.Provider value={{store}}>
            <Router>
                <App/>
            </Router>
        </Context.Provider>
    </React.StrictMode>
);
