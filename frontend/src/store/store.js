import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import ApiService from "../services/ApiService";

class Store {
    user = {}
    isAuth = true
    artists = []

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setArtists(artists) {
        this.artists = artists;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.auth_token);
            this.setAuth(true);
            return response;
        } catch (e) {
            return e;
        }
    }

    async register(username, email, password) {
        try {
            const response = await AuthService.register(username, email, password);
            await this.login(email, password);
            return response;
        } catch (e) {
            return e;
        }
    }

    async checkAuth() {
        try {
            const response = await AuthService.me();
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async getArtists() {
        try {
            const response = await ApiService.getArtists();
            this.setArtists(response.data)
        } catch (e) {
            console.log(e);
        }
    }

}

export default Store
