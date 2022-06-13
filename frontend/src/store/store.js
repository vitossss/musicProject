import {makeAutoObservable} from 'mobx'
import AuthService from "../services/AuthService";
import ApiService from "../services/ApiService";

class Store {
    isAuth = true
    user = {}

    artists = []
    albums = []
    tracks = []

    isPlaying = false
    track = {}

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

    setAlbums(albums) {
        this.albums = albums
    }

    setTracks(tracks) {
        this.tracks = tracks
    }

    setTrack(track) {
        this.track = track
    }

    setIsPlaying(bool) {
        this.isPlaying = bool
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.auth_token);
            // const auth_me = await AuthService.me();
            this.setAuth(!this.isAuth)
            // this.setUser(auth_me.data);
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
            const prevResult = this.isAuth;
            this.setAuth(!prevResult);
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

    async getAlbums() {
        try {
            const response = await ApiService.getAlbums();
            this.setAlbums(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    async getTracks() {
        try {
            const response = await ApiService.getTracks();
            this.setTracks(response.data)
        } catch (e) {
            console.log(e)
        }
    }
}

export default Store;
