import axios from "axios";

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
});

export const UserAPI = {
    async getUsers() {
        const response = await instance.get("users/");
        return response;
    },

    async createUser(user) {
        await instance.post("users/create/", {
            headers: {
                "Content-Type": "application/json",
            },
            username: user.username,
            email: user.email,
            password: user.password
        });

    }
};
