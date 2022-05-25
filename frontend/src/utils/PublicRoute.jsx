import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Navigate, Outlet} from "react-router-dom";

function PublicRoute () {
    const {store} = useContext(Context);
    return store.isAuth ? <Navigate to={"/home"} /> : <Outlet />;
}

export default observer(PublicRoute)