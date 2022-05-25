import instance from "../api/api";

class AuthService {
    static async login(email, password) {
        return instance.post('auth/token/login/', {email, password})
    }

    static async register(username, email, password) {
        return instance.post('auth/users/', {username, email, password})
    }

    static async logout() {
        return instance.post('auth/token/logout/')
    }

    static async me() {
        return instance.get('auth/users/me/')
    }
}

export default AuthService
