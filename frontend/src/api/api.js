import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const UserAPI = {

    async createUser(user) {
        await instance.post("auth/users/", {
            headers: {
                "Content-Type": "application/json",
            },
            username: user.username,
            email: user.email,
            password: user.password
        });

    }
};
