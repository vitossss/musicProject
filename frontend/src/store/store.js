import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import ApiService from "../services/ApiService";

class Store {
    user = {}
    isAuth = false
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
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async register(username, email, password) {
        try {
            await AuthService.register(username, email, password);
            await this.login(email, password);
        } catch (e) {
            console.log(e)
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
