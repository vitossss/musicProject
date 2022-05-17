import React from "react";
import { UserAPI } from "../../api/api"
import { useState, useEffect } from "react"

import CreateUser from "./CreateUser"

const User = () => {
    const [user, setUser] = useState({ username: "", email: "", password: "" });
    const [userError, setUserError] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    async function createOneUser() {
        await UserAPI.createUser(user);
    }

    return (
        <CreateUser
            user={user}
            setUser={setUser}
            createOneUser={createOneUser}
            userError={userError}
            setUserError={setUserError}
            isSubmit={isSubmit}
            setIsSubmit={setIsSubmit}
        />
    );
};

export default User;
